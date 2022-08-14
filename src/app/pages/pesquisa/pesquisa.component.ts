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
  funcionarios: Array<IFuncionario> = [];

  constructor(private projetoService: ProjetoService, private router: Router) {
    this.getFuncionariosId();
  }

  ngOnInit(): void {}

  getFuncionariosId(): void {
    this.projetoService
      .getAll()
      .subscribe((funcionario) => (this.funcionarios = funcionario));
  }
}
