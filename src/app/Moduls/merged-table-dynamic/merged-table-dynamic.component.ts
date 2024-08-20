import { Component, OnInit } from '@angular/core';
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
    NzTableModule,       // Import NG-ZORRO table module
    NzDividerModule,     // Import NG-ZORRO divider module
    NzTypographyModule   // Import NG-ZORRO typography module
  ],
  templateUrl: './merged-table-dynamic.component.html',
  styleUrls: ['./merged-table-dynamic.component.css']
})
export class MergedTableDynamicComponent implements OnInit {

  public listOfData: any[] = [];
  public columns: { title: string, field: string, rowspan: boolean, width: string }[] = [];

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.loadColumns();
  
    this.loadData().subscribe(data => {
      this.listOfData = data.listOfData;
    });
  }

  loadColumns(): void {
    // Define the columns dynamically
    this.columns = [
      { title: 'פרויקט', field: 'ProjectName', rowspan: true, width: '120px' },
      { title: 'שם מלון', field: 'HotelName', rowspan: true, width: '100px' },
      { title: 'תעודת זהות', field: 'ID_Number', rowspan: true, width: '110px' },
      { title: 'שם עובד', field: 'EmployeeName', rowspan: true, width: '100px' },
      { title: 'מספר עובד', field: 'EmployeeNumber', rowspan: true, width: '100px' },
      { title: 'האם קיימת רגישות', field: 'IsSensitive', rowspan: true, width: '100px' },
      { title: 'פירוט רגישויות', field: 'SensitivityDetails', rowspan: true, width: '110px' },
      { title: 'סוג חדר', field: 'RoomTypeName', rowspan: false , width: '140px' },
      { title: 'פירוט שיבוץ', field: 'AssignmentDetails', rowspan: false , width: '170px' },
      { title: 'תאריך התחלה', field: 'StartDate', rowspan: false , width: '100px' },
      { title: 'תאריך סיום', field: 'EndDate', rowspan: false , width: '100px' },
      { title: 'מבוגר', field: 'NumberOfAdults', rowspan: false, width: '60px'  },
      { title: 'ילד', field: 'NumberOfChildren', rowspan: false , width: '50px' },
      { title: 'תינוק', field: 'NumberOfInfants', rowspan: false, width: '50px'  },
      { title: 'מחיר חדר', field: 'RoomPrice', rowspan: true, width: '150px' },
      { title: 'יציאה במוצ"ש', field: 'SaturdayDeparture', rowspan: true, width: '150px' },
      { title: 'מחיר יציאה במוצ"ש', field: 'PriceSaturdayDeparture', rowspan: true, width: '150px' },
      { title: 'דלת מקשרת', field: 'ConnectingDoor', rowspan: true, width: '150px' },
      { title: 'ארוחת שישי ילד', field: 'FridayDinnerChild', rowspan: true, width: '150px' },
      { title: 'ארוחת שישי מבוגר', field: 'FridayDinnerAdult', rowspan: true, width: '150px' },
      { title: 'מחיר ארוחת שישי', field: 'FridayDinnerPrice', rowspan: true, width: '150px' },
      { title: 'הערות', field: 'Comments', rowspan: true, width: '150px' },
      { title: 'אטרקציה', field: 'Attraction', rowspan: true, width: '150px' },
      { title: 'כמות', field: 'AttractionQuantity', rowspan: true, width: '150px' },
      { title: 'מחיר אטרקציה', field: 'AttractionPrice', rowspan: true, width: '150px' },
      { title: 'הסעות', field: 'Transport', rowspan: true, width: '150px' },
      { title: 'כמות', field: 'TransportQuantity', rowspan: true, width: '150px' },
      { title: 'מחיר הסעות', field: 'TransportPrice', rowspan: true, width: '150px' },
      { title: 'ספסוד', field: 'Subsidy', rowspan: true, width: '150px' },
      { title: 'מחיר סופי', field: 'FinalPrice', rowspan: true, width: '150px' }
    ];
    
  }
  loadData(): Observable<any> {
    return this.http.get<any>('assets/mock-data/data.json');
  }
  
}
