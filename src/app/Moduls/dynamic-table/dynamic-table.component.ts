import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [CommonModule, NzTableModule],
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css']
})
export class DynamicTableComponent implements OnInit {

  public listOfData: any[] = [];
  public listOfColumns: any[] = [];

  ngOnInit(): void {
    this.loadData();
    this.setupColumns();
  }

  loadData(): void {
    this.listOfData = [
      {
        "ProjectName": "נופש ספטמבר 2024",
        "HotelName": "מלון התמר",
        "ID_Number": 123456789,
        "EmployeeName": "יוסי כהן",
        "EmployeeNumber": 1001,
        "IsSensitive": true,
        "SensitivityDetails": "רגישות לגלוטן",
        "RoomDetails": [
          {
            "RoomTypeName": "חדר סטנדרטי זוגי",
            "AssignmentDetails": "מבוגר/ילד אחד בחדר",
            "StartDate": "2024-08-01",
            "EndDate": "2024-08-03",
            "NumberOfAdults": 2,
            "NumberOfChildren": 1,
            "NumberOfInfants": 0
          },
          {
            "RoomTypeName": "סוויטה נשיאותית",
            "AssignmentDetails": "2 מבוגרים",
            "StartDate": "2024-08-03",
            "EndDate": "2024-08-05",
            "NumberOfAdults": 2,
            "NumberOfChildren": 0,
            "NumberOfInfants": 0
          }
        ],
        "Page": 1,
        "PriceSaturdayDeparture": 200,
        "ConnectingDoor": "כן",
        "FridayDinnerChild": 3,
        "FridayDinnerAdult": 2,
        "FridayDinnerPrice": 150,
        "Comments": "ללא הערות",
        "Attraction": "סיור בגן חיות",
        "AttractionQuantity": 1,
        "AttractionPrice": 100,
        "Transport": "שירות הסעות VIP",
        "TransportQuantity": 1,
        "TransportPrice": 300,
        "Subsidy": 500,
        "FinalPrice": 1000
      },
      {
        "ProjectName": "נופש ספטמבר 2024",
        "HotelName": "מלון התמר",
        "ID_Number": 123456789,
        "EmployeeName": "יוסי כהן",
        "EmployeeNumber": 1001,
        "IsSensitive": true,
        "SensitivityDetails": "רגישות לגלוטן",
        "RoomDetails": [
          {
            "RoomTypeName": "סוויטה נשיאותית",
            "AssignmentDetails": "2 מבוגרים",
            "StartDate": "2024-12-01",
            "EndDate": "2024-12-03",
            "NumberOfAdults": 2,
            "NumberOfChildren": 0,
            "NumberOfInfants": 0
          },
          {
            "RoomTypeName": "חדר דלוקס",
            "AssignmentDetails": "מבוגר אחד",
            "StartDate": "2024-12-03",
            "EndDate": "2024-12-05",
            "NumberOfAdults": 1,
            "NumberOfChildren": 0,
            "NumberOfInfants": 0
          }
        ],
        "Page": 2,
        "PriceSaturdayDeparture": 250,
        "ConnectingDoor": "לא",
        "FridayDinnerChild": 0,
        "FridayDinnerAdult": 2,
        "FridayDinnerPrice": 200,
        "Comments": "ללא",
        "Attraction": "ביקור במוזיאון",
        "AttractionQuantity": 2,
        "AttractionPrice": 120,
        "Transport": "הסעות חינם",
        "TransportQuantity": 1,
        "TransportPrice": 0,
        "Subsidy": 300,
        "FinalPrice": 870
      },
      // Additional data entries go here
    ];

    // Add a property to each entry to display RoomDetails as a concatenated string or a formatted table
    this.listOfData.forEach(data => {
      data['RoomDetailsRows'] = this.generateRoomDetailsRows(data.RoomDetails);
    });
  }

  generateRoomDetailsRows(roomDetails: any[]): string {
    return roomDetails.map(room => {
      return `
        <div>
          <strong>Room Type:</strong> ${room.RoomTypeName}, 
          <strong>Assignment:</strong> ${room.AssignmentDetails}, 
          <strong>Start:</strong> ${room.StartDate}, 
          <strong>End:</strong> ${room.EndDate}, 
          <strong>Adults:</strong> ${room.NumberOfAdults}, 
          <strong>Children:</strong> ${room.NumberOfChildren}
        </div>
      `;
    }).join('');
  }
  


  setupColumns(): void {
    this.listOfColumns = [
      { title: 'Project Name', field: 'ProjectName' },
      { title: 'Hotel Name', field: 'HotelName' },
      { title: 'ID Number', field: 'ID_Number' },
      { title: 'Employee Name', field: 'EmployeeName' },
      { title: 'Sensitivity Details', field: 'SensitivityDetails' },
      { title: 'Room Details', field: 'RoomDetailsRows' },  // This will now contain the generated room details
      { title: 'Final Price', field: 'FinalPrice' }
    ];
  }
}
