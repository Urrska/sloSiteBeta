import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionsGapfillComponent } from './instructions-gapfill.component';

describe('InstructionsGapfillComponent', () => {
  let component: InstructionsGapfillComponent;
  let fixture: ComponentFixture<InstructionsGapfillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructionsGapfillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionsGapfillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
