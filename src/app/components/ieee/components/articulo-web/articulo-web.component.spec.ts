import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloWebComponent } from './articulo-web.component';

describe('ArticuloWebComponent', () => {
  let component: ArticuloWebComponent;
  let fixture: ComponentFixture<ArticuloWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticuloWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
