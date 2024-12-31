import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { ShowPersonalForm, UpdateHealthyAction } from '../../store/action.form';
import { IFormStore } from '../../store/store.form';

@Component({
  selector: 'app-health-ambitions',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './health-ambitions.component.html',
  styleUrl: './health-ambitions.component.scss',
})
export class HealthAmbitionsComponent {
  @Output() emitFormData: EventEmitter<FormGroup> = new EventEmitter();

  constructor(private _store: Store<IFormStore>) {
    this.initFormControls();
    this.initFormGroup();
    this.physicalDiseases.valueChanges.subscribe((value) => {
      this.createNewInputForDetailsInCaseTrue(
        value,
        'detailsForphysicalDiseases'
      );
    });

    this.organicMedications.valueChanges.subscribe((value) => {
      this.createNewInputForDetailsInCaseTrue(
        value,
        'detailsForOrganicMedications'
      );
    });

    this.diagnosedMentalDisorder.valueChanges.subscribe((value) => {
      this.createNewInputForDetailsInCaseTrue(
        value,
        'detailsForMentalDisorder'
      );
    });

    this.psychiatricMedications.valueChanges.subscribe((value) => {
      this.createNewInputForDetailsInCaseTrue(
        value,
        'detailsForPsychiatricMedications'
      );
    });
    _store.subscribe((data) => {
      if (data.formState.healthyForm.ambitions !== '') {
        const {
          ambitions,
          fears,
          physicalDiseases,
          organicMedications,
          diagnosedMentalDisorder,
          psychiatricMedications,
          healtyData,
        } = data.formState.healthyForm;
        this.healtyData.setValue({
          ambitions: ambitions,
          fears: fears,
          physicalDiseases: physicalDiseases,
          organicMedications: organicMedications,
          diagnosedMentalDisorder: diagnosedMentalDisorder,
          psychiatricMedications: psychiatricMedications,
          healtyData: healtyData,
        });
      }
    });
  }

  ambitions!: FormControl;
  fears!: FormControl;
  physicalDiseases!: FormControl;
  organicMedications!: FormControl;
  diagnosedMentalDisorder!: FormControl;
  psychiatricMedications!: FormControl;
  healtyData!: FormGroup;

  initFormControls() {
    this.ambitions = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/^[a-zA-Z\u0600-\u06FF\s]*$/),
      Validators.maxLength(200),
    ]);
    this.fears = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/^[a-zA-Z\u0600-\u06FF\s]*$/),
      Validators.maxLength(200),
    ]);
    this.physicalDiseases = new FormControl('', [
      Validators.required,
      this.customValidationMaritalStatus,
    ]);
    this.organicMedications = new FormControl('', [
      Validators.required,
      this.customValidationMaritalStatus,
    ]);
    this.diagnosedMentalDisorder = new FormControl('', [
      Validators.required,
      this.customValidationMaritalStatus,
    ]);
    this.psychiatricMedications = new FormControl('', [
      Validators.required,
      this.customValidationMaritalStatus,
    ]);
  }

  initFormGroup() {
    this.healtyData = new FormGroup({
      ambitions: this.ambitions,
      fears: this.fears,
      physicalDiseases: this.physicalDiseases,
      organicMedications: this.organicMedications,
      diagnosedMentalDisorder: this.diagnosedMentalDisorder,
      psychiatricMedications: this.psychiatricMedications,
    });
  }

  createNewInputForDetailsInCaseTrue(isTrue: string, controlName: string) {
    if (isTrue === 'true') {
      this.healtyData.addControl(
        controlName,
        new FormControl('', [Validators.required, Validators.minLength(3)])
      );
    } else {
      this.healtyData.removeControl(controlName);
    }
  }

  DetailsForControl(controlName: string): AbstractControl<any, any> | null {
    return this.healtyData.get(controlName);
  }
  customValidationMaritalStatus(constrol: AbstractControl): null | {
    [key: string]: boolean;
  } {
    if (constrol.value === '') {
      return { notSelectValue: true };
    } else return null;
  }
  submitionForm(): void {
    if (this.healtyData.valid) {
      this.emitFormData.emit(this.healtyData);
      this._store.dispatch(new UpdateHealthyAction(this.healtyData.value));
    } else {
      this.healtyData.markAllAsTouched();
      Object.keys(this.healtyData.controls).forEach((key) =>
        this.healtyData.controls[key].markAsDirty()
      );
    }
  }

  dispatchActionFormBack() {
    this._store.dispatch(new ShowPersonalForm());
    this._store.dispatch(new UpdateHealthyAction(this.healtyData.value));
  }
}
