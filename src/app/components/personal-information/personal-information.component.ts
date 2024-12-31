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
import {
  HiddenPersonalForm,
  UpdatePersonalAction,
} from '../../store/action.form';
import { IFormStore } from '../../store/store.form';

@Component({
  selector: 'app-personal-information',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.scss',
})
export class PersonalInformationComponent {
  constructor(private _store: Store<IFormStore>) {
    this.initFormControls();
    this.initFormGroup();
    _store.subscribe((data) => {
      if (data.formState.personalForm.name !== '') {
        const { name, age, phone, maritalStatus, academicStudy, siblingOrder } =
          data.formState.personalForm;
        this.personalData.setValue({
          name: name,
          age: age,
          phone: phone,
          maritalStatus: maritalStatus,
          academicStudy: academicStudy,
          siblingOrder: siblingOrder,
        });
      }
    });
  }
  @Output() emitFormData: EventEmitter<FormGroup> = new EventEmitter();
  name!: FormControl;
  age!: FormControl;
  phone!: FormControl;
  maritalStatus!: FormControl;
  academicStudy!: FormControl;
  siblingOrder!: FormControl;
  personalData!: FormGroup;

  initFormControls() {
    this.name = new FormControl(this.name, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]);
    this.age = new FormControl('', [
      Validators.required,
      Validators.min(18),
      Validators.max(60),
      Validators.pattern(/^\d+$/),
    ]);
    this.phone = new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{11}$/),
    ]);
    this.maritalStatus = new FormControl('', [
      Validators.required,
      this.customValidationMaritalStatus,
      Validators.pattern(/^(single|married|divorced|widowed)$/),
    ]);
    this.academicStudy = new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern(/^[a-zA-Z\u0600-\u06FF\s]*$/),
    ]);
    this.siblingOrder = new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/),
    ]);
  }

  initFormGroup() {
    this.personalData = new FormGroup({
      name: this.name,
      age: this.age,
      phone: this.phone,
      maritalStatus: this.maritalStatus,
      academicStudy: this.academicStudy,
      siblingOrder: this.siblingOrder,
    });
  }

  customValidationMaritalStatus(constrol: AbstractControl): null | {
    [key: string]: boolean;
  } {
    if (constrol.value === '') {
      return { notSelectValue: true };
    } else return null;
  }
  submitionForm(): void {
    if (this.personalData.valid) {
      this.emitFormData.emit(this.personalData);
      this._store.dispatch(new HiddenPersonalForm());
      this._store.dispatch(new UpdatePersonalAction(this.personalData.value));
    } else {
      this.personalData.markAllAsTouched();
      Object.keys(this.personalData.controls).forEach((key) =>
        this.personalData.controls[key].markAsDirty()
      );
    }
  }
}
