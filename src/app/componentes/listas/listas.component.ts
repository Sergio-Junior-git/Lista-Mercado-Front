import { Component, OnInit } from '@angular/core';
import { ListasService } from '../../servicos/listas.service';
import { Lista } from '../../model/Lista';

@Component({
  selector: 'app-listas',
  standalone: false,
  templateUrl: './listas.component.html',
  styleUrl: './listas.component.css'
})
export class ListasComponent implements OnInit {
 
  public listas: Lista[] = [];
  public novaLista: Lista;

  constructor(
    private service: ListasService
  ) {
    this.novaLista = new Lista();
  }

  ngOnInit(): void {
      this.getAllListas();
  }

  public getAllListas(){
    this.service.recuperarListas().subscribe(
      (res: Lista[]) => {
        this.listas = res;
      },
      (err) => {
        alert("Erro ao recuperar listas de compras.")
      }
    ); 
  }

  public cadastrarLista(){
    this.service.cadastrarLista(this.novaLista).subscribe(
      (res: Lista) => {
        alert("Nova lista Cadastrada!");
        this.getAllListas();
      },
      (err) => {
        alert("ERROR ao cadastrar Lista");
      }
    );
  }
}
