import { NobleDeletionConfirmDialog } from './components/nobles/noble-deletion-dialog/noble-deletion-confirm-dialog';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountriesComponent } from './components/countries/countries.component';
import { CountryDeletionConfirmDialog } from './components/countries/country-deletion-dialog/country-deletion-confirm-dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material Modules
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
// -------------------------------

import { HttpClientModule } from '@angular/common/http';
import { CountryComponent } from './components/country/country.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoblesComponent } from './components/nobles/nobles.component';
import { NobleComponent } from './components/noble/noble.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './components/home/home.component';
import { ReigncardComponent } from './components/noble/reigncard/reigncard.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { NobleCardComponent } from './components/nobles/noble-card/noble-card.component';
import { CountryCardComponent } from './components/countries/country-card/country-card.component';
import { KinshipComponent } from './components/kinship/kinship.component';

const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'MM/DD/YYYY', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'MMM DD, YYYY', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@NgModule({
  declarations: [
    AppComponent,
    CountriesComponent,
    CountryComponent,
    NoblesComponent,
    NobleComponent,
    CountryDeletionConfirmDialog,
    NobleDeletionConfirmDialog,
    HomeComponent,
    ReigncardComponent,
    NobleCardComponent,
    CountryCardComponent,
    KinshipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,

    // Angular Material Modules
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatRadioModule,
    MatChipsModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatMenuModule,
    MatDialogModule,
    MatGridListModule,
    MatTabsModule,
    MatCardModule,
    MatMomentDateModule,
    //MatMomentDateAdapterOptions,
    // ---------------------------

    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
//    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
