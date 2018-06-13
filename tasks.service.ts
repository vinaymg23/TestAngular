import { EnvConfig } from './env-config';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class TasksService {
  // private baseUrl = 'https://policynotes.yellow.thig.com/api/';
  private baseUrl = this.env.setUrl().diaryURL + '/api/';
  constructor(private http: Http, private env: EnvConfig) { }
  getAllTasksByUser(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    const url = `${this.baseUrl}task/findByUser`;
    return this.http.post(url, data, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getAllTasksByGroup(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    const url = `${this.baseUrl}task/findByGroup`;
    return this.http.post(url, data, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getTaskHistory(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    const url = `${this.baseUrl}task/taskHistory`;
    return this.http.post(url, data, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
  getAllActiveUsers(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    const url = `${this.baseUrl}users/findActiveInternalUsers`;
    return this.http.post(url, data, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
  getAllGroups(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    const url = `${this.baseUrl}users/findAllGroups`;
    return this.http.post(url, data, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
  getTaskTypes(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    const url = `${this.baseUrl}task/taskTypesForUser`;
    return this.http.post(url, data, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getTaskByEntity(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    const url = `${this.baseUrl}task/findByEntity`;
    return this.http.post(url, data, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
  getUsersByTaskType(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    const url = `${this.baseUrl}task/usersThatCanReceiveTasks`;
    return this.http.post(url, data, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
  getAllTaskFilters(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    const url = `${this.baseUrl}task/taskFilters`;
    return this.http.post(url, data, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  changeTaskStatus(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    const url = `${this.baseUrl}task/changeStatus`;
    return this.http.post(url, data, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  reassignTask(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    const url = `${this.baseUrl}task/reassign`;
    return this.http.post(url, data, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
  editTask(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    const url = `${this.baseUrl}task/edit`;
    return this.http.post(url, data, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
  getTemplateList(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    const url = `${this.baseUrl}noteTemplate`;
    return this.http.post(url, data, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
  saveNewTask(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    const url = `${this.baseUrl}task/new`;
    return this.http.post(url, data, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
  getTaskByFilter(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    const url = `${this.baseUrl}task/findByFilter`;
    return this.http.post(url, data, options)
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
