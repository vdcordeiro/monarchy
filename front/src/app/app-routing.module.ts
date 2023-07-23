import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesComponent } from './components/countries/countries.component';
import { CountryComponent } from './components/country/country.component';
import { HomeComponent } from './components/home/home.component';
import { KinshipComponent } from './components/kinship/kinship.component';
import { NobleComponent } from './components/noble/noble.component';
import { NoblesComponent } from './components/nobles/nobles.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(
    [
      { path: '', component: HomeComponent,
        children: [
          { path: '', redirectTo: 'nobles', pathMatch: 'full' },
          { path: 'nobles', component: NoblesComponent },
          { path: 'noble/:id', component: NobleComponent },
          { path: 'countries', component: CountriesComponent },
          { path: 'country/:id', component: CountryComponent },
          { path: 'kinship', component: KinshipComponent },
        ]
      },
    ],
    {onSameUrlNavigation: 'reload'}
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
