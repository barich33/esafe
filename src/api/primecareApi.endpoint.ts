import { environment } from '../environments/environment';
export const patientEndPoint = {
  getPatients: `${environment.urls.api}/Patient/GetAllPatients`,
  addPatient: `${environment.urls.api}/Patient/AddPatient`,
  updatePatient: `${environment.urls.api}/Patient/UpdatePatient`
};

export const userEndPoint = {
  authenticate: `${environment.urls.api}/User/Authenticate`,
  getUsers: `${environment.urls.api}/User/GetAllUsers`,
  updateUser: `${environment.urls.api}/User/UpdateUser`,
  getUserById: `${environment.urls.api}/User/GetUserById`,
  addUser: `${environment.urls.api}/User/AddUser`,
};

export const lookupEndPoint = {
  getRegions: `${environment.urls.api}/Lookup/GetRegions`,
  getSubCities: `${environment.urls.api}/Lookup/getSubCities`,
};
