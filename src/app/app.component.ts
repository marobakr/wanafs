import { Component } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { RouterOutlet } from '@angular/router';
import { HealthAmbitionsComponent } from './components/health-ambitions/health-ambitions.component';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PersonalInformationComponent,
    HealthAmbitionsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'wanafs';
  showFirstForm = true;
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

  constructor(private _firestore: Firestore) {}
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
    console.log('ngOnChanges', this.showFirstForm);

    this.formData = { ...this.formData, ...data };
    console.log('this.formData', this.formData);
  }

  handleHealthInfoSubmit(data: any) {
    this.formData = { ...this.formData, ...data };
    console.log('Final Form Data:', this.formData);
  }
}
