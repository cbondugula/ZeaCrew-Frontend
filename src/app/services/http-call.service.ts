import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpCallService {

  constructor(private http: HttpClient) {}

  private getToken(): string | null {
    const token = localStorage.getItem('token');
    return `Bearer ${token}`
  }

  get(url:string): Observable<any> {
    return this.http.get(url);
  }

  getWithAuth(url: string): Observable<any> {
    const token = this.getToken();
    if (token) {
      console.log(token, 'token');
      const headers = new HttpHeaders({ Authorization: token });

      return this.http.get(url, { headers });
    } else {
      throw new Error('No token found');
    }
  }

  post(url: string, body: any): Observable<any> {
    return this.http.post(url, body);
  }

  postWithAuth(url: string, body: any): Observable<any> {
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders({ Authorization: token });
      return this.http.post(url, body, { headers });
    } else {
      throw new Error('No token found');
    }
  }

  putWithAuth(url: string, body: any): Observable<any> {
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders({ Authorization: token });
      return this.http.put(url, body, { headers });
    } else {
      throw new Error('No token found');
    }
  }

  deleteWithAuth(url: string): Observable<any> {
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders({ Authorization: token });
      return this.http.delete(url,{ headers });
    } else {
      throw new Error('No token found');
    }
  }

  templateData = new BehaviorSubject<any>(null);
  currentData:any = this.templateData.asObservable();

  sendTemplateData(data: any){
    this.templateData.next(data);
  }
}
