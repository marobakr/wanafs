import { Action } from '@ngrx/store';
import { IFormState } from './store.form';

export const SHOW_PERSONAL_FORM = 'SHOW_PERSONAL_FORM';
export const HIDDEN_PERSONAL_FORM = 'HIDDEN_PERSONAL_FORM';

export const UPDATE_PERSONAL_FORM = 'UPDATE_PERSONAL_FORM';
export const UPDATE_HEALTHY_FORM = 'UPDATE_HEALTHY_FORM';

export const CLEARALLFORM = 'CLEARALLFORM';

export interface UpdatePersonalFormAction extends Action {
  type: typeof UPDATE_PERSONAL_FORM;
  payload: IFormState['personalForm'];
}

export interface UpdateHealthyFormAction extends Action {
  type: typeof UPDATE_HEALTHY_FORM;
  payload: IFormState['healthyForm'];
}

export class ShowPersonalForm {
  type: string = SHOW_PERSONAL_FORM;
}
export class HiddenPersonalForm {
  type: string = HIDDEN_PERSONAL_FORM;
}

export class UpdatePersonalAction implements UpdatePersonalFormAction {
  type: typeof UPDATE_PERSONAL_FORM = 'UPDATE_PERSONAL_FORM';
  payload;
  constructor(payload: IFormState['personalForm']) {
    this.payload = payload;
    console.log('this.payload', this.payload);
  }
}

export class UpdateHealthyAction implements UpdateHealthyFormAction {
  type: typeof UPDATE_HEALTHY_FORM = 'UPDATE_HEALTHY_FORM';
  payload;
  constructor(payload: IFormState['healthyForm']) {
    this.payload = payload;
  }
}
