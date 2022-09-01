
import axios from 'axios';
import { environment } from '../environments/environment';
import { getToken } from './token.service';


const baseURL=`${environment.urls.api}`;
const token=getToken();
const AxiosService = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
    'Access-Control-Allow-Credentials': true,
  },
})
AxiosService.interceptors.response.use(
  (response:any) =>
    new Promise((resolve, reject) => {
      resolve(response)
    }),
  (error:any) => {
      return new Promise((resolve, reject) => {
        reject(error)
      })

  }
)
export const httpService = AxiosService;
