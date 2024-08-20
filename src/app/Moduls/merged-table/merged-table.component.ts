import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-merged-table',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,       // מודול הטבלאות של NG-ZORRO
    NzDividerModule,     // מודול המחלקים של NG-ZORRO
    NzTypographyModule   // מודול הטיפוגרפיה של NG-ZORRO
  ],
  templateUrl: './merged-table.component.html',
  styleUrls: ['./merged-table.component.css']
})
export class MergedTableComponent implements OnInit {

  public listOfData: any[] = [];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.listOfData = [
      {
        "ProjectName": "נופש ספטמבר 2024",
        "HotelName": "דן אילת",
        "ID_Number": "123456789",
        "EmployeeName": "עובד דוגמא",
        "EmployeeNumber": "123456",
        "IsSensitive": "כן",
        "SensitivityDetails": "רגישות לביצים",        
        "RoomDetails": [
          {
            "RoomTypeName": "חדר סטנדרט זוגי",
            "AssignmentDetails": "2 מבוגרים + ילד",
            "StartDate": "19.9.2024",
            "EndDate": "21.9.2024",
            "NumberOfAdults": 2,
            "NumberOfChildren": 1,
            "NumberOfBabys": 1
          },
          {
            "RoomTypeName": "חדר סטנדרט סינגל",
            "AssignmentDetails": "מבוגר/ילד אחד בחדר",
            "StartDate": "19.9.2024",
            "EndDate": "20.9.2024",
            "NumberOfAdults": 1,
            "NumberOfChildren": 0,
            "NumberOfBabys": 0
          }
        ],
        "Page": 1,
        "RoomPrice": 300,
        "SaturdayDeparture": "לא",
        "PriceSaturdayDeparture": 0,
        "ConnectingDoor": "כן",
        "FridayDinnerChild": 2,
        "FridayDinnerAdult": 2,
        "FridayDinnerPrice": 300,
        "Comments": "הילדים גדולים וממש רוצים ללכת לבלות בנהר ",
        "Attraction": "סיור בגן הוורדים",
        "AttractionQuantity": 1,
        "AttractionPrice": 110,
        "Transport": "טיסה",
        "TransportQuantity": 1,
        "TransportPrice": 310,
        "Subsidy": 510,
        "FinalPrice": 1300       
      },
      {
        "ProjectName": "נופש ספטמבר 2024",
        "HotelName": "שלמה המלך",
        "ID_Number": "99999999",
        "EmployeeName": "עובד דוגמא 2",
        "EmployeeNumber": "789456",
        "IsSensitive": "לא",
        "SensitivityDetails": "",        
        "RoomDetails": [
          {
            "RoomTypeName": "חדר סטנדרט זוגי",
            "AssignmentDetails": "2 מבוגרים + ילד",
            "StartDate": "19.9.2024",
            "EndDate": "21.9.2024",
            "NumberOfAdults": 2,
            "NumberOfChildren": 0,
            "NumberOfBabys": 0
          }
        ],
        "Page": 2,
        "RoomPrice": 220,
        "SaturdayDeparture": "לא",
        "PriceSaturdayDeparture": 0,
        "ConnectingDoor": "כן",
        "FridayDinnerChild": 2,
        "FridayDinnerAdult": 2,
        "FridayDinnerPrice": 300,
        "Comments": "הילדים גדולים וממש רוצים ללכת לבלות ולדוג דגים בים הגדול אני סבור שזה יכול להיות מאוד מהנה ",
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
        "HotelName": "דן אילת",
        "ID_Number": "123456789",
        "EmployeeName": "עובד דוגמא",
        "IsSensitive": true,
        "SensitivityDetails": "רגישות לביצים",        
        "RoomDetails": [
          {
            "RoomTypeName": "חדר סטנדרט זוגי",
            "AssignmentDetails": "2 מבוגרים + ילד",
            "StartDate": "19.9.2024",
            "EndDate": "21.9.2024",
            "NumberOfAdults": 2,
            "NumberOfChildren": 1,
            "NumberOfInfants": 1
          },
          {
            "RoomTypeName": "חדר סטנדרט סינגל",
            "AssignmentDetails": "מבוגר/ילד אחד בחדר",
            "StartDate": "19.9.2024",
            "EndDate": "20.9.2024",
            "NumberOfAdults": 1,
            "NumberOfChildren": 0,
            "NumberOfInfants": 0
          }
        ],
        "Page": 3,
        "RoomPrice": 100,
        "SaturdayDeparture": "כן",
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
        "HotelName": "שלמה המלך",
        "ID_Number": "99999999",
        "EmployeeName": "עובד דוגמא 2",
        "IsSensitive": false,
        "SensitivityDetails": "",        
        "RoomDetails": [
          {
            "RoomTypeName": "חדר סטנדרט זוגי",
            "AssignmentDetails": "2 מבוגרים + ילד",
            "StartDate": "19.9.2024",
            "EndDate": "21.9.2024",
            "NumberOfAdults": 2,
            "NumberOfChildren": 0,
            "NumberOfInfants": 0
          }
        ],        
        "Page": 4,
        "RoomPrice": 120,
        "SaturdayDeparture": "כן",
        "PriceSaturdayDeparture": 120,
        "ConnectingDoor": "לא",
        "FridayDinnerChild": 6,
        "FridayDinnerAdult": 2,
        "FridayDinnerPrice": 120,
        "Comments": "ללא הערות",
        "Attraction": "קייקים",
        "AttractionQuantity": 1,
        "AttractionPrice": 125,
        "Transport": "אוטבוס",
        "TransportQuantity": 3,
        "TransportPrice": 250,
        "Subsidy": 500,
        "FinalPrice": 1250           
      }
    ];
  }
}
