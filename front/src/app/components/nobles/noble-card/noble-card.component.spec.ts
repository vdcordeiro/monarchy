import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NobleCardComponent } from './noble-card.component';

describe('NobleCardComponent', () => {
  let component: NobleCardComponent;
  let fixture: ComponentFixture<NobleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NobleCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NobleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
