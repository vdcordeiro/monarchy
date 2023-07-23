import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { NobleService } from 'src/app/services/noble/noble.service';
import { Noble } from './../../models/noble';

@Component({
  selector: 'app-kinship',
  templateUrl: './kinship.component.html',
  styleUrls: ['./kinship.component.scss']
})
export class KinshipComponent implements OnInit, OnDestroy {

  subs: Subscription[] = [];
  nobles: Noble[] = [];
  kinships: string[] = ["the same person"];
  nobleTwo: Noble = new Noble();
  nobleOne: Noble = new Noble();

  constructor(
    private nobleService: NobleService
  ) {}

  ngOnInit() {

    this.subs.push(
      this.nobleService.getAll().subscribe((ns) => {
        this.nobles = ns
        if (ns.length > 0) {
          this.nobles.sort(this.compareNobles);
          this.nobleOne = this.nobleTwo = this.nobles.at(0) as Noble;
        }
      })
    );

  }

  compareNobles(n1: Noble, n2: Noble) {
    return (n1.fullName > n2.fullName)
            ? 1
            : (n1.fullName < n2.fullName)
              ? -1
              : 0;
  }

  getKinships() {
    this.subs.push(
      this.nobleService.getKinships(this.nobleTwo.id, this.nobleOne.id).subscribe(ks => {
        this.kinships = ks;
      })
    );
  }

  getKinshipType(kinship: string) {
    return (this.nobleOne.id == this.nobleTwo.id)
      ? 'same'
      : (kinship.toLowerCase() == 'no kinship')
        ? 'none'
        : 'some';
  }

  ngOnDestroy() {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
    this.subs = [];
  }

}
