import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { itemlista } from '../model/itemlista';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItenslistaService {

    public API = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  public adicionarNovoItem(item: itemlista): Observable<itemlista>{
    return this.http.post<itemlista>(this.API+"/itemlista", item)
  }
}
