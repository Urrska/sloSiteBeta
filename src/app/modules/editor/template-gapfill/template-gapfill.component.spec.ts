import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateGapfillComponent } from './template-gapfill.component';

describe('TemplateGapfillComponent', () => {
  let component: TemplateGapfillComponent;
  let fixture: ComponentFixture<TemplateGapfillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateGapfillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateGapfillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
