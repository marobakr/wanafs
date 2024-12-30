import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-health-ambitions',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './health-ambitions.component.html',
  styleUrl: './health-ambitions.component.scss',
})
export class HealthAmbitionsComponent {
  constructor() {
    this.initFormControls();
    this.initFormGroup();
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
    this.physicalDiseases = new FormControl('', Validators.required);
    this.organicMedications = new FormControl('', Validators.required);
    this.diagnosedMentalDisorder = new FormControl('', Validators.required);
    this.psychiatricMedications = new FormControl('', Validators.required);
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
}
