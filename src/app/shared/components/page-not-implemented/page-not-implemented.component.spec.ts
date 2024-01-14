import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotImplementedComponent } from './page-not-implemented.component';

describe('PageNotImplementedComponent', () => {
  let component: PageNotImplementedComponent;
  let fixture: ComponentFixture<PageNotImplementedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageNotImplementedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageNotImplementedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
