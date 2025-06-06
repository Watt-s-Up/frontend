import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { EnergyEntry } from '../models/energy-entry.model';

@Injectable({
  providedIn: 'root',
})
export class EnergyDataService {
  constructor(private http: HttpClient) {}

  getEnergyData(): Observable<EnergyEntry[]> {
    return this.http
      .get('http://localhost:3000/api/v1/energy-data')
      .pipe<EnergyEntry[]>(
        map<any, EnergyEntry[]>((res) => {
          if (res['success']) {
            return res['data']?.map((entry: EnergyEntry) => {
              return new EnergyEntry(entry);
            });
          } else return null;
        })
      );
  }
}
