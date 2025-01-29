import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';// Importa tu componente
import { HombreComponent } from './hombre/hombre.component'; // Importa tu componente
import { AuthGuard } from './auth.guard'; // Asegúrate de importar el guard
import { HomeComponent } from './home/home.component';
import { ProductmanagementComponent } from './components/Admin/productmanagement/productmanagement.component';
import { SalesReportComponent } from './components/Admin/sales-report/sales-report.component';
import { SettingsComponent } from './components/Admin/settings/settings.component';
import { MujerComponent } from './mujer/mujer.component';
import { AccesoriosComponent } from './accesorios/accesorios.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent, // Esta será la página principal
  },
  {
    path: 'hombre',
    component: HombreComponent, // Componente para la sección Hombre
  },
  {
    path: 'mujer',
    component: MujerComponent, // Componente para la sección Mujer
  },
  {
    path: 'accesorios',
    component: AccesoriosComponent, // Componente para la sección Accesorios
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
    children: [
      { path: 'products', component: ProductmanagementComponent }, 
      { path: 'reports', component: SalesReportComponent }, 
      { path: 'settings', component: SettingsComponent }, 
    ]
  },
  // Otras rutas
  {
    path: '**', // Ruta comodín para redirigir a la página de inicio si la ruta no existe
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
