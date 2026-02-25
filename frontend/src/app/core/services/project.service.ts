import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProjectService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getProjects(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/projects/demo`);
  }

  getMatchingEmployees(projectId: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
    return this.http.get<any>(`${this.baseUrl}/projects/${projectId}/match`, { headers });
  }

  getDemoMatchingEmployees(projectId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/projects/demo/${projectId}/match`);
  }

  getEmployees(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/employees/demo`);
  }

  getAvailableEmployees(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/employees/demo/available`);
  }

  getSkillSuggestion(employeeId: string, projectId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ai/skill-gap/${employeeId}/${projectId}`);
  }
}
