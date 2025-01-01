import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { HealthAmbitionsComponent } from './components/health-ambitions/health-ambitions.component';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { IFormStore, showFormSelctor } from './store/store.form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PersonalInformationComponent, HealthAmbitionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  title = 'wanafs';
  showFirstForm!: boolean;

  constructor(_store: Store<IFormStore>) {
    _store.select(showFormSelctor).subscribe((value) => {
      this.showFirstForm = value;
    });
  }
}
