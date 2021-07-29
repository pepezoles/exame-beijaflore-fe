import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Produto } from '../model/produto';

const _Url = `${environment.url}/produto`;

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private httpClient: HttpClient) { }  

  getProdutos(): Observable<Produto[]> {
    return this.httpClient.get<Produto[]>(`${_Url}`);
  } 

}
