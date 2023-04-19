import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicgraphComponent } from './basicgraph.component';

describe('BasicgraphComponent', () => {
  let component: BasicgraphComponent;
  let fixture: ComponentFixture<BasicgraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicgraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicgraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
