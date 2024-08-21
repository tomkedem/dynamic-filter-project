import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { MergedTableDynamicComponent } from '../merged-table-dynamic/merged-table-dynamic.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main-reports',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzSelectModule,
    MergedTableDynamicComponent
  ],
  templateUrl: './main-reports.component.html',
  styleUrls: ['./main-reports.component.css']
})
export class MainReportsComponent implements OnInit {
  reportType: string = '';
  data: string = '';
  columns: string = '';

  reportOptions = [
    { label: 'Report Type 1', value: 'report1', dataJson: 'assets/mock-data/dataReport1.json', columnsJson: 'assets/mock-data/columnsReport1.json' },
    { label: 'Report Type 2', value: 'report2', dataJson: 'assets/mock-data/dataReport2.json', columnsJson: 'assets/mock-data/columnsReport2.json' }
  
    // Add more report types as needed
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onReportChange(value: string): void {
    const selectedReport = this.reportOptions.find(option => option.value === value);
    if (selectedReport) {
      this.data = selectedReport.dataJson;
      this.columns = selectedReport.columnsJson;
      console.log('this.data: ', this.data);
      console.log('this.columns: ', this.columns);
    }
  }
}
