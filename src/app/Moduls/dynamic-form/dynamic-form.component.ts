import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReportType } from '../../../shared/report-type.enum';
import { CommonModule } from '@angular/common';

interface Control {
  type: string;
  label: string;
  controlName: string;
  validators?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  };
  optionsEndpoint?: string;
  dependsOn?: string;
  options?: any[];
  order?: number;
  cssClass?: string;  // Add gridColumn property here
  gridColumn?: string;  // Add gridColumn property here
}

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']  // Updated to use `styleUrls` instead of `styleUrl`
})
export class DynamicFormComponent implements OnInit {
  form: FormGroup;
  controlsVisible = true; // This variable tracks the visibility of the controls
  controls: Control[] = [];
  reportTypes = ReportType;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({});
  }

  toggleFilters(): void {
    this.controlsVisible = !this.controlsVisible;
  }
  ngOnInit(): void {
    // Initialize form with a report type selection control
    this.form.addControl('reportType', this.fb.control({ value: '', disabled: false }, Validators.required));
  
    this.http.get('/assets/mock-data/reports-schema.json').subscribe((schema: any) => {
      console.log('Schema loaded:', schema);
  
      // Set default value for reportType to 1 after the schema has been loaded
      this.form.get('reportType')?.setValue(1);
  
      // Load controls for the default report type
      this.loadReportControls(1, schema);
      
      // Handle changes to the report type
      this.form.get('reportType')?.valueChanges.subscribe((reportType: ReportType) => {
        if (schema) {
          this.loadReportControls(reportType, schema);
        } else {
          console.error('Schema is not loaded yet.');
        }
      });
    }, (error) => {
      console.error('Failed to load schema:', error);
    });
  }
  

  loadFormControls(controls: Control[]): void {
    controls.forEach(control => {
        const validators = this.buildValidators(control.validators || {});
        const formControl = this.fb.control({ value: '', disabled: true }, validators);
        
        this.form.addControl(control.controlName, formControl);

        // Create a dynamic class for grid layout
        const formGroupClass = control.gridColumn ? `form-control-group ${control.gridColumn}` : 'form-control-group';

        // Set the class dynamically
        control['cssClass'] = formGroupClass;

        // Handle dependent controls
        if (control.dependsOn) {
            this.form.get(control.dependsOn)?.valueChanges.subscribe(selectedValue => {
                this.loadDependentOptions(control, selectedValue);
            });
        }
    });
}

  loadDependentOptions(control: Control, selectedValue: string): void {
    if (selectedValue) {
      const endpoint = `${control.optionsEndpoint}?${control.dependsOn}Id=${selectedValue}`;
      this.http.get(endpoint).subscribe((options: any) => {
        control.options = options;
        this.form.get(control.controlName)?.enable(); // Enable control when options are loaded
      });
    } else {
      this.form.get(control.controlName)?.disable(); // Disable control if the parent selection is cleared
    }
  }

  buildValidators(validatorsConfig: any): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    if (validatorsConfig.required) {
      validators.push(Validators.required);
    }
    if (validatorsConfig.minLength) {
      validators.push(Validators.minLength(validatorsConfig.minLength));
    }
    if (validatorsConfig.maxLength) {
      validators.push(Validators.maxLength(validatorsConfig.maxLength));
    }
    if (validatorsConfig.min) {
      validators.push(Validators.min(validatorsConfig.min));
    }
    if (validatorsConfig.max) {
      validators.push(Validators.max(validatorsConfig.max));
    }

    return validators;
  }

  clearFormControls(): void {
    Object.keys(this.form.controls).forEach(controlName => {
      if (controlName !== 'reportType') {
        this.form.removeControl(controlName);
      }
    });
  }

  loadReportControls(reportType: ReportType, schema: any): void {
    console.log('Loading report type:', reportType);
    this.clearFormControls();
  
    // Convert reportType to a number explicitly if it's not already
    const reportTypeNumber = Number(reportType);
  
    // Find the corresponding report type in the schema
    const selectedReport = schema.reportTypes.find((rt: any) => Number(rt.reportType) === reportTypeNumber);
  
    if (selectedReport) {
      console.log('Selected Report:', selectedReport);
      this.controls = selectedReport.controls as Control[];
      this.controls.sort((a, b) => a.order! - b.order!); // Sort controls by 'order'
      this.loadFormControls(this.controls);
    } else {
      console.error(`No report type found for: ${reportType}. Available report types:`, schema.reportTypes.map((rt: any) => rt.reportType));
    }
  }
  

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form Submitted', this.form.value);
      // Perform the desired actions with the form data
    } else {
      console.log('Form is invalid');
    }
  }
}
