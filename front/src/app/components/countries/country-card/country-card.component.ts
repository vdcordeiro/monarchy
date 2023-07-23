import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Country } from 'src/app/models/country';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.scss']
})
export class CountryCardComponent {

  @Input()
  country: Country = new Country();

  @Output()
  deleteCountry = new EventEmitter<Boolean>();

  @Output()
  countryClicked = new EventEmitter<Boolean>();

  faTrash = faTrash;


  delete(event: any) {
    event.stopPropagation();
    this.deleteCountry.emit(true);
  }

  clicked() {
    this.countryClicked.emit(true);
  }

  getCodeClass(code: string): string {
    return 'flag-icon flag-icon-' + code.toLowerCase() + ' flag-icon-squared';
  }

}
