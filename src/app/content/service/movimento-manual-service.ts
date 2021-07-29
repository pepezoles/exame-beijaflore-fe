import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { MovimentoManual } from '../model/movimento-manual';
import { environment } from 'src/environments/environment';

const _Url = `${environment.url}/movimento-manual`;

@Injectable({
  providedIn: 'root'
})
export class MovimentoManualService {

  constructor(private httpClient: HttpClient) { }

  save(dto: MovimentoManual): Observable<MovimentoManual> {
    return this.httpClient.post<MovimentoManual>(`${_Url}`, dto);
  }

  getMovimentos(): Observable<MovimentoManual[]> {
    return this.httpClient.get<MovimentoManual[]>(`${_Url}`);
  } 

}
