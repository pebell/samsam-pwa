import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BedragenComponent } from './bedragen.component';

describe('BedragenComponent', () => {
  let component: BedragenComponent;
  let fixture: ComponentFixture<BedragenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BedragenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BedragenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
