import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MainReportsComponent } from './Moduls/main-reports/main-reports.component';

import { DynamicFormComponent } from './Moduls/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainReportsComponent,DynamicFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'dynamic-filter-project';
}
