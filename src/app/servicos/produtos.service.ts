import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../model/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

    public API = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  public getAllProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.API+"/produtos")
  }

  public addNewProduct(produto: Produto): Observable<Produto>{
    return this.http.post<Produto>(this.API+"/produtos", produto)
  }
}
