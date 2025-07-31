import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CEP_REGEX } from '../../utils/regex-validators';
import { NgxMaskDirective } from 'ngx-mask';
import { Subscription } from 'rxjs';
import { CepService } from '../services/cep.service';
import { SharedMaterialModule } from '../../shared/shared-material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddressResultComponent } from "../address-result/address-result.component";

@Component({
  selector: 'app-address-search-form',
  imports: [
    ReactiveFormsModule,
    NgxMaskDirective,
    SharedMaterialModule,
    AddressResultComponent
],
  templateUrl: './address-search-form.component.html',
  styleUrls: ['./address-search-form.component.scss']
})
export class AddressSearchFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  submitted = false;
  mostrarResultado = false;
  private sub?: Subscription;

  constructor( private snackBar: MatSnackBar,private fb: FormBuilder, private cepService: CepService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      cep: ['', [Validators.required, Validators.pattern(CEP_REGEX)]],
    });

    this.sub = this.cep?.valueChanges.subscribe(value => {
      if (!value && this.submitted) {
        this.submitted = false;
        this.cep?.setErrors(null);
        this.cep?.markAsPristine();
        this.cep?.markAsUntouched();
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  onSubmit(): void {
  this.submitted = true;

  if (this.form.invalid) {
    this.form.markAllAsTouched();
    this.mostrarResultado = false;
    return;
  }

  const cepValue = this.form.value.cep.replace(/\D/g, '');

  this.cepService.buscarCep(cepValue).subscribe({
    next: (data) => {
      if (data && data.cep && data.cep.trim() !== '') {
        this.cepService.emitirCepData(data);
        this.mostrarResultado = true;
        this.form.get('cep')?.setErrors(null);
      } else {
        this.mostrarResultado = false;
        this.form.get('cep')?.setErrors({ invalidCep: true });

        this.snackBar.open('CEP inválido. Por favor, verifique e tente novamente.', 'Fechar', {
          duration: 4000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    },
    error: (err) => {
      console.error('Erro ao buscar CEP:', err);
      this.mostrarResultado = false;
      this.snackBar.open('Erro ao buscar CEP. Por favor, tente novamente.', 'Fechar', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    }
  });
}
  get cep() {
    return this.form.get('cep');
  }
}
