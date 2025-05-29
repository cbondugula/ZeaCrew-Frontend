import { Inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class HttpCallService {

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone, @Inject(PLATFORM_ID) private platformId: any) {}

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

  socket:any;
  retryCount:number=0;
  maxRetries: number=3;

  connect(): void {
    // if(isPlatformBrowser(this.platformId)) {
        this.ngZone.runOutsideAngular(()=>{
            if (!this.socket) {
                if(localStorage.getItem('token') != null){
                    console.log("initializing connection");
                    this.socket = io(environment.socket, {
                        auth: {
                            token: localStorage.getItem('token')
                        },
                        path: "/events/",
                        transports: ['websocket']
                    });
                    this.socket.on('connect', () => {
                        this.ngZone.run(()=>{
                            console.log('Connected to Socket.IO server');
                            this.sendMessage('getToken');
                            this.retryCount = 0;
                        })
                        console.log(this.socket.id);
                        localStorage.setItem("sid",this.socket.id);
                    });
                    this.socket.on('session',(session:any)=>{
                        this.ngZone.run(()=>{
                            console.log("session",session);
                        })
                    })
    
                    this.socket.on('connect_error', (error: any) => {
                        console.log("error",error)
                        this.ngZone.run(() => {
                            // console.log("error",error);
                            console.log(error.message);
                            if(error.message === 'Session-Ended'){
                            let refreshToken = localStorage.getItem('refresh');
                            this.clearSession();
                            }
                            this.retryCount++;
                            if (this.retryCount <= this.maxRetries) {
                            console.log(`Retrying connection... Attempt ${this.retryCount}`);
                            } else {
                                if(isPlatformBrowser(this.platformId)) {
                                    console.log("Maximum retries reached!!!!!!.",this.socket);
                                    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                                        this.socket.close();
                                    }
                                }
                                this.router.navigate(['/'], { queryParams: { showDialog: true } });
                            }
                        })
                    });
                }else{
                    this.ngZone.run(()=>{
                        this.router.navigate(['/']);
                    })
                }
            }
        })
  
    // }
  }

  sendMessage(label:string,message?: any): void {
    console.log("label",label);
    this.ngZone.runOutsideAngular(() => {
      this.socket.emit(label, message);
    });
  }

  getMessage(event:any): Observable<any> {
    console.log(event);
    return new Observable<any>((observer) => {
      this.ngZone.runOutsideAngular(() => {
        this.socket.on(event, (data: any) => {
          this.ngZone.run(() => {
            observer.next(data);
          });
        });
      });
    });
  }

  private clearSession() {
    if(isPlatformBrowser(this.platformId)) {
      localStorage.clear();
      this.router.navigate(['/']);
    }
  }
}
