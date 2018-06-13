import { EnvConfig } from './env-config';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class GenericService {

  private baseUrl = this.env.setUrl().apiURL;
  // private baseUrl = 'https://templar.yellow.thig.com';

  constructor(private http: Http, private env: EnvConfig) { }


  getLOBList() {
    const url = `${this.baseUrl}/api/lookup/getLobs`;
    return this.http.get(url)
      .map((res: Response) => res.json())
      .catch(this.handleError);

  }
  getCompanyList() {
    const url = `${this.baseUrl}/api/lookup/getCompanies`;
    return this.http.get(url)
      .map((res: Response) => res.json())
      .catch(this.handleError);

  }
  getStatesList() {
    const url = `${this.baseUrl}/api/lookup/getStates`;
    return this.http.get(url)
      .map((res: Response) => res.json())
      .catch(this.handleError);

  }
  getCountiesByStateId(stateId) {
    const url = `${this.baseUrl}/api/lookup/getCountiesByStateId/${stateId}`;
    return this.http.get(url)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
  getAccountingStatusTypes() {
    const url = `${this.baseUrl}/api/lookup/getAccountingStatusTypes`;
    return this.http.get(url)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getCountries() {
    const url = `${this.baseUrl}/api/disbursement/getCountries/`;
    return this.http.get(url)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
  getSubDivision(countryId) {
    const url = `${this.baseUrl}/api/disbursement/getSubDivisions/${countryId}`;
    return this.http.get(url)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  removeLock(data, type) {
    // this.baseUrl = 'http://WFLGNVCON15:8080';
    const url = `${this.baseUrl}/api/businessLock/delete/${type}`;
    return this.http.post(url, data)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
  createLock(data) {
    const url = `${this.baseUrl}/api/businessLock/save/`;
    return this.http.post(url, data)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
  getPolicyLockStatus(policyMasterId) {
    // this.baseUrl = 'http://WFLGNVCON15:8080';
    const url = `${this.baseUrl}/api/businessLock/getPolicyLockStatus/${policyMasterId}`;
    return this.http.get(url)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
  // International address API
  getAllCountriesList() {
    const url = `${this.baseUrl}/api/InternationalAddress/getAllCountries/`;
    return this.http.get(url)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
  getChoiceValues(country) {
    const url = `${this.baseUrl}/api/InternationalAddress/getAdministrativeAreaList/${country}`;
    return this.http.get(url)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
  getDynamicAddressFields(country) {
    const url = `${this.baseUrl}/api/InternationalAddress/getInternationalAddress/${country}`;
    return this.http.get(url)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
  createNewMailingAdress(data) {
    const url = `${this.baseUrl}/api/disbursement/saveMailAddress/`;
    return this.http.post(url, data)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }



  private handleError(error: Response) {
    if (error.status >= 500) {
      error['message'] = 'Server is down. Please try after sometime';
      return Observable.throw(error);
    } else {
      return Observable.throw(error.json() || 'Server Error');
    }
  }

}
