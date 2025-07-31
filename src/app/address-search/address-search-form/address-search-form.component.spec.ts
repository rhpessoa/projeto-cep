import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Busca } from './address-search-form.component.js';

describe('Busca', () => {
  let component: Busca;
  let fixture: ComponentFixture<Busca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Busca]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Busca);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
