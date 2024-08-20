import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergedTableComponent } from './merged-table.component';

describe('MergedTableComponent', () => {
  let component: MergedTableComponent;
  let fixture: ComponentFixture<MergedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MergedTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MergedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
