import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselAccesoriosComponent } from './carrusel-accesorios.component';

describe('CarruselAccesoriosComponent', () => {
  let component: CarruselAccesoriosComponent;
  let fixture: ComponentFixture<CarruselAccesoriosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarruselAccesoriosComponent]
    });
    fixture = TestBed.createComponent(CarruselAccesoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
