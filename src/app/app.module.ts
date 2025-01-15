import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './components/Admin/admin-dashboard/admin-dashboard.component';
import { ProductListComponent } from './components/Admin/product-list/product-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductFormComponent } from './components/Admin/product-form/product-form.component';
import { SalesReportComponent } from './components/Admin/sales-report/sales-report.component';
import { ProductCatalogComponent } from './components/Custom/product-catalog/product-catalog.component';
import { ProductDetailComponent } from './components/Custom/product-detail/product-detail.component';
import { CartComponent } from './components/Custom/cart/cart.component';
import { FavoritesComponent } from './components/Custom/favorites/favorites.component';
import { PurchaseHistoryComponent } from './components/Custom/purchase-history/purchase-history.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    ProductListComponent,
    ProductFormComponent,
    SalesReportComponent,
    ProductCatalogComponent,
    ProductDetailComponent,
    CartComponent,
    FavoritesComponent,
    PurchaseHistoryComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
