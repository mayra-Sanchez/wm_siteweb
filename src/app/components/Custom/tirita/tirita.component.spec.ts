import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiritaComponent } from './tirita.component';

describe('TiritaComponent', () => {
  let component: TiritaComponent;
  let fixture: ComponentFixture<TiritaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiritaComponent]
    });
    fixture = TestBed.createComponent(TiritaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
