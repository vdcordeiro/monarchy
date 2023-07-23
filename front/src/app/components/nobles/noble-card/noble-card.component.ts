import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Gender } from 'src/app/models/enum/gender';
import { Noble } from 'src/app/models/noble';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
import { Reign } from 'src/app/models/reign';
import { faCrown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-noble-card',
  templateUrl: './noble-card.component.html',
  styleUrls: ['./noble-card.component.scss']
})
export class NobleCardComponent {

  @Input()
  noble: Noble = new Noble();

  @Output()
  deleteNoble = new EventEmitter<Boolean>();

  @Output()
  nobleClicked = new EventEmitter<Boolean>();

  faTrash = faTrash;
  faMars = faMars;
  faVenus = faVenus;
  faCrown = faCrown;
  enumGender = Gender;

  getParentName(noble: Noble, gender: String): String {
    let parentName = noble.ascendents?.find(p => (p.gender === gender.toUpperCase()))?.name;
    return (parentName) ? parentName : '';
  }

  getLifeTime(noble: Noble): string {
    let born = new Date(noble.born);
    let death = new Date(noble.death);
    return born.getFullYear() + ' - ' + death.getFullYear();
  }

  getReignTime(reign: Reign): string {
    let from = new Date(reign.from);
    let to = new Date(reign.to);
    return from.getFullYear() + ' - ' + to.getFullYear();
  }

  delete(event: any) {
    event.stopPropagation();
    this.deleteNoble.emit(true);
  }

  clicked() {
    this.nobleClicked.emit(true);
  }

  getCodeClass(code: string): string {
    return 'flag-icon flag-icon-' + code.toLowerCase() + ' flag-icon-squared';
  }

}
