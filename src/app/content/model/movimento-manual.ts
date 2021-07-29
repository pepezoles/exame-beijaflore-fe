import { ProdutoCosif } from './produto-cosif';

export class MovimentoManual {
	mes: number;
	ano: number;
	numeroLancamento: number;
	descricao: string;
	data: string;
	valor: number;
    usuario: string; 
    produtoCosif: ProdutoCosif;   
}