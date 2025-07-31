import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

import { CepData, CepService } from '../services/cep.service';
import { SharedMaterialModule } from '../../shared/shared-material.module';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-address-result',
  standalone: true,
  imports: [CommonModule, SharedMaterialModule],
  templateUrl: './address-result.component.html',
  styleUrls: ['./address-result.component.scss']
})
export class AddressResultComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<CepData & { timestamp: string }>([]);
  displayedColumns: string[] = ['cep', 'endereco', 'data', 'actions'];
  private subscription?: Subscription;
  private localStorageKey = 'cepSearchHistory';

  constructor(
    private cepService: CepService,
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  
  ngOnInit(): void {
    const savedData = localStorage.getItem(this.localStorageKey);
    if (savedData) {
      const parsedData: (CepData & { timestamp: string })[] = JSON.parse(savedData);
      this.dataSource.data = parsedData;
    }

    this.subscription = this.cepService.cepData$.subscribe((data) => {
      if (data) {
        const cepExist = this.dataSource.data.some(item => item.cep === data.cep);
        if (!cepExist) {
          const now = new Date();
          const timestamp = now.toLocaleString();
          const updatedData = [{ ...data, timestamp }, ...this.dataSource.data];
          this.dataSource.data = updatedData;
          localStorage.setItem(this.localStorageKey, JSON.stringify(updatedData));
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

  remover(index: number): void {
    const updatedData = [...this.dataSource.data];
    updatedData.splice(index, 1);
    this.dataSource.data = updatedData;
    localStorage.setItem(this.localStorageKey, JSON.stringify(updatedData));
  }
}
