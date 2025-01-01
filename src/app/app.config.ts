import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';

import { provideClientHydration } from '@angular/platform-browser';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideToastr } from 'ngx-toastr';
import { firebaseConfig } from '../../firebase-config';
import { routes } from './app.routes';
import { AllReducer, IFormStore } from './store/store.form';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStore<IFormStore>(AllReducer),
    importProvidersFrom([BrowserAnimationsModule, NgxSpinnerModule]),
    provideToastr({
      timeOut: 5000,
      positionClass: 'toast-top-left',
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'decreasing',
    }),
    provideAnimations(),
  ],
};
