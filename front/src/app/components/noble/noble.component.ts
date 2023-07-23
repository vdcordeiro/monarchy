import { Reign } from './../../models/reign';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ReigncardComponent } from './reigncard/reigncard.component';

import { MatFormField,
  MatFormFieldControl,
  MatFormFieldAppearance,
  MatFormFieldDefaultOptions,
  matFormFieldAnimations } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatAutocomplete } from '@angular/material/autocomplete';

import { MatChip } from '@angular/material/chips';
import { MatSelect } from '@angular/material/select';
import { MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter, MatOption } from '@angular/material/core';
import { MatRadioButton, MatRadioGroup, MatRadioModule, MatRadioChange, MatRadioDefaultOptions } from '@angular/material/radio';

import { Noble } from 'src/app/models/noble';
import { NobleService } from 'src/app/services/noble/noble.service';
import { Gender } from 'src/app/models/enum/gender';
import { faIcons } from '@fortawesome/free-solid-svg-icons';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
import * as removeAccents from 'remove-accents';

@Component({
  selector: 'app-noble',
  templateUrl: './noble.component.html',
  styleUrls: ['./noble.component.scss']
})
export class NobleComponent implements OnInit, OnDestroy {

  nobleForm = new FormGroup({
    name: new FormControl(),
    fullName: new FormControl(),
    gender: new FormControl(),
    born: new FormControl(),
    death: new FormControl(),
    mom: new FormControl(),
    dad: new FormControl(),
    descendents: new FormControl(),
    reigned: new FormControl()
  });

  noble: Noble = new Noble();
  descendents: Noble[] = [];
  edit: Boolean = false;
  sub: Subscription[] = [];
  reignIdsWithError: Number[] = [];

  ladies: Noble[] = [];
  gentlemen: Noble[] = [];

  faMars = faMars;
  faVenus = faVenus;

  enumGender = Gender;

  constructor(
    private formBuilder: FormBuilder,
    private nobleService: NobleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.sub.push(
      this.route.params.subscribe(params => {
        // If we are editing a noble...
        if(+params['id'] >= 0) {
          this.edit = true;
          // Get the noble to edit and load it
          this.sub.push(this.nobleService.getById(+params['id']).subscribe(noble => this.loadNoble(noble)));
        }
        // If we are creating a new noble...
        else {
          this.edit = false;
          this.loadNoble(this.noble);
        }
      })
    );

    this.sub.push(
      this.nobleService.getByGender(this.enumGender.FEMALE).subscribe(ladies => {
        this.ladies = ladies.sort((a, b) => (removeAccents(a.name.toLowerCase()) > removeAccents(b.name.toLowerCase())) ? 1 : -1);
      })
    );

    this.sub.push(
      this.nobleService.getByGender(this.enumGender.MALE).subscribe(gmt => {
        this.gentlemen = gmt.sort((a, b) => (removeAccents(a.name.toLowerCase()) > removeAccents(b.name.toLowerCase())) ? 1 : -1);
      })
    );

  }

  loadNoble(noble: Noble) {
    console.log('Noble being edited/created: ');
    console.log(noble);
    noble.ascendents = (noble.ascendents) ? noble.ascendents : [];
//            noble.descendents = (noble.descendents) ? noble.descendents : [];
    noble.reigned = (noble.reigned !== undefined && noble.reigned !== null)
      ? noble.reigned.sort((a, b) => (removeAccents(a.from.toString()) > removeAccents(b.from.toString())) ? 1 : -1)
      : [];
    this.noble = noble;

    this.nobleForm = this.formBuilder.group({
      name: [this.noble.name, [Validators.required]],
      fullName: [this.noble.fullName, [Validators.required]],
      gender: [this.noble.gender, [Validators.required]],
      born: [this.noble.born, [Validators.required]],
      death: [this.noble.death, [Validators.required]],
      mom: [this.noble.ascendents?.find(asc => asc.gender === this.enumGender.FEMALE), this.requireMatchLadies.bind(this)],
      dad: [this.noble.ascendents?.find(asc => asc.gender === this.enumGender.MALE), this.requireMatchGentlemen.bind(this)],
      descendents: [], // to be set later
      reigned: [this.noble.reigned]
    });
    this.loadDescendents(this.noble.id);
  }

  loadDescendents(id: Number) {
    this.sub.push(
      this.nobleService.getChildrenById(id).subscribe((desc) => {
        this.descendents = desc;
        this.nobleForm.controls.descendents.setValue(desc);
      })
    );
  }

  newReign() {
    let reignCtrList: Reign[] = this.nobleForm.controls.reigned.value;
    reignCtrList.push(new Reign());
    this.nobleForm.controls.reigned.setValue(reignCtrList);
  }


  updateReigns(updatedReign: Reign, i: number) {
    let reigns: Reign[] = this.nobleForm.controls.reigned.value;
    reigns[i] = updatedReign;
    this.nobleForm.controls.reigned.setValue(reigns);
  }

  deleteReign(i: number) {
    let reigns: Reign[] = this.nobleForm.controls.reigned.value;
    reigns.splice(i, 1);
    this.nobleForm.controls.reigned.setValue(reigns);
    this.setReignError(false, i);
  }

  submit() {
    if (this.nobleForm.invalid || this.reignIdsWithError.length > 0) {
      return;
    }
    else {
      this.noble.name = this.nobleForm.controls.name.value;
      this.noble.fullName = this.nobleForm.controls.fullName.value;
      this.noble.gender = this.nobleForm.controls.gender.value;
      this.noble.born = this.nobleForm.controls.born.value;
      this.noble.death = this.nobleForm.controls.death.value;
      this.noble.reigned = this.nobleForm.controls.reigned.value;

      console.log('my new mom:');
      console.log(this.nobleForm.controls.mom.value);

      let ascendents: Noble[] = [];
      if (this.nobleForm.controls.mom.value !== null) {
        let myMom: Noble = this.nobleForm.controls.mom.value;
        ascendents.push(myMom);
      }

      console.log('my new dad:');
      console.log(this.nobleForm.controls.dad.value);


      if (this.nobleForm.controls.dad.value !== null) {
        let myDad: Noble = this.nobleForm.controls.dad.value;
        ascendents.push(myDad);
      }

      this.noble.ascendents = ascendents;

      if (this.edit) {
        console.log(this.noble);

        this.nobleService.update(this.noble).subscribe(noble => {
          console.log(noble);
          this.router.navigate(['/nobles']);
        });

      }
      else {
        this.nobleService.save(this.noble).subscribe(noble => {
          console.log(noble);
          this.router.navigate(['/nobles']);
        });
      }
    }
  }

  disableSaveButton() {
    return ((this.reignIdsWithError.length > 0) || (this.nobleForm.invalid));
  }

  cancel() {
    this.router.navigate(['/nobles']);
  }

  getNobleName(noble: Noble): string {
    return noble?.name.toString();
  }

  private requireMatchLadies(control: FormControl): ValidationErrors | null {
    const selection: Noble = control.value;
    if (selection !== null && this.ladies && selection.id === undefined) {
      return { requireMatchLadies: true };
    }
    return null;
  }

  private requireMatchGentlemen(control: FormControl): ValidationErrors | null {
    const selection: any = control.value;
    if (selection !== null && this.gentlemen && selection.id === undefined) {
      return { requireMatchGentlemen: true };
    }
    return null;
  }

  setReignError(errorDetected: Boolean, i: Number) {
    if (errorDetected && !this.reignIdsWithError.includes(i)) {
      this.reignIdsWithError.push(i);
    }
    if (!errorDetected && this.reignIdsWithError.includes(i)) {
      this.reignIdsWithError.splice(
        this.reignIdsWithError.indexOf(i),
        1
      );
    }
  }

  private requireNoReignError(control: FormControl): ValidationErrors | null {
    let reigns: Reign[] = control.value;
    if (this.reignIdsWithError.length > 0) {
      return { requireNoReignError: true };
    }
    return null;
  }


  ngOnDestroy() {
    this.sub.forEach(sub => {
      sub.unsubscribe();
    });
    this.sub = [];
  }

}
