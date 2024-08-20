import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DynamicFormComponent } from './Moduls/dynamic-form/dynamic-form.component';

import { MergedTableComponent } from './Moduls/merged-table/merged-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MergedTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dynamic-filter-project';
}
