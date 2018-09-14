import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingConsentComponent } from './tracking-consent.component';

describe('TrackingConsentComponent', () => {
  let component: TrackingConsentComponent;
  let fixture: ComponentFixture<TrackingConsentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingConsentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
