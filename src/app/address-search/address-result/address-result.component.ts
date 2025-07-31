import { Component, OnInit, OnDestroy } from '@angular/core';
import { CepData, CepService } from '../services/cep.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SharedMaterialModule } from '../../shared/shared-material.module';

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

  constructor(private cepService: CepService) {}

  ngOnInit(): void {
    const savedData = localStorage.getItem(this.localStorageKey);
    if (savedData) {
      this.dataSource = JSON.parse(savedData);
    }

    this.subscription = this.cepService.cepData$.subscribe((data) => {
      if (data) {
        const now = new Date();
        const timestamp = now.toLocaleString();
        this.dataSource = [{ ...data, timestamp }, ...this.dataSource];
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.dataSource));
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
