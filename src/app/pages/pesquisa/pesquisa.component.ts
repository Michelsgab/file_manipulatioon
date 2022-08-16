import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IFuncionario } from 'src/app/Funcionario';
import { ProjetoService } from 'src/app/service/projeto.service';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css'],
})
export class PesquisaComponent implements OnInit {
  postEnviado: boolean = false;
  term!: string;
  funcionarios: Array<IFuncionario> = [];

  constructor(private projetoService: ProjetoService, private router: Router) {
    this.getFuncionarios();
  }

  ngOnInit(): void {}

  getFuncionarios(): void {
    this.projetoService
      .getAll()
      .subscribe((funcionario) => (this.funcionarios = funcionario));
  }

  getFuncionariosId(id: any) {
    const pegaId: string = id;
    this.router.navigate(['cadastro/', pegaId]);
  }

  deletaFuncionarios(id: any): void {
    this.projetoService.delete(id).subscribe(() => {
      this.getFuncionarios();
    });
  }
}
