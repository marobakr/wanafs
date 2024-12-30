import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-health-ambitions',
  standalone: true,
  imports: [],
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
    this.ambitions = new FormControl();
    this.fears = new FormControl();
    this.physicalDiseases = new FormControl();
    this.organicMedications = new FormControl();
    this.diagnosedMentalDisorder = new FormControl();
    this.psychiatricMedications = new FormControl();
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
