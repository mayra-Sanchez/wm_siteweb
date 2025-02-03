import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselHombreComponent } from './carrusel-hombre.component';

describe('CarruselHombreComponent', () => {
  let component: CarruselHombreComponent;
  let fixture: ComponentFixture<CarruselHombreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarruselHombreComponent]
    });
    fixture = TestBed.createComponent(CarruselHombreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
