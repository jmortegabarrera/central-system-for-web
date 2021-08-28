import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CreateOrganizationDto } from '../models/organization/create-organization.dto';
import { UpdateOrganizationDto } from '../models/organization/update-organization.dto';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  urlBackend = environment.backendEndpoint + '/organization';
  constructor(
    private readonly httpClient: HttpClient
  ) { }

  create$(createOrganization: CreateOrganizationDto): Observable<any> {
    return this.httpClient
      .post(this.urlBackend, JSON.stringify(createOrganization), { headers: this.headers })
      .pipe(map(
        result => {
          return true;
        }
      ))
  }

  update$(updateOrganization: UpdateOrganizationDto): Observable<any> {
    return this.httpClient
      .patch(this.urlBackend + '/edit', JSON.stringify(updateOrganization), { headers: this.headers })
      .pipe(map(
        result => {
          return true;
        }
      ))
  }

  getAllOrganizations$(): Observable<any> {
    return this.httpClient.get(`${this.urlBackend}`).pipe(map(
      result => {
        return result;
      }
    ))
  }

  getOrganizationById$(id: string): Observable<any> {
    return this.httpClient.get(`${this.urlBackend}/${id}`).pipe(map(
      result => {
        return result;
      }
    ))
  }

  deleteOrganization$(id: string): Observable<any> {
    return this.httpClient.delete(`${this.urlBackend}/${id}`).pipe(map(
      result => {
        return result;
      }
    ))
  }
}
