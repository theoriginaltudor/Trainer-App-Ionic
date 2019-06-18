import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { Storage } from '@ionic/storage';
import { post } from 'selenium-webdriver/http';

interface IApiResponse {
  success: boolean;
  data: any;
}

@Injectable()
export class DataProviderService {
  API_URL: string = "http://195.249.188.75:2000/api";

  constructor(public auth: AuthService, private http: HttpClient, private storage: Storage) { }

  public getClient(clientEmail): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(
      `${this.API_URL}/client-id/${clientEmail}`,
      {
        headers: new HttpHeaders().set(
          "Authorization",
          `Bearer ${this.auth.idToken}`
        )
      }
    );
  }

  public getDietsList(clientId): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(
      `${this.API_URL}/diets-for-client/${clientId}`,
      {
        headers: new HttpHeaders().set(
          "Authorization",
          `Bearer ${this.auth.idToken}`
        )
      }
    );
  }

  public getDietGoal(clientId): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(
      `${this.API_URL}/diet-goal-for-client/${clientId}`,
      {
        headers: new HttpHeaders().set(
          "Authorization",
          `Bearer ${this.auth.idToken}`
        )
      }
    );
  }

  public getMeasurementsList(clientId): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(
      `${this.API_URL}/measurements-for-client/${clientId}`,
      {
        headers: new HttpHeaders().set(
          "Authorization",
          `Bearer ${this.auth.idToken}`
        )
      }
    );
  }

  public getExercisesList(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(`${this.API_URL}/exercises/`, {
      headers: new HttpHeaders().set(
        "Authorization",
        `Bearer ${this.auth.idToken}`
      )
    });
  }

  public getExercise(exerciseId): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(
      `${this.API_URL}/exercise/${exerciseId}`,
      {
        headers: new HttpHeaders().set(
          "Authorization",
          `Bearer ${this.auth.idToken}`
        )
      }
    );
  }

  public getWorkoutsList(clientId): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(
      `${this.API_URL}/workouts-for-client/${clientId}`,
      {
        headers: new HttpHeaders().set(
          "Authorization",
          `Bearer ${this.auth.idToken}`
        )
      }
    );
  }

  public getClientHistory(clientId, exerciseId): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(
      `${
      this.API_URL
      }/history-for-client/${clientId}/for-exercise/${exerciseId}`,
      {
        headers: new HttpHeaders().set(
          "Authorization",
          `Bearer ${this.auth.idToken}`
        )
      }
    );
  }

  /**
   * createMeasurement
   */
  public createMeasurement(clientId, entry) {
    return this.http.post<IApiResponse>(
      `${this.API_URL}/new-measurement/${clientId}`,
      entry,
      {
        headers: new HttpHeaders().set(
          "Authorization",
          `Bearer ${this.auth.idToken}`
        )
      }
    );
  }

  /**
   * createDiet
   */
  public createDiet(clientId, entry) {
    return this.http.post<IApiResponse>(
      `${this.API_URL}/new-diet/${clientId}`,
      entry,
      {
        headers: new HttpHeaders().set(
          "Authorization",
          `Bearer ${this.auth.idToken}`
        )
      }
    );
  }
}
