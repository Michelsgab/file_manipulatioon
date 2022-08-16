export interface IFuncionario {
  id?: number;
  nome?: string;
  descricao?: string;
  cargo?: string;
  empresa?: string;
  email?: string;
  github?: string;
  linkedin?: string;
  telefone?: string;
  curriculo?: string;
  foto?: ArrayBuffer | string;
}

export interface IPostFuncionario {
  nome?: string;
  descricao?: string;
  cargo?: string;
  empresa?: string;
  email?: string;
  github?: string;
  linkedin?: string;
  telefone?: string;
  curriculo?: string;
  foto?: ArrayBuffer | string;
}
