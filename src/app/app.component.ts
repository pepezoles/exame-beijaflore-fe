import { Component,OnInit, ViewChild, } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovimentoManual } from './content/model/movimento-manual';
import { Produto } from './content/model/produto';
import { ProdutoCosif } from './content/model/produto-cosif';
import { ProdutoService } from './content/service/produto-service';
import { MovimentoManualService } from './content/service/movimento-manual-service';
import { ProdutoCosifService } from './content/service/produto-cosif-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('f', { static: false }) myForm; 

  eventForm: FormGroup;

  displayedColumns: string[] = ['mes', 'ano', 'codigo-produto', 'descricao-produto', 'numero-lancamento', 'descricao-movimento', 'valor'];
  dataSource: MovimentoManual[];

  produtos: Produto[];
  produtosCosif: ProdutoCosif[];

  permiteSalvar: boolean = true;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private produtoService: ProdutoService,
    private produtoCosifService: ProdutoCosifService,
    private service: MovimentoManualService 
  ) {

   }
  
  ngOnInit(): void {
    this.ativarValidacao();
    this.load();
  }

  private ativarValidacao() {

    this.eventForm = this.fb.group(
      {
        mes: [null, [Validators.max(12), Validators.min(1), Validators.required]],
        ano: [null, [Validators.min(1900), Validators.max(9999), Validators.required]],
        produtoId: [null, [Validators.required] ],
        produtoCosifId: [null, [Validators.required] ],
        valor: [null, [Validators.min(0), Validators.required]],
        descricao: [null, [Validators.minLength(3), Validators.maxLength(40), Validators.required]],
      }
    );   
    this.desabilitarCampos();  
  }

  load() {   
    this.carregarProdutos();
    this.listar();    
  }

  novo(){
    this.limpar();
    this.habilitarCampos();
  }

  carregarProdutos() {
     this.produtoService.getProdutos().subscribe(
       data => {
        this.produtos = data;
       }
     );
  }

  listar() {
    this.service.getMovimentos().subscribe(
      data => {
       this.dataSource = data;       
      }
    );
 }

 pesquisarProdutosCosif() {
   if (this.eventForm.get('produtoId').value) {
     this.produtoCosifService.getProdutosCosif(this.eventForm.get('produtoId').value).subscribe(
       data => {
         this.produtosCosif = data;
       }
     )
   } else {
     this.produtosCosif = [];
     this.eventForm.get('produtoCosifId').setValue(null);
    }
  }

  public onSubmit(){    
    this.openSnackBar('salvar');
    if (!this.eventForm.valid) return;   
    
  }

  limpar() {
    this.eventForm.reset();
    this.desabilitarCampos();
  }

  desabilitarCampos() {
    this.eventForm.disable();
    this.permiteSalvar = true;

  }

  habilitarCampos() {
   this.eventForm.enable();
   this.permiteSalvar = false;
  }

  openSnackBar(message: string) {   
    this._snackBar.open(message);
  }
}