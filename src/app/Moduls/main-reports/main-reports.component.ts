import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { MergedTableDynamicComponent } from '../merged-table-dynamic/merged-table-dynamic.component';
import { HttpClient } from '@angular/common/http';
import { ReportType } from '../../../shared/report-type.enum';
import { log } from 'console';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-main-reports',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzSelectModule,
    MergedTableDynamicComponent,
    DynamicFormComponent,
  ],
  templateUrl: './main-reports.component.html',
  styleUrls: ['./main-reports.component.css'],
})
export class MainReportsComponent implements OnInit {
  reportTypes = ReportType; // Access to Enum in the template
  reportType: ReportType | null = null; // Variable to hold the user's selection
  data: string = '';
  columns: string = '';
  schema: any = null; // Ensure the schema is defined here

  reportOptions = [
    {
      label: 'רישום למלון',
      value: 1,
      dataJson: 'assets/mock-data/dataReportHotels.json',
      columnsJson: 'assets/mock-data/columnsReportHotels.json',
    },
    {
      label: 'הסעות',
      value: 2,
      dataJson: 'assets/mock-data/dataReportTransportations.json',
      columnsJson: 'assets/mock-data/columnsReportTransportations.json',
    },

    // Add more report types as needed
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadSchema();
  }

  onReportChange(value: number): void {
    console.log('fater-schema-value', value);
    const selectedReport = this.reportOptions.find(
      (option) => option.value === value
    );
    if (selectedReport) {
      this.reportType = selectedReport.value;
      this.data = selectedReport.dataJson;
      this.columns = selectedReport.columnsJson;
    }
  }
  loadSchema(): void {
    this.http.get('/assets/mock-data/reports-schema.json').subscribe(
      (schema: any) => {
        console.log('fater-schema', schema);
        this.schema = schema;
        // Update the reportType after schema is loaded
        this.onReportChange(this.reportType || 1); // Call with default value or a specific reportType
      },
      (error) => {
        console.error('Failed to load schema:', error);
      }
    );
  }
}
