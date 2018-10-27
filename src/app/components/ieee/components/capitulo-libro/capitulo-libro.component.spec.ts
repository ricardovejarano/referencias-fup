import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapituloLibroComponent } from './capitulo-libro.component';

describe('CapituloLibroComponent', () => {
  let component: CapituloLibroComponent;
  let fixture: ComponentFixture<CapituloLibroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapituloLibroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapituloLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
