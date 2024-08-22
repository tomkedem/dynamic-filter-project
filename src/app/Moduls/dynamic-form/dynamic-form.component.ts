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
import { NZ_I18N, NzI18nService, he_IL } from 'ng-zorro-antd/i18n';
import heDateLocale from 'date-fns/locale/he';
import { ReportType } from '../../../shared/report-type.enum';
import he from '@angular/common/locales/he';
import { NzGridModule } from 'ng-zorro-antd/grid';

registerLocaleData(he);

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
  cssClass?: string;
  gridColumn?: string;
}

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzSwitchModule,
    NzButtonModule,
    NzSelectModule,
    NzInputModule,
    NzAutocompleteModule,
    NzDatePickerModule,
    NzInputNumberModule,
    NzGridModule 
  ],
  providers: [{ provide: NZ_I18N, useValue: he_IL }],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input() selectedReportType: ReportType | null = null;
  @Input() schema: any = null;

  form: FormGroup;
  controlsVisible = true;
  controls: Control[] = [];
  autoOptions: Array<{ id: number; name: string }> = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private i18n: NzI18nService
  ) {
    this.form = this.fb.group({});
    this.i18n.setDateLocale(heDateLocale);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['selectedReportType'] &&
      this.selectedReportType !== null &&
      this.schema
    ) {
      this.loadReportControls(this.selectedReportType, this.schema);
    }
  }

  ngOnInit(): void {
    // Initialize form if needed
  }

  // Method to toggle the visibility of form controls
  toggleFilters(checked: boolean): void {
    this.controlsVisible = checked;
  }


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

  loadFormControls(controls: Control[]): void {
    controls.forEach((c) => {
      const validators = this.buildValidators(c.validators || {});
      const formControl = this.fb.control(
        { value: '', disabled: false },
        validators
      );
      this.form.addControl(c.controlName, formControl);

      const formGroupClass = c.gridColumn
        ? `form-control-group ${c.gridColumn}`
        : 'form-control-group';
      c['cssClass'] = formGroupClass;

      if (c.dependsOn) {
        this.form.get(c.dependsOn)?.valueChanges.subscribe((selectedValue) => {
          this.loadDependentOptions(c, selectedValue);
        });
      } else {
        this.loadOptionsForControl(c);
      }

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

  loadDependentOptions(control: Control, selectedValues: string[]): void {
    if (
      selectedValues &&
      selectedValues.length > 0 &&
      control.optionsEndpoint &&
      control.dependsOn
    ) {
      const selectedValuesString = selectedValues.join(',');

      const endpoint = `${control.optionsEndpoint}?${control.dependsOn}Ids=${selectedValuesString}`;

      this.http.get(endpoint).subscribe((response: any) => {
        if (endpoint?.includes('hotels')) {
          const hotels = response.hotels
            .filter((hotelGroup: any) =>
              selectedValues.includes(hotelGroup.projectId.toString())
            )
            .flatMap((hotelGroup: any) => hotelGroup.hotels);

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

        this.form.get(control.controlName)?.enable();
      });
    } else {
      this.form.get(control.controlName)?.disable();
    }
  }

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

        this.form.get(control.controlName)?.enable();
      });
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

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form Submitted', this.form.value);
      // Perform the desired actions with the form data
    } else {
      console.log('Form is invalid');
    }
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    // Filter the employees by the name based on the input value
  }


  trackByOption(index: number, option: any): any {
    return `${index}-${option.value}`; // או פשוט להשתמש ב-option.id אם קיים
  }
  

  trackByControl(index: number, control: Control): any {
    return control.controlName; // Assuming controlName is unique for each control
  }
}
