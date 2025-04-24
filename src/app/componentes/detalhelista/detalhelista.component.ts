import { Component, OnInit } from '@angular/core';
import { Produto } from '../../model/Produto';
import { ProdutosService } from '../../servicos/produtos.service';
import { itemlista } from '../../model/itemlista';
import { ActivatedRoute } from '@angular/router';
import { ItenslistaService } from '../../servicos/itenslista.service';


@Component({
  selector: 'app-detalhelista',
  standalone: false,
  templateUrl: './detalhelista.component.html',
  styleUrl: './detalhelista.component.css'
})
export class DetalhelistaComponent implements OnInit {

  public listaProdutos: Produto[] = [];
  public novoProduto: Produto;
  public novoItem: itemlista;
  public formNovoProduto: boolean = false;
  public idLista: number = 0;
  constructor(private produtosService: ProdutosService, private activatedRoute: ActivatedRoute, private itemlistaSrv: ItenslistaService) {
    this.novoProduto = new Produto();
    this.novoItem = new itemlista();
    this.idLista = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
      this.recuperarTodosOsProdutos();
  }

  public recuperarTodosOsProdutos(){
    this.produtosService.getAllProdutos().subscribe(
      (res: Produto[]) => {
        this.listaProdutos = res;
      },
      (err) => {
        alert("Erro ao recuperar Lista de Produtos");
      }
    )
  }


  public exibirModal(){
    document.getElementById("btnModal")?.click();                      
  }

  public habilitarNovoProduto(){
    this.formNovoProduto = true;
  }

  public cadastrarNovoProduto(){

    this.novoProduto.id = null;
    this.produtosService.addNewProduct(this.novoProduto).subscribe(
      (res: Produto) => {
        alert("Produto cadastrado com sucesso");
        this.novoProduto = new Produto();
        this.recuperarTodosOsProdutos();
      },
      (err) => {
        alert("Não consegui cadastrar novo produto");
      }
    )
    this.formNovoProduto = false;
  }

  public adicionarItemLista(){
    this.novoItem.lista.id = this.idLista;
    console.log(this.novoItem);
  }
}
