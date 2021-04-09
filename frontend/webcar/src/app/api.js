import axios from 'axios';
import LocalStorageService from '../app/service/localstorageService'

export const httpClient = axios.create({
  baseURL: 'http://localhost:3000',
});

httpClient.interceptors.request.use(async config => {
    const token = LocalStorageService.obterItem('_token')
    if (token) {
        let tokenn = `"${token}"`
        config.headers.Authorization = `${JSON.parse(tokenn)}`
    }
    return config
})

class ApiService {

  constructor(apiurl){
      this.apiurl = apiurl;
  }

  post(url, objeto){
      const requestUrl = `${this.apiurl}${url}`
      return httpClient.post(requestUrl, objeto);
  }

  put(url, objeto){
      const requestUrl = `${this.apiurl}${url}`
      return httpClient.put(requestUrl, objeto);
  }

  delete(url){
      const requestUrl = `${this.apiurl}${url}`
      return httpClient.delete(requestUrl)
  }

  get(url){
      const requestUrl = `${this.apiurl}${url}`
      return httpClient.get(requestUrl)
  }
  
}
export default ApiService;
