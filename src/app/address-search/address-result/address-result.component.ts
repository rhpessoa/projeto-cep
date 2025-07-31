import { Component, OnInit, OnDestroy } from '@angular/core';
import { CepData, CepService } from '../services/cep.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SharedMaterialModule } from '../../shared/shared-material.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-address-result',
  imports: [CommonModule, SharedMaterialModule],
  templateUrl: './address-result.component.html',
  styleUrls: ['./address-result.component.scss']
})
export class AddressResultComponent implements OnInit, OnDestroy {
  dataSource: (CepData & { timestamp: string })[] = [];
  displayedColumns: string[] = ['cep', 'endereco', 'data', 'actions'];
  private subscription?: Subscription;

  private localStorageKey = 'cepSearchHistory';

  constructor(private cepService: CepService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    const savedData = localStorage.getItem(this.localStorageKey);
    if (savedData) {
      this.dataSource = JSON.parse(savedData);
    }
    this.subscription = this.cepService.cepData$.subscribe((data) => {
      if (data) {
        const cepExist = this.dataSource.some(item => item.cep === data.cep);
        if (!cepExist) {
          const now = new Date();
          const timestamp = now.toLocaleString();
          this.dataSource = [{ ...data, timestamp }, ...this.dataSource];
          localStorage.setItem(this.localStorageKey, JSON.stringify(this.dataSource));
        } else {
          
         this.snackBar.open(`CEP ${data.cep} já está no histórico.`, 'Fechar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  remover(index: number) {
    this.dataSource.splice(index, 1);
    this.dataSource = [...this.dataSource];
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.dataSource));
  }
}
