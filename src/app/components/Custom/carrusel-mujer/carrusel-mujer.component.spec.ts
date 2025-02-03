import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselMujerComponent } from './carrusel-mujer.component';

describe('CarruselMujerComponent', () => {
  let component: CarruselMujerComponent;
  let fixture: ComponentFixture<CarruselMujerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarruselMujerComponent]
    });
    fixture = TestBed.createComponent(CarruselMujerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
