import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthAmbitionsComponent } from './health-ambitions.component';

describe('HealthAmbitionsComponent', () => {
  let component: HealthAmbitionsComponent;
  let fixture: ComponentFixture<HealthAmbitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthAmbitionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HealthAmbitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
