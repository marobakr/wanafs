import { Action } from '@ngrx/store';
import {
  CLEARALLFORM,
  HIDDEN_PERSONAL_FORM,
  SHOW_PERSONAL_FORM,
  UPDATE_HEALTHY_FORM,
  UPDATE_PERSONAL_FORM,
  UpdateHealthyFormAction,
  UpdatePersonalFormAction,
} from './action.form';
import { IFormState } from './store.form';

export const initiState = {
  showPersonalForm: true,
};

export const reducerToggleForm = (state = initiState, action: Action) => {
  switch (action.type) {
    case SHOW_PERSONAL_FORM:
      return { showPersonalForm: true };
    case HIDDEN_PERSONAL_FORM:
      return { showPersonalForm: false };
    default:
      return state;
  }
};

export const initStateForm: IFormState = {
  personalForm: {
    name: '',
    age: '',
    phone: '',
    maritalStatus: '',
    academicStudy: '',
    siblingOrder: '',
  },
  healthyForm: {
    ambitions: '',
    fears: '',
    physicalDiseases: '',
    organicMedications: '',
    diagnosedMentalDisorder: '',
    psychiatricMedications: '',
    healtyData: '',
  },
};

export const formReducer = (
  state: IFormState = initStateForm,
  action: Action
): IFormState => {
  const CustomPersonalAction = action as UpdatePersonalFormAction;
  const CustomHealthyAction = action as UpdateHealthyFormAction;
  switch (action.type) {
    case UPDATE_PERSONAL_FORM:
      return {
        ...state,
        personalForm: {
          ...state.personalForm,
          ...CustomPersonalAction.payload,
        },
      };

    case UPDATE_HEALTHY_FORM:
      return {
        ...state,
        healthyForm: {
          ...state.healthyForm,
          ...CustomHealthyAction.payload,
        },
      };
    case CLEARALLFORM:
      return initStateForm;
    default:
      return state;
  }
};
