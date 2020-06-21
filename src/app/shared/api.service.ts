import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, tap, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable()
export class ApiService {
  public projectData$: Observable<{}> = of([]) ;
  public EIN: any;
  public token: any = '';
  public httpHeaders: any;
  public selProjectId;
  public memberHaveProject = true;
  // myHeaders = new Headers(new Headers({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') , 'username': this.EIN }));

  constructor(private http: HttpClient, private route: Router) {
    //  this.httpHeaders = new HttpHeaders().append('Content-Type', 'application/json').append('Authorization',localStorage.getItem('token')).append('username', this.EIN)
  }
  public formatErrors(error: any) {
    return throwError(error.error);
  }


  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, {
      params,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : localStorage.getItem('token')
      })
    })
      .pipe(catchError(this.formatErrors));
  }

  download(path: string) {
    window.open(`${environment.api_url}${path}`, '_self', );
  }

  put(path: string, body: object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`, body, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization' : localStorage.getItem('token')
        })
      }
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    ).pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization' : localStorage.getItem('token')
        })
      }
    ).pipe(catchError(this.formatErrors));
  }

  getFromThirdParty(path: string) {
    return this.http.get(path, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : localStorage.getItem('token')
      })
    })
      .pipe(catchError(this.formatErrors));
  }
  loginGet(path): Observable<any> {
    console.log('test', this.EIN, localStorage.getItem('token'));
    // let options = new RequestOptions({ headers: this.httpHeaders });
    return this.http.get(`${environment.api_url}${path}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
        'username': this.EIN
      })
    })
  }

  getProjectId(path) {
    return this.http.get(path, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : localStorage.getItem('token')
      })
    });
  }

  shareProjectData() {
    this.projectData$  = this.http.get(environment.api_url + 'project/config', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : localStorage.getItem('token')
      })
    }).pipe(
      shareReplay(1)
    );
   
  }

  getProjectId1(path) {
    return this.http.get(path, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : localStorage.getItem('token')
      }),
      observe : 'response'
    });
  }
  postMileStoneData(path: string, body: object = {}): Observable<any> {
    return this.http.post(
      path,
      JSON.stringify(body), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization' : localStorage.getItem('token')
        })
      }
    ).pipe(catchError(this.formatErrors));
  }

  postNote(path: string, body: object = {}): Observable<any> {
    return this.http.post(
      path,
      JSON.stringify(body), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization' : localStorage.getItem('token')
        })
      }
    ).pipe(catchError(this.formatErrors));
  }

  getUserDetail(path, data): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : localStorage.getItem('token')
      })
    })
  }
  putMethod(path: string, body: object = {}): Observable<any> {
    return this.http.put(
      path,
      JSON.stringify(body), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization' : localStorage.getItem('token')
        })
      }
    ).pipe(catchError(this.formatErrors));
  }
  // submitNewUserDetail
  // submitNewUserDetail(path, body): Observable<any> {

  //   return this.http.post(path, body, {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       Authorization: localStorage.getItem('token'),
  //     })
  //   });
  // }
  submitNewUserDetail(path, body) {
    console.log('body', body)
    return this.http.post(path, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : localStorage.getItem('token')
      })
    });
  }
  postRiskData(path, body) {
    console.log('body', body)
    return this.http.post(path, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : localStorage.getItem('token')
      })
    });
  }

  getValue(path): Observable<any> {
    return this.http.get(path, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : localStorage.getItem('token')
      })
    })
      .pipe(catchError(this.formatErrors));
  }

  configProject(path, body) {
    console.log('body', body)
    return this.http.post(path, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : localStorage.getItem('token')
      })
    });
  }
  memberData(path, body) {
    console.log('body', body);
    return this.http.post(path, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : localStorage.getItem('token')
      })
    });
  }

  // Logout
  logout(path): Observable<any> {
    console.log(`${environment.api_url}${path}`)
    console.log('token', localStorage.getItem('token'));
    return this.http.post(`${environment.api_url}${path}`, JSON.stringify(''), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      })
    }).pipe(catchError(this.formatErrors));
  }
  resourceManagementData(path, body) {
    console.log('body', body)
    return this.http.post(path, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : localStorage.getItem('token')
      })
    });
  }
  importSurvetSheet(reqObj, nwObj: any): Observable<any> {
    console.log("upload  service data :", nwObj);
    let x = nwObj;
    const params = new HttpParams()
      .set('fileName', x.fileName).set('fileType', x.fileType).set('createdBy', x.createdBy).set('createdDate', x.createdDate).set('projectId', x.projectId).set('description', x.description);
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json')
    //headers = headers.append('Content-Type','multipart/form-data') 
    headers = headers.append('enctype', 'multipart/form-data');
    headers = headers.append('Authorization',localStorage.getItem('token'))
    return this.http.post(environment.api_url + 'project-util/upload-project-document', reqObj, { headers: headers, params })
  }


  deleteFile(path): Observable<any> {
    return this.http.delete(
      path, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization' : localStorage.getItem('token')
        })
      }
    ).pipe(catchError(this.formatErrors));
  }
  downloadFile(path){
    this.http.get(path, {
      headers: new HttpHeaders({
        'Content-Type': 'application/pdf',
        'Authorization' : localStorage.getItem('token')
      })
    })
      .pipe(catchError(this.formatErrors))
      .subscribe((res:any)=>{
        window.location.href = res;
      });
  }
}
