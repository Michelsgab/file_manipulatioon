import { Component, OnInit } from '@angular/core';
import { ProjetoService } from 'src/app/service/projeto.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPostFuncionario } from 'src/app/Funcionario';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
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
  postEnviado: boolean = false;
  existeFuncionario: boolean = false;
  objetoPost: IPostFuncionario = {} as IPostFuncionario;
  formulario!: FormGroup;
  id: string | null = this.route.snapshot.paramMap.get('id');
  imagem: string = '../../../assets/img/gestor-de-projeto.png';

  get nomeCompleto() {
    return this.formulario.get('nomeCompleto')!;
  }

  get descricaoFuncionario() {
    return this.formulario.get('descricao')!;
  }

  get cargoFuncionario() {
    return this.formulario.get('cargo')!;
  }

  get empresaFuncionario() {
    return this.formulario.get('empresa')!;
  }

  get emailFuncionario() {
    return this.formulario.get('email')!;
  }

  get githubFuncionario() {
    return this.formulario.get('github')!;
  }

  get linkedinFuncionario() {
    return this.formulario.get('linkedin')!;
  }

  get telefoneFuncionario() {
    return this.formulario.get('telefone')!;
  }

  constructor(
    private projetoService: ProjetoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.id) this.getDadosFuncionarios();

    this.formulario = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
      cargo: new FormControl('', [Validators.required]),
      empresa: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      github: new FormControl('', [Validators.required]),
      linkedin: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [
        Validators.required,
        Validators.maxLength(11),
      ]),
    });
  }

  popularObjeto() {
    this.objetoPost.nome = this.nome;
    this.objetoPost.descricao = this.descricao;
    this.objetoPost.cargo = this.cargo;
    this.objetoPost.empresa = this.empresa;
    this.objetoPost.email = this.email;
    this.objetoPost.github = this.github;
    this.objetoPost.linkedin = this.linkedin;
    this.objetoPost.telefone = this.telefone;

    return this.objetoPost;
  }

  printar(event : any){
    const file = event.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () =>{
      console.log(reader.result)
    }
  }

  postOuPut() {

    const id: string | null = this.route.snapshot.paramMap.get('id');

    if (this.formulario.invalid) return;
    this.popularObjeto();
    id ? this.put(id) : this.post();

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      this.router.navigate(['/pesquisa']);
    }, 1000);
  }

  getDadosFuncionarios(): void {
    this.projetoService.getId(this.id).subscribe((funcionario) => {
      (this.nome = funcionario.nome),
        (this.descricao = funcionario.descricao),
        (this.cargo = funcionario.cargo),
        (this.empresa = funcionario.empresa),
        (this.email = funcionario.email),
        (this.github = funcionario.github),
        (this.linkedin = funcionario.linkedin),
        (this.telefone = funcionario.telefone),
        (this.existeFuncionario = true);
    });
  }

  post(): void {
    this.projetoService.post(this.objetoPost).subscribe(() => {
      this.postEnviado = true;
    });
  }

  put(id: string): void {
    this.projetoService.put(id, this.objetoPost).subscribe(() => {
      this.postEnviado = true;
    });
  }
}
