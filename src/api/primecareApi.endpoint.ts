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
  getSubCities: `${environment.urls.api}/Lookup/GetSubCities`,

  getCropTypes: `${environment.urls.api}/Lookup/GetCropTypes`,
  getDiseases: `${environment.urls.api}/Lookup/GetDiseases`,
  getHighlands: `${environment.urls.api}/Lookup/GetHighlands`,
  getInsects: `${environment.urls.api}/Lookup/GetInsects`,
  getMaturityGroups: `${environment.urls.api}/Lookup/GetMaturityGroups`,
  getOrganizations: `${environment.urls.api}/Lookup/GetOrganizations`,
  getPanicleForms: `${environment.urls.api}/Lookup/GetPanicleForms`,
  getRowTypes: `${environment.urls.api}/Lookup/GetRowTypes`,
  getSoilTypes: `${environment.urls.api}/Lookup/GetSoilTypes`,
  getVarieties: `${environment.urls.api}/Lookup/GetVarieties`,
  getGrowthHabits: `${environment.urls.api}/Lookup/GetGrowthHabits`,
  getColors: `${environment.urls.api}/Lookup/getColors`,
  getTypesOfSeedBusinesses: `${environment.urls.api}/Lookup/GetTypesOfSeedBusinesses`,
  
};

export const cropEndPoint = {
  getCrops: `${environment.urls.api}/Crop/GetAllCrops`,
  addCrop: `${environment.urls.api}/Crop/AddCrop`,
  updateCrop: `${environment.urls.api}/Crop/UpdateCrop`
};

export const memberEndPoint = {
  getMembers: `${environment.urls.api}/Member/GetAllMembers`,
  getMemberById: `${environment.urls.api}/Member/GetMemberById`,
  addMember: `${environment.urls.api}/Member/AddMember`,
  updateMember: `${environment.urls.api}/Member/UpdateMember`,

  addSeedBusiness: `${environment.urls.api}/SeedBusiness/AddSeedBusiness`,
  updateSeedBusiness: `${environment.urls.api}/SeedBusiness/UpdateSeedBusiness`
};

export const pageEndPoint = {
  getPages: `${environment.urls.api}/Page/GetAllPages`,
  addPage: `${environment.urls.api}/Page/AddPage`,
  updatePage: `${environment.urls.api}/Page/UpdatePage`
};
