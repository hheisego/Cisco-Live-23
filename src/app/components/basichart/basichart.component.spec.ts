import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasichartComponent } from './basichart.component';

describe('BasichartComponent', () => {
  let component: BasichartComponent;
  let fixture: ComponentFixture<BasichartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasichartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasichartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
