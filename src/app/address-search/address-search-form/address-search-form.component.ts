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
  standalone: true,
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
    if (this.form.valid) {
      const cepValue = this.form.value.cep.replace(/\D/g, '');
      this.cepService.buscarCep(cepValue).subscribe({
        next: (data) => {
         this.cepService.emitirCepData(data);
          this.mostrarResultado = true;  
        },
        error: (err) => {
          console.error('Erro ao buscar CEP:', err);
          this.snackBar.open('Erro ao buscar CEP. Por favor, tente novamente.', 'Fechar', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
        });
        this.mostrarResultado = false;
      }
    });
    } else {
      this.form.markAllAsTouched();
      this.mostrarResultado = false;
    }
  }

  get cep() {
    return this.form.get('cep');
  }
}
