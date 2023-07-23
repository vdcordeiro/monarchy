import { Router } from '@angular/router';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country/country.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';

@Component({
  selector: 'country-deletion-confirm-dialog',
  templateUrl: 'country-deletion-confirm-dialog.html',
})
export class CountryDeletionConfirmDialog implements OnInit, OnDestroy {

  constructor (
    public dialogRef: MatDialogRef<CountryDeletionConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public countryToDelete: Country,
    private countryService: CountryService,
    private router: Router
  ) {}

  subs: Subscription[] = [];

  ngOnInit() {

    this.dialogRef.afterClosed().subscribe(result=>
      {
        if (result >= 0) {
          this.deleteCountry(result);
        }
      }
    );
  }

  deleteCountry(id: Number) {
    this.subs.push(
      this.countryService.delete(id).subscribe((c) => {
        console.log(`Deleted country ${c.name}`);
        this.router.navigate(['/countries']);
      })
    );
  }

  ngOnDestroy() {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
    this.subs = [];
  }

}

