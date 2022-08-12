import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  imagem: string = "../../../assets/img/gestor-de-projeto.png"

  constructor() { }

  ngOnInit(): void {
  }

}
