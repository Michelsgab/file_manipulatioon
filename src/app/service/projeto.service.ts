import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IFuncionario } from '../Funcionario';

@Injectable({
  providedIn: 'root',
})
export class ProjetoService {
  private apiUrl: string = 'http://127.0.0.1:5000/projetos';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  getAll(): Observable<IFuncionario[]> {
    return this.http.get<IFuncionario[]>(this.apiUrl);
  }

  getId(id: string): Observable<IFuncionario> {
    return this.http.get<IFuncionario>(`${this.apiUrl}/${id}`);
  }

  post(data: IFuncionario): Observable<IFuncionario> {
    return this.http.post<IFuncionario>(this.apiUrl, data);
  }

  put(id: string, data: IFuncionario): Observable<IFuncionario> {
    return this.http.put<IFuncionario>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<IFuncionario> {
    return this.http.delete<IFuncionario>(`${this.apiUrl}/${id}`);
  }
}
