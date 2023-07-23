import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogClose, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as removeAccents from 'remove-accents';
import { Subscription } from 'rxjs';
import { Noble } from 'src/app/models/noble';
import { NobleService } from 'src/app/services/noble/noble.service';
import { NobleDeletionConfirmDialog } from './noble-deletion-dialog/noble-deletion-confirm-dialog';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
import { Gender } from 'src/app/models/enum/gender';

@Component({
  selector: 'app-nobles',
  templateUrl: './nobles.component.html',
  styleUrls: ['./nobles.component.scss']
})
export class NoblesComponent implements OnInit, OnDestroy {
  nobles?: Noble[] = [];
  subs: Subscription[] = [];
  error?: string;
  nobleToDelete: Noble = new Noble();
  deletedNoble: Noble = new Noble();
  faTrash = faTrash;
  faMars = faMars;
  faVenus = faVenus;
  enumGender = Gender;

  constructor (
    private nobleService: NobleService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }


  ngOnInit() {
    this.subs.push(this.nobleService.getAll().subscribe(response => {
      if (response) {
        this.nobles = response.sort((a, b) => (removeAccents(a.name.toLowerCase()) > removeAccents(b.name.toLowerCase())) ? 1 : -1);
        this.nobles.forEach((n) => {
          n.reigned = n.reigned.sort((a, b) => (removeAccents(a.from.toString()) > removeAccents(b.from.toString())) ? 1 : -1);
        });
      }
      else {
        this.error = "Ops! Nada por aqui.";
      }
    }));
  }

  goToEditNoble(id: Number) {
    this.router.navigate(['/noble', id]);
  }

  openDialog(countryToDelete: Noble) {
    if (this.dialog.openDialogs.length === 0) {
      const dialogRef = this.dialog.open(
        NobleDeletionConfirmDialog,
        { data: countryToDelete });
    }
  }

  getParentsNames(noble: Noble): string {
    let parents = noble.ascendents?.map(n => n.name).join(' / ');
    return (parents) ? parents : '';
  }

  getParentName(noble: Noble, gender: Gender): String {

    let parentName = noble.ascendents?.find(p => (p.gender === gender.toUpperCase()))?.name;
    return (parentName) ? parentName : '';
  }

  getLifeTime(noble: Noble): string {
    let born = new Date(noble.born);
    let death = new Date(noble.death);
    return born.getFullYear() + ' / ' + death.getFullYear();
  }

  ngOnDestroy() {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
    this.subs = [];
  }

}
