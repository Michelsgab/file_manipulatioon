import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  nome!: string | undefined;
  descricao!: string | undefined;
  cargo!: string | undefined;
  empresa!: string | undefined;
  email!: string | undefined;
  github!: string | undefined;
  linkedin!: string | undefined;
  telefone!: string | undefined;
  curriculo!: string | undefined;
  foto!: string | undefined;
  formulario!: FormGroup;

  imagem: string = "../../../assets/img/gestor-de-projeto.png"

  get nomeFuncionario() {
    return this.formulario.get('nomeCompleto')!;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
