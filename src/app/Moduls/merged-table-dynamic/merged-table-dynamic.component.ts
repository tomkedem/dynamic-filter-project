import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-merged-table-dynamic',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzDividerModule,
    NzTypographyModule
  ],
  templateUrl: './merged-table-dynamic.component.html',
  styleUrls: ['./merged-table-dynamic.component.css']
})
export class MergedTableDynamicComponent implements OnInit {
  @Input() listOfData: any[] = [];
  @Input() columns: { title: string, field: string, rowspan: boolean, width: string }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('listOfData:', this.listOfData)
    // Load the columns from JSON file
    this.loadColumns().subscribe(columnsData => {
      this.columns = columnsData.columns;
    });

    // Load the data from JSON file
    this.loadData().subscribe(data => {
      this.listOfData = data.listOfData;
    });
  }

  loadData(): Observable<any> {
    return this.http.get<any>('assets/mock-data/dataReport1.json');
  }

  loadColumns(): Observable<any> {
    return this.http.get<any>('assets/mock-data/columnsReport1.json');  // Make sure this path is correct
  }
}
