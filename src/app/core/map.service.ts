import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MapService {

  private baseUrl : string = 'http://192.168.21.134:8091/auth';

  constructor(private http: HttpClient) {
  }

  getDataFromGoogle(data: string ): Observable<any> {

    console.log('attempMap ::');
    return this.http.get<any>('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=32.800870%2C-96.830803&radius=400&key=AIzaSyDzN_Vcq5K0xRcV6Ln-lYiuKu1rer_vYFc&type=museums');
  }

}
