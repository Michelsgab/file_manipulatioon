import { Component, OnInit } from '@angular/core';
import { ProjetoService } from 'src/app/service/projeto.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPostFuncionario } from 'src/app/Funcionario';
import { Observable, Subscriber } from 'rxjs';

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
  minhaImagem!: Observable<any>;
  imagemSalva: boolean = false;
  id: string | null = this.route.snapshot.paramMap.get('id');
  imagem: string = '../../../assets/img/foto_exemplo.png';

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

  get curriculoFuncionario() {
    return this.formulario.get('curriculo')!;
  }

  get fotoFuncionario() {
    return this.formulario.get('foto')!;
  }

  constructor(
    private projetoService: ProjetoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.id) this.getDadosFuncionarios();

    this.formulario = new FormGroup({
      nome: new FormControl(''),
      descricao: new FormControl(''),
      cargo: new FormControl(''),
      empresa: new FormControl(''),
      email: new FormControl(''),
      github: new FormControl(''),
      linkedin: new FormControl(''),
      telefone: new FormControl(''),
      curriculo: new FormControl(''),
      foto: new FormControl(''),
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
    this.objetoPost.curriculo = this.curriculo;
    this.objetoPost.foto = this.foto;

    return this.objetoPost;
  }

  uploadFoto($event: Event) {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    this.converterBase64Foto(file);
  }

  uploadArquivo($event: Event) {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.converterBase64Arquivo(file);
  }

  converterBase64Foto(arquivo: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.lerArquivo(arquivo, subscriber);
    });

    observable.subscribe((res) => {
      this.minhaImagem = res;
      this.foto = res.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
      this.imagemSalva = true;
    });
  }

  converterBase64Arquivo(arquivo: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.lerArquivo(arquivo, subscriber);
    });

    observable.subscribe((res) => {
      this.curriculo = res.replace(
        /^data:application\/(pdf|word|txt);base64,/,
        ''
      );
    });
  }

  lerArquivo(arquivo: File, subscriber: Subscriber<any>) {
    const leituraArquivo = new FileReader();
    leituraArquivo.readAsDataURL(arquivo);

    leituraArquivo.onload = () => {
      subscriber.next(leituraArquivo.result);
      subscriber.complete();
    };

    leituraArquivo.onerror = () => {
      subscriber.error();
      subscriber.complete();
    };
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
        (this.curriculo = funcionario.curriculo),
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
