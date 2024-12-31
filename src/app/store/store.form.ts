import { formReducer, reducerToggleForm } from './reducer.form';

interface IPersonalForm {
  personalForm: {
    name: string;
    age: string;
    phone: string;
    maritalStatus: string;
    academicStudy: string;
    siblingOrder: string;
  };
}
interface IHealthyForm {
  healthyForm: {
    ambitions: string;
    fears: string;
    physicalDiseases: string;
    organicMedications: string;
    diagnosedMentalDisorder: string;
    psychiatricMedications: string;
    healtyData: string;
  };
}
interface IShowPersonalForm {
  showPersonalForm: boolean;
}

export interface IFormState extends IPersonalForm, IHealthyForm {}
export interface IFormStore {
  showForm: IShowPersonalForm;
  formState: IFormState;
}

export const AllReducer = {
  showForm: reducerToggleForm,
  formState: formReducer,
};
