import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorage } from "./token.storage";
@Injectable()
export class AuthService {

  private baseUrl : string = 'http://192.168.21.134:8091';
  headers: HttpHeaders;

  constructor(private http: HttpClient, private tokenStorage: TokenStorage) {
    this.headers = new HttpHeaders().set('content-type','application/json');
    this.headers.append('Authorization', 'Bearer ' + this.tokenStorage.getToken());

  }

  attemptAuth(username: string, password: string): Observable<any> {
    const credentials = {username: username, password: password};
    console.log('attempAuth ::');
    return this.http.post<any>(this.baseUrl + "/com/auth", credentials);
  }

  getItineraries():Observable<any> {
    return this.http.get<any>(this.baseUrl+"/api/itinerary/get",{headers:this.headers});
  }

  createNewItinerary(data):Observable<any> {
    return this.http.post<any>(this.baseUrl+"/api/itinerary/create",data,{headers:this.headers});
  }

}
