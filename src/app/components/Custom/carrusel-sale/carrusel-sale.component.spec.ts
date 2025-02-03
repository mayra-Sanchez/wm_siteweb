import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselSaleComponent } from './carrusel-sale.component';

describe('CarruselSaleComponent', () => {
  let component: CarruselSaleComponent;
  let fixture: ComponentFixture<CarruselSaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarruselSaleComponent]
    });
    fixture = TestBed.createComponent(CarruselSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
