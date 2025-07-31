import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface CepData {
  cep: string;
  logradouro: string;
  complemento?: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge?: string;
  gia?: string;
  ddd?: string;
  siafi?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CepService {
  private cepDataSubject = new BehaviorSubject<CepData | null>(null);
  public cepData$ = this.cepDataSubject.asObservable();

  private readonly baseUrl = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) {}

  buscarCep(cep: string): Observable<CepData> {
    const cleanCep = cep.replace(/\D/g, '');
    const url = `${this.baseUrl}/${cleanCep}/json/`;
    return this.http.get<CepData>(url);
  }

  emitirCepData(data: CepData) {
    this.cepDataSubject.next(data);
  }
}
