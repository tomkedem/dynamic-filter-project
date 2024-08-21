import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
export class MergedTableDynamicComponent implements OnInit, OnChanges {
  @Input() dataJsonPath: string = '';  // Path to the JSON file for table data, passed from the parent component
  @Input() columnsJsonPath: string = '';  // Path to the JSON file for column definitions, passed from the parent component

  columns: { title: string, field: string, rowspan: boolean, width: string }[] = [];  // Holds the structure of the table columns
  listOfData: any[] = [];  // Holds the data to be displayed in the table

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadJsonData();  // Load the JSON data when the component initializes
  }

  ngOnChanges(changes: SimpleChanges): void {
    // If either dataJsonPath or columnsJsonPath changes, reload the data and clear the table
    if (changes['dataJsonPath'] || changes['columnsJsonPath']) {
      this.clearTable();  // Clear the table before loading new data
      this.loadJsonData();  // Load the new data based on the updated paths
    }
  }

  loadJsonData(): void {
    // Debugging information to check the paths being used
    console.log('dataJsonPath: child===>', this.dataJsonPath);
    console.log('columnsJsonPath: child===>', this.columnsJsonPath);
    
    // Load columns data if the columnsJsonPath is defined
    if (this.columnsJsonPath) {
      this.loadColumns(this.columnsJsonPath).subscribe(columnsData => {
        this.columns = columnsData.columns;  // Update the columns structure
      });
    }

    // Load table data if the dataJsonPath is defined
    if (this.dataJsonPath) {
      this.loadData(this.dataJsonPath).subscribe(data => {
        this.listOfData = data.listOfData;  // Update the table data
      });
    }
  }

  loadData(jsonPath: string): Observable<any> {
    // Fetch data from the given JSON path
    return this.http.get<any>(jsonPath);
  }

  loadColumns(jsonPath: string): Observable<any> {
    // Fetch column definitions from the given JSON path
    return this.http.get<any>(jsonPath);
  }

  clearTable(): void {
    // Clear the current table data and column structure
    this.columns = [];  
    this.listOfData = [];  
  }
}
