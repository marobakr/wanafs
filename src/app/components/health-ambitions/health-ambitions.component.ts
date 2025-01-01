import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DataFirebaseService } from '../../core/service/data-firebase.service';
import { ShowPersonalForm, UpdateHealthyAction } from '../../store/action.form';
import { IFormState, IFormStore } from '../../store/store.form';

@Component({
  selector: 'app-health-ambitions',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxSpinnerComponent],
  templateUrl: './health-ambitions.component.html',
  styleUrl: './health-ambitions.component.scss',
})
export class HealthAmbitionsComponent {
  registrationForm!: IFormState['personalForm'] & IFormState['healthyForm'];

  constructor(
    private _store: Store<IFormStore>,
    private _dataFirebaseService: DataFirebaseService,
    private _ngxSpinnerService: NgxSpinnerService,
    private _toastr: ToastrService
  ) {
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
      this.registrationForm = {
        ...data.formState.personalForm,
        ...data.formState.healthyForm,
      };
      if (data.formState.healthyForm.ambitions !== '') {
        const {
          ambitions,
          fears,
          physicalDiseases,
          organicMedications,
          diagnosedMentalDisorder,
          psychiatricMedications,
        } = data.formState.healthyForm;
        this.healtyData.setValue({
          ambitions: ambitions,
          fears: fears,
          physicalDiseases: physicalDiseases,
          organicMedications: organicMedications,
          diagnosedMentalDisorder: diagnosedMentalDisorder,
          psychiatricMedications: psychiatricMedications,
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
      this._store.dispatch(new UpdateHealthyAction(this.healtyData.value));
      this.setData(this.registrationForm);
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

  setData(data: IFormState['personalForm'] & IFormState['healthyForm']) {
    this._toastr.success('successfully');
    // this._dataFirebaseService.sendData(data).subscribe({
    //   next: () => {
    //     this._ngxSpinnerService.show();
    //     this._store.dispatch({ type: 'CLEARALLFORM' });
    //   },
    //   error: (error) => {
    //     this._ngxSpinnerService.hide();
    //     this._toastr.error('Error sending data');
    //   },
    //   complete: () => {
    //     setTimeout(() => {
    //       this._ngxSpinnerService.hide();
    //     }, 2000);
    //     console.log('Data sent successfully');
    //   },
    // });
  }
}
