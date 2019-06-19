import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { Storage } from '@ionic/storage';

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

  /**
   * createHistoryEntry
   */
  public createHistoryEntry(entry, clientId, workoutId, exerciseId) {
    return this.http.post<IApiResponse>(
      `${this.API_URL}/new-history-entry/${clientId}/${workoutId}/${exerciseId}`,
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
