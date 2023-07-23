import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KinshipComponent } from './kinship.component';

describe('KinshipComponent', () => {
  let component: KinshipComponent;
  let fixture: ComponentFixture<KinshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KinshipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KinshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
