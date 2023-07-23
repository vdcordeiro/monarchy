import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldControl, MatFormFieldAppearance, MatFormFieldDefaultOptions, matFormFieldAnimations } from '@angular/material/form-field';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country/country.service';



@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit, OnDestroy{

  countryForm = new FormGroup({
    name: new FormControl(),
    code: new FormControl()
  });

  country: Country = new Country();
  edit: Boolean = false;
  sub: Subscription[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private countryService: CountryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.sub.push(
      this.route.params.subscribe(params => {
        if(+params['id'] >= 0) {
          this.edit = true;
          this.sub.push(this.countryService.getById(+params['id']).subscribe(country => {
            this.country = country;
            this.countryForm = this.formBuilder.group({
              name: [this.country.name, [Validators.required]],
              code: [this.country.code, [Validators.required]]
            });
          }));
        }
        else {
          this.edit = false;
          this.countryForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            code: ['', [Validators.required]]
          });
        }
      })
    );

  }

  submit() {
    if (this.countryForm.invalid) {
      return;
    }
    else {
      this.country.name = this.countryForm.controls.name.value;
      this.country.code = this.countryForm.controls.code.value;
      if (this.edit) {
        this.countryService.update(this.country).subscribe(country => {
          console.log(country);
          this.router.navigate(['countries']);
        });
      }
      else {
        this.countryService.save(this.country).subscribe(country => {
          console.log(country);
          this.router.navigate(['countries']);
        });
      }
    }
  }

  cancel() {
    this.router.navigate(['countries']);
  }

  getCodeClass(): string {
    // return this.countryForm.controls.code.value;
    let code = '' + this.countryForm.controls.code.value?.toString().toLowerCase();
    return 'flag-icon flag-icon-' + code + ' flag-icon-squared';
  }

  ngOnDestroy() {
    this.sub.forEach(sub => {
      sub.unsubscribe();
    });
    this.sub = [];
  }

}
