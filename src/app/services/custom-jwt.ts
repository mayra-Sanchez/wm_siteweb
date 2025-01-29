// Importa la interfaz JwtPayload de jwt-decode
import { JwtPayload } from 'jwt-decode';

export interface CustomJwtPayload extends JwtPayload {
  rol: string;         // Rol del usuario (por ejemplo, 'admin', 'client')
  username?: string;   // Nombre de usuario, si está incluido en el token
  email?: string;      // Correo electrónico, si está incluido en el token
  id?: string;         // ID del usuario (si está incluido en el token)
}
