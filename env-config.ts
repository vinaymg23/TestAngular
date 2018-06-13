
import { EventEmitter, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class EnvConfig {
        selectedPermissions = [];
        envUrl = {
                apiURL: '',
                diaryURL: '',
                citadelURL: '',
                oasisURL: ''
        };
        constructor(private http: Http) {
        }
        getEnvironmentUrl(value) {
                switch (value) {
                        case 'beta':
                                this.envUrl = {
                                        apiURL: 'https://templar.beta.thig.com',
                                        diaryURL: 'https://policynotes.beta.thig.com',
                                        citadelURL: 'https://citadel.beta.thig.com',
                                        oasisURL: 'https://oasis.beta.thig.com'
                                }
                                break;
                        case 'uat':
                                this.envUrl = {
                                        apiURL: 'https://templar.uat.thig.com',
                                        diaryURL: 'https://policynotes.uat.thig.com',
                                        citadelURL: 'https://citadel.uat.thig.com',
                                        oasisURL: 'https://oasis.uat.thig.com'
                                }
                                break;
                        case 'qa':
                                this.envUrl = {
                                        apiURL: 'https://templar.purple.thig.com',
                                        diaryURL: 'https://policynotes.purple.thig.com',
                                        citadelURL: 'https://citadel.purple.thig.com',
                                        oasisURL: 'https://oasis.purple.thig.com'
                                }
                                break;
                        case 'unitqa':
                                this.envUrl = {
                                        apiURL: 'https://templar.unitqa.thig.com',
                                        diaryURL: 'https://policynotes.unitqa.thig.com',
                                        citadelURL: 'https://citadel.unitqa.thig.com',
                                        oasisURL: 'https://oasis.unitqa.thig.com'
                                }
                                break;
                        case 'red':
                                this.envUrl = {
                                        apiURL: 'https://templar.red.thig.com',
                                        diaryURL: 'https://policynotes.red.thig.com',
                                        citadelURL: 'https://citadel.red.thig.com',
                                        oasisURL: 'https://oasis.red.thig.com'

                                }
                                break;

                        case 'orange':
                                this.envUrl = {
                                        apiURL: 'https://templar.orange.thig.com',
                                        diaryURL: 'https://policynotes.orange.thig.com',
                                        citadelURL: 'https://citadel.orange.thig.com',
                                        oasisURL: 'https://oasis.orange.thig.com'
                                }
                                break;
                        case 'local':
                                this.envUrl = {
                                        apiURL: 'http://localhost:8080',
                                        diaryURL: 'https://policynotes.yellow.thig.com',
                                        citadelURL: 'https://citadel.yellow.thig.com',
                                        oasisURL: 'https://oasis.yellow.thig.com'
                                }
                                break;
                        case 'purple':
                                this.envUrl = {
                                        apiURL: 'https://templar.purple.thig.com',
                                        diaryURL: 'https://policynotes.purple.thig.com',
                                        citadelURL: 'https://citadel.purple.thig.com',
                                        oasisURL: 'https://oasis.purple.thig.com'
                                };
                                break;
                        case 'yellow':
                                this.envUrl = {
                                        apiURL: 'https://templar.yellow.thig.com',
                                        diaryURL: 'https://policynotes.yellow.thig.com',
                                        citadelURL: 'https://citadel.yellow.thig.com',
                                        oasisURL: 'https://oasis.yellow.thig.com'
                                };
                                break;
                        case 'green':
                                this.envUrl = {
                                        apiURL: 'https://templar.green.thig.com',
                                        diaryURL: 'https://policynotes.green.thig.com',
                                        citadelURL: 'https://citadel.green.thig.com',
                                        oasisURL: 'https://oasis.green.thig.com'
                                }
                                break;
                        default:
                                this.envUrl = {
                                        apiURL: 'https://templar.yellow.thig.com',
                                        diaryURL: 'https://policynotes.yellow.thig.com',
                                        citadelURL: 'https://citadel.yellow.thig.com',
                                        oasisURL: 'https://oasis.yellow.thig.com'
                                };
                }
                console.log('env', this.envUrl);
                return this.envUrl;
        }
        setUrl() {
                return this.envUrl;
        }
        getEnvironment(): Promise<any> {
                let url;
                if (location.hostname === 'localhost') {
                        url = 'https://templar.yellow.thig.com/api/getActiveProfile';
                } else {
                        url = 'https://' + location.hostname + '/api/getActiveProfile';
                }
                return this.http.get(url).map((res: Response) => res.json()).toPromise()
                        .then((data: any) => this.getEnvironmentUrl(data.activeprofile))
                        .catch((err: any) => Promise.resolve());
        }
}
