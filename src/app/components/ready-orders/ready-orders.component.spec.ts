import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyOrdersComponent } from './ready-orders.component';

describe('ReadyOrdersComponent', () => {
  let component: ReadyOrdersComponent;
  let fixture: ComponentFixture<ReadyOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadyOrdersComponent]
    });
    fixture = TestBed.createComponent(ReadyOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
