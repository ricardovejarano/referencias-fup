import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloRevistaComponent } from './articulo-revista.component';

describe('ArticuloRevistaComponent', () => {
  let component: ArticuloRevistaComponent;
  let fixture: ComponentFixture<ArticuloRevistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticuloRevistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloRevistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
