import { Application } from '../../core/application';

export interface ShellState {
  application: Application;
}

const defaultApplication: Application = {
  name: 'Home',
  code: 'home',
  url: 'admin/dashboard'
}

const initialState: ShellState = {
  application: defaultApplication
};

export function ApplicationReducer(state = initialState, action: { type: any; }) {
  const application = action.type;
  return {...state.application, application};
}

