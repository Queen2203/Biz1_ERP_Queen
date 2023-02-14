import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintactivitiesComponent } from './maintactivities.component';

describe('MaintactivitiesComponent', () => {
  let component: MaintactivitiesComponent;
  let fixture: ComponentFixture<MaintactivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintactivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintactivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
