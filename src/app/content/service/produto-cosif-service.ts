import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProdutoCosif } from '../model/produto-cosif';

const _Url = `${environment.url}/produto-cosif`;

@Injectable({
  providedIn: 'root'
})
export class ProdutoCosifService {

  constructor(private httpClient: HttpClient) { }  

  getProdutosCosif(produtoId: number): Observable<ProdutoCosif[]> {
    return this.httpClient.get<ProdutoCosif[]>(`${_Url}/${produtoId}`);
  } 

}
