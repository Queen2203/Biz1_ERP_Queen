import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintverifyComponent } from './maintverify.component';

describe('MaintverifyComponent', () => {
  let component: MaintverifyComponent;
  let fixture: ComponentFixture<MaintverifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintverifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintverifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
