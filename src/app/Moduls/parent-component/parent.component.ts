import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { MergedTableDynamicComponent } from '../merged-table-dynamic/merged-table-dynamic.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzSelectModule,
    MergedTableDynamicComponent // Import the child component
  ],
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  reportType: string = '';
  data: any = null;
  columns: any = [];

  reportOptions = [
    { label: 'Report Type 1', value: 'report1', dataJson: 'assets/report1.json', columnsJson: 'assets/columns1.json' },
    { label: 'Report Type 2', value: 'report2', dataJson: 'assets/report2.json', columnsJson: 'assets/columns2.json' }
    // Add more report types as needed
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onReportChange(value: string): void {
    const selectedReport = this.reportOptions.find(option => option.value === value);
    if (selectedReport) {
      this.loadData(selectedReport.dataJson).subscribe(data => {
        this.data = data.listOfData;
      });
      this.loadColumns(selectedReport.columnsJson).subscribe(columns => {
        this.columns = columns.columns;
      });
    }
  }

  loadData(jsonPath: string): Observable<any> {
    return this.http.get<any>(jsonPath);
  }

  loadColumns(jsonPath: string): Observable<any> {
    return this.http.get<any>(jsonPath);
  }
}
