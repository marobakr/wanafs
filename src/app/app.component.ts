import { Component } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { HealthAmbitionsComponent } from './components/health-ambitions/health-ambitions.component';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { IFormStore } from './store/store.form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PersonalInformationComponent, HealthAmbitionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'wanafs';
  showFirstForm!: boolean;
  formData: any = {};
  clientData = {
    name: 'John Doe',
    age: 30,
    phone: '+1234567890',
    maritalStatus: 'Single',
    academicStudy: "Bachelor's in Computer Science",
    siblingOrder: 2,
    ambitions: 'Become a software engineer',
    fears: 'Public speaking',
    physicalDiseases: 'No',
    organicMedications: 'No',
    diagnosedMentalDisorder: 'No',
    psychiatricMedications: 'No',
    psychiatricMedicationssss: 'No',
  };

  constructor(private _firestore: Firestore, _store: Store<IFormStore>) {
    _store.subscribe((value) => {
      this.showFirstForm = value.showForm.showPersonalForm;
      console.log(value.formState);
    });
  }
  ngOnInit(): void {
    // this.getData()
    //   .then((data) => console.log(data))
    //   .catch((error) => console.error(error));
  }

  async getData() {
    try {
      // Reference to the "wanafs" collection
      const collectionRef = collection(this._firestore, 'wanafs');

      // Add a new document to the "wanafs" collection
      const docRef = await addDoc(collectionRef, this.clientData);
      console.log('Document added with ID:', docRef.id);
    } catch (error) {
      console.error('Error sending document:', error);
    }
  }
  // Store complete form data

  handlePersonalInfoSubmit(data: any) {
    // this.formData = { ...this.formData, ...data };
    console.log('handlePersonalInfoSubmit:', data);
  }

  handleHealthInfoSubmit(data: any) {
    // this.formData = { ...this.formData, ...data };
    console.log('handleHealthInfoSubmit:', data);
  }
}
