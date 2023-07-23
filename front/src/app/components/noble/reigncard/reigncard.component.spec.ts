import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReigncardComponent } from './reigncard.component';

describe('ReigncardComponent', () => {
  let component: ReigncardComponent;
  let fixture: ComponentFixture<ReigncardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReigncardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReigncardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
