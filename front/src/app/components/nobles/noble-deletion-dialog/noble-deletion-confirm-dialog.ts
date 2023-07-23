import { Router } from '@angular/router';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Noble } from 'src/app/models/noble';
import { NobleService } from 'src/app/services/noble/noble.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';

@Component({
  selector: 'noble-deletion-confirm-dialog',
  templateUrl: 'noble-deletion-confirm-dialog.html',
})
export class NobleDeletionConfirmDialog implements OnInit, OnDestroy {

  constructor (
    public dialogRef: MatDialogRef<NobleDeletionConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public nobleToDelete: Noble,
    private nobleService: NobleService,
    private router: Router
  ) {}

  subs: Subscription[] = [];

  ngOnInit() {

    this.dialogRef.afterClosed().subscribe(result=>
      {
        if (result >= 0) {
          this.deleteNoble(result);
        }
        console.log("data returned from mat-dialog-close is ",result);
      }
    );
  }

  deleteNoble(id: Number) {
    this.subs.push(
      this.nobleService.delete(id).subscribe((n) => {
        console.log(`Deleted noble ${n.name}`);
        this.router.navigate(['/nobles']);
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

