import { MatDatepicker } from '@angular/material/datepicker';
import { Subscription } from 'rxjs';
import { CountryService } from 'src/app/services/country/country.service';
import { Country } from 'src/app/models/country';
import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Reign } from 'src/app/models/reign';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import * as removeAccents from 'remove-accents';



@Component({
  selector: 'app-reigncard',
  templateUrl: './reigncard.component.html',
  styleUrls: ['./reigncard.component.scss']
})

export class ReigncardComponent implements OnInit, OnDestroy {

  constructor(
    private countryService: CountryService,
    private formBuilder: FormBuilder
  ){

  }

  @Input()
  reign: Reign = new Reign();

  @Output() reignChange = new EventEmitter<Reign>();
  @Output() deleteReign = new EventEmitter<Reign>();
  @Output() errorDetected = new EventEmitter<Boolean>();


  countries: Country[] = [];
  subs: Subscription[] = [];


  reignForm = new FormGroup({
    country: new FormControl(),
    title: new FormControl(),
    from: new FormControl(),
    to: new FormControl(),
  });

  ngOnInit() {

    this.subs.push(
      this.countryService.getAll().subscribe((cs) => {
        this.countries = cs.sort((a, b) => (removeAccents(a.name.toLowerCase()) > removeAccents(b.name.toLowerCase())) ? 1 : -1);
        this.loadReign(this.reign);
      })
    );
  }

  loadReign(reign: Reign) {
    this.reignForm = this.formBuilder.group({
      country: [reign.country, this.requireMatchCountry.bind(this)],
      title: [reign.title, [Validators.required]],
      from: [reign.from, [Validators.required]],
      to: [reign.to, [Validators.required]]
    });
  }

  update() {
    this.reign.country = this.reignForm.controls.country.value;
    this.reign.title = this.reignForm.controls.title.value;
    this.reign.from = this.reignForm.controls.from.value;
    this.reign.to = this.reignForm.controls.to.value;
    this.reignChange.emit(this.reign);
  }

  delete() {
    this.deleteReign.emit(this.reign);
  }


  getCountryName(country: Country): string {
    return (country) ? country.name.toString() : '';
  }


  ngOnDestroy() {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
    this.subs = [];
  }

  private requireMatchCountry(control: FormControl): ValidationErrors | null {
    if (this.countries.filter((c) => (c.id == control.value.id)).length === 0) {
      this.errorDetected.emit(true);
      return { requireMatchCountry: true };
    }
    this.errorDetected.emit(false);
    return null;
  }

}
