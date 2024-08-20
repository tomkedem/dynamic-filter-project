import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MainReportsComponent } from './Moduls/main-reports/main-reports.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainReportsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dynamic-filter-project';
}
