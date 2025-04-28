import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lista } from '../model/Lista';

@Injectable({
  providedIn: 'root'
})
export class ListasService {

   public API = 'http://localhost:8080'

  constructor(
    private http : HttpClient
  ) { }

  public recuperarListas(): Observable<Lista[]>{
    return this.http.get<Lista[]>(this.API+"/listas");
  }

  public cadastrarLista(lista:Lista): Observable<Lista>{
    return this.http.post<Lista>(this.API+"/listas", lista)
  }

  public recuperarPorId(id: number): Observable<Lista>{
    return this.http.get<Lista>(this.API+"/listas/"+id)
  }
}
