import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/Admin/product-list/product-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductFormComponent } from './components/Admin/product-form/product-form.component';
import { SalesReportComponent } from './components/Admin/sales-report/sales-report.component';
import { CartComponent } from './components/Custom/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarruselAccesoriosComponent } from './components/Custom/carrusel-accesorios/carrusel-accesorios.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderAdminComponent } from './components/Admin/header-admin/header-admin.component';
import { SidebarComponent } from './components/Admin/sidebar/sidebar.component';
import { ProductmanagementComponent } from './components/Admin/productmanagement/productmanagement.component';
import { SettingsComponent } from './components/Admin/settings/settings.component';
import { AuthInterceptor } from './admin-dashboard/services/auth.interceptor';
import { CarruselHombreComponent } from './carrusel-hombre/carrusel-hombre.component';
import { CarruselMujerComponent } from './carrusel-mujer/carrusel-mujer.component';
import { CarruselSaleComponent } from './carrusel-sale/carrusel-sale.component';
import { TiritaComponent } from './tirita/tirita.component';
import { VideoComponent } from './video/video.component';
import { HombreComponent } from './components/Custom/hombre/hombre.component';
import { MujerComponent } from './components/Custom/mujer/mujer.component';
import { AccesoriosComponent } from './components/Custom/accesorios/accesorios.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoComponent,
    CarruselSaleComponent,
    CarruselHombreComponent,
    CarruselMujerComponent,
    ProductListComponent,
    ProductFormComponent,
    SalesReportComponent,
    CartComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    CarruselAccesoriosComponent,
    HomeComponent,
    AdminDashboardComponent,
    HeaderAdminComponent,
    SidebarComponent,
    ProductmanagementComponent,
    SettingsComponent,
    HombreComponent,
    MujerComponent,
    AccesoriosComponent,
    TiritaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
