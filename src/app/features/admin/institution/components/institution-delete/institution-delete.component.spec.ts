import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionDeleteComponent } from './institution-delete.component';

describe('InstitutionDeleteComponent', () => {
  let component: InstitutionDeleteComponent;
  let fixture: ComponentFixture<InstitutionDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutionDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstitutionDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
