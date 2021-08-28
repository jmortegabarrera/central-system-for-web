import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { UpdateChargerPointDto } from '../models/chargepoint/update-chargepoint.dto';
import { CreateChargePointDto } from '../models/chargepoint/create-chargepoint.dto';

@Injectable({
  providedIn: 'root'
})
export class ChargerPointService {
  
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  urlBackend = environment.backendEndpoint+'/chargepoint';
  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getAllChargerPoints$(organizationId: string): Observable<any> {
    return this.httpClient.post(`${this.urlBackend}/getAll`, { organizationId }).pipe(map(
      result => {
        return result;
      }
    ))
  }

  getChargerPointById$(id: string): Observable<any> {
    return this.httpClient.get(`${this.urlBackend}/${id}`).pipe(map(
      result => {
        return result;
      }
    ))
  }

  create$(createChargerPoint: CreateChargePointDto): Observable<any> {
    return this.httpClient
      .post(this.urlBackend, JSON.stringify(createChargerPoint), { headers: this.headers })
      .pipe(map(
        result => {
          return true;
        }
      ))
  }
  
  update$(updateChargerPoint: UpdateChargerPointDto): Observable<any> {
    return this.httpClient
      .patch(this.urlBackend + '/edit', JSON.stringify(updateChargerPoint), { headers: this.headers })
      .pipe(map(
        result => {
          return true;
        }
      ))
  }

  deleteChargePoint$(id: string): Observable<any> {
    return this.httpClient.delete(`${this.urlBackend}/${id}`).pipe(map(
      result => {
        return result;
      }
    ))
  }
}
