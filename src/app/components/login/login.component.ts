import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() loginSuccess = new EventEmitter<void>(); // Emitir evento cuando el login es exitoso
  isModalVisible: boolean = false;
  isLoginMode: boolean = true;
  loginForm: FormGroup;
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    // Formulario de Login
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Formulario de Registro
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      rol: ['client', Validators.required]
    });
  }

  openLogin() {
    this.isModalVisible = true;
  }

  closeLogin() {
    this.isModalVisible = false;
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onLoginSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const { email, password } = this.loginForm.value;
    this.apiService.login(email, password).subscribe(
      (response) => {
        console.log('Login exitoso', response);
        this.loginSuccess.emit();  // Emitir evento de éxito
        this.closeLogin();  // Cerrar el modal después de un login exitoso
      },
      (error) => {
        this.errorMessage = error.message || 'Error al iniciar sesión. Verifique sus credenciales.';
        console.error('Error de login:', error);
      }
    );
  }

  onRegisterSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    const { email, password, confirmPassword, username, first_name, last_name, rol } = this.registerForm.value;
    
    if (password !== confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    const userData = { email, password, username, first_name, last_name, rol };

    this.apiService.register(userData).subscribe(
      (response) => {
        console.log('Registro exitoso', response);
        this.toggleMode();  // Cambiar a login después de un registro exitoso
      },
      (error) => {
        this.errorMessage = error.message || 'Error al registrar. Intenta de nuevo.';
        console.error('Error de registro:', error);
      }
    );
  }
}
