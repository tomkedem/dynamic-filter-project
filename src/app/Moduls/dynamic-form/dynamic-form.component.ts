import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, registerLocaleData } from '@angular/common';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { Direction, Directionality } from '@angular/cdk/bidi';

import {
  NZ_I18N,
  NzI18nService,
  he_IL,
  NZ_DATE_LOCALE,
} from 'ng-zorro-antd/i18n'; // NG-ZORRO I18N services for localization

import he from '@angular/common/locales/he'; // Hebrew locale from NG-ZORRO

import heDateLocale from 'date-fns/locale/he';
import { ReportType } from '../../../shared/report-type.enum';

registerLocaleData(he);

// registerLocaleData(he);
// Define the Control interface to ensure type safety
interface Control {
  type: string; // Type of control (e.g., 'dropdown', 'input', etc.)
  label: string; // Label for the form control
  controlName: string; // FormControl name used in the reactive form
  validators?: {
    required?: boolean; // Whether the control is required
    minLength?: number; // Minimum length validator
    maxLength?: number; // Maximum length validator
    min?: number; // Minimum value validator
    max?: number; // Maximum value validator
  };

  optionsEndpoint?: string; // Endpoint for fetching options (e.g., for dropdowns)

  dependsOn?: string; // Dependency on another form control

  options?: any[]; // Options for the control (e.g., dropdown options)

  order?: number; // Order in which the control appears in the form

  cssClass?: string; // CSS class for layout/grid purposes

  gridColumn?: string; // Grid column span for responsive layout
}

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzSwitchModule,
    NzButtonModule,
    NzSelectModule,
    NzInputModule,
    NzAutocompleteModule,
    NzDatePickerModule,
    NzInputNumberModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: he_IL }],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input() selectedReportType: ReportType | null = null; // Input for receiving the selected report type
  @Input() schema: any = null; // Receive schema from parent component

  form: FormGroup;
  controlsVisible = true; // Boolean to track visibility of form controls
  controls: Control[] = []; // Array to hold dynamically loaded form controls
  inputValue?: string; // Value of input for autocomplete
  autoOptions: Array<{ id: number; name: string }> = []; // Filtered options for autocomplete

  // allEmployees: { id: string, name: string }[] = []; // This will hold all employees
  constructor(
    private fb: FormBuilder, // FormBuilder service for creating reactive forms
    private http: HttpClient, // HTTP client for making API requests
    private i18n: NzI18nService // NG-ZORRO I18n service for localization
  ) {
    this.form = this.fb.group({});
    this.i18n.setDateLocale(heDateLocale);
  }

  // Method to toggle the visibility of form controls
  toggleFilters(checked: boolean): void {
    this.controlsVisible = checked;
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;

    // Filter the employees by the name based on the input value

    // this.autoOptions = this.allEmployees

    //   .filter(employee => employee.name.includes(value))  // Filter the employees based on the input

    //   .map(employee => ({ id: employee.id, name: employee.name })); // Map to the same structure with id and name
  }
 
  ngOnChanges(changes: SimpleChanges): void {
    console.log('Tomerrrrrrrrrrrr=======>', this.schema);
    this.schema;
    if (
      changes['selectedReportType'] &&
      this.selectedReportType !== null &&
      this.schema
    ) {
      this.loadReportControls(this.selectedReportType, this.schema);
    }
  }

  ngOnInit(): void {
    // Initialize form with a report type selection control
  }

  // Method to load form controls dynamically based on the schema

  loadFormControls(controls: Control[]): void {
    controls.forEach((c) => {
      const validators = this.buildValidators(c.validators || {}); // Build validators for the control

      const formControl = this.fb.control(
        { value: '', disabled: false },
        validators
      ); // Create the form control with validators

      this.form.addControl(c.controlName, formControl); // Add the control to the form group

      // Create a dynamic class for grid layout based on gridColumn

      const formGroupClass = c.gridColumn
        ? `form-control-group ${c.gridColumn}`
        : 'form-control-group';

      // Set the class dynamically
      c['cssClass'] = formGroupClass;

      // Handle dependent controls
      if (c.dependsOn) {
        this.form.get(c.dependsOn)?.valueChanges.subscribe((selectedValue) => {
          this.loadDependentOptions(c, selectedValue);
        });
      } else {
        this.loadOptionsForControl(c);
      }

      // Ensure multipleselect controls are initialized as arrays
      if (c.type === 'multipleselect') {
        const selectedValues = this.form.get(c.controlName)?.value || [];
        this.form
          .get(c.controlName)
          ?.setValue(
            Array.isArray(selectedValues) ? selectedValues : [selectedValues]
          );
      }
    });
  }

  // Method to load options for controls that depend on the value of another control

  loadDependentOptions(control: Control, selectedValues: string[]): void {
    if (
      selectedValues &&
      selectedValues.length > 0 &&
      control.optionsEndpoint &&
      control.dependsOn
    ) {
      // Convert the selectedValues array to a comma-separated string

      const selectedValuesString = selectedValues.join(',');

      const endpoint = `${control.optionsEndpoint}?${control.dependsOn}Ids=${selectedValuesString}`;

      this.http.get(endpoint).subscribe((response: any) => {
        if (endpoint?.includes('hotels')) {
          // Find all hotels that match any of the selected project IDs
          const hotels = response.hotels
            .filter((hotelGroup: any) =>
              selectedValues.includes(hotelGroup.projectId.toString())
            )
            .flatMap((hotelGroup: any) => hotelGroup.hotels);

          // const hotels = response.hotels.find((h: any) => h.projectId === selectedValue.toString())?.hotels;

          control.options = hotels || [];
        } else if (endpoint?.includes('rooms')) {
          const rooms = response.rooms

            .find((room: any) =>
              selectedValues.includes(room.hotelId.toString())
            )

            .map((room: any) => room.rooms)
            .flat();

          control.options = rooms || [];
        }

        this.form.get(control.controlName)?.enable(); // Enable control when options are loaded
      });
    } else {
      this.form.get(control.controlName)?.disable(); // Disable control if the parent selection is cleared
    }
  }

  // Method to build an array of validators based on the control's configuration

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

  // Method to clear all dynamically loaded controls from the form, except the reportType control

  clearFormControls(): void {
    Object.keys(this.form.controls).forEach((controlName) => {
      if (controlName !== 'reportType') {
        this.form.removeControl(controlName);
      }
    });
  }

  // Method to load form controls based on the selected report type from the schema

  loadReportControls(reportType: ReportType, schema: any): void {
    const selectedReport = schema.reportTypes.find(
      (rt: any) => Number(rt.reportType) === reportType
    );

    if (selectedReport) {
      this.controls = selectedReport.controls as Control[];
      this.controls.sort((a, b) => a.order! - b.order!);
      this.loadFormControls(this.controls);
    } else {
      console.error(`No report type found for: ${reportType}`);
    }
  }
  // Method to load options for controls that do not depend on another control

  loadOptionsForControl(control: Control): void {
    if (control.optionsEndpoint && !control.dependsOn) {
      this.http.get(control.optionsEndpoint).subscribe((options: any) => {
        if (control.optionsEndpoint?.includes('projects')) {
          control.options = options.projects || [];
        } else if (control.optionsEndpoint?.includes('employees')) {
          control.options = options.employees || [];
        } else if (control.optionsEndpoint?.includes('origins')) {
          control.options = options.origins || [];
        } else if (control.optionsEndpoint?.includes('destinations')) {
          control.options = options.destinations || [];
        }

        this.form.get(control.controlName)?.enable(); // Enable control when options are loaded
      });
    }
  }

  // Method to handle form submission

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form Submitted', this.form.value);

      // Perform the desired actions with the form data
    } else {
      console.log('Form is invalid');
    }
  }

  trackByOption(index: number, option: any): any {
    return option.value; // Ensure that the value uniquely identifies each option
  }
  
}
