import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsbuttonComponent } from './whatsbutton.component';

describe('WhatsbuttonComponent', () => {
  let component: WhatsbuttonComponent;
  let fixture: ComponentFixture<WhatsbuttonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WhatsbuttonComponent]
    });
    fixture = TestBed.createComponent(WhatsbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
