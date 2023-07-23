import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as removeAccents from 'remove-accents';
import { Observable, Subscription } from 'rxjs';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country/country.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogClose, MatDialogConfig } from '@angular/material/dialog';
import { CountryDeletionConfirmDialog } from './country-deletion-dialog/country-deletion-confirm-dialog';


@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit, OnDestroy {
  countries?: Country[] = [];
  subs: Subscription[] = [];
  error?: string;
  countryToDelete: Country = new Country();
  deletedCountry: Country = new Country();
  faTrash = faTrash;

  constructor (
    private countryService: CountryService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }


  ngOnInit() {
    this.loadCountries();
  }

  loadCountries() {
    this.subs.push(this.countryService.getAll().subscribe(response => {
      if (response.length > 0) {
        this.countries = response.sort((a, b) => (removeAccents(a.name.toLowerCase()) > removeAccents(b.name.toLowerCase())) ? 1 : -1);
      }
      else {
        this.error = "Ops! Nada por aqui.";
      }
    }));
  }

  goToEditCountry(id: Number) {
    this.router.navigate(['/country', id]);
  }

  openDialog(event: any, countryToDelete: Country) {
    if (this.dialog.openDialogs.length === 0) {
      const dialogRef = this.dialog.open(CountryDeletionConfirmDialog, { data: countryToDelete });
    }
  }

  ngOnDestroy() {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
    this.subs = [];
  }

}


