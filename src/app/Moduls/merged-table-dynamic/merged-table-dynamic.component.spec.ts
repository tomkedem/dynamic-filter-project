import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergedTableDynamicComponent } from './merged-table-dynamic.component';

describe('MergedTableDynamicComponent', () => {
  let component: MergedTableDynamicComponent;
  let fixture: ComponentFixture<MergedTableDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MergedTableDynamicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MergedTableDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
