import { Component, OnInit } from '@angular/core';
import { Produto } from '../../model/Produto';
import { ProdutosService } from '../../servicos/produtos.service';
import { itemlista } from '../../model/itemlista';
import { ActivatedRoute } from '@angular/router';
import { ItenslistaService } from '../../servicos/itenslista.service';
import { Lista } from '../../model/Lista';
import { ListasService } from '../../servicos/listas.service';


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
  public idLista:  number;
  public listaCompras: Lista = new Lista();

  constructor(private produtosService: ProdutosService, private activatedRoute: ActivatedRoute, private itemlistaSrv: ItenslistaService, private listaService: ListasService) {
    this.novoProduto = new Produto();
    this.novoItem = new itemlista();
    this.idLista = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
      this.recuperarTodosOsProdutos();
      this.recuperarDetalhesDaLista(this.idLista);
  }

  public recuperarDetalhesDaLista(idLista: number){
    this.listaService.recuperarPorId(this.idLista).subscribe(
      (res: Lista) => {
        this.listaCompras = res;
      },
      (err) => {
        alert("Não foi possivel recuperar os itens da lista!");
      }
    )
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
    this.itemlistaSrv.adicionarNovoItem(this.novoItem).subscribe(
      (res: itemlista)=>{
        alert("Novo item adicionado com sucesso!")
        this.recuperarDetalhesDaLista(this.idLista);
      },
      (err) =>{
        alert("Não consegui adicionar novo item")
      }
    )
  }
}
