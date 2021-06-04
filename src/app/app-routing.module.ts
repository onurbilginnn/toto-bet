import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoreComponent } from './core/core.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BankoComponent } from './banko/banko.component';
import { WeeklyMatchComponent } from './weekly-match/weekly-match.component';

const appRoutes: Routes = [
  { path: '', component: CoreComponent},
  { path: 'oyun', component: BankoComponent },
  { path: 'mac-giris', component: WeeklyMatchComponent },
  { path: 'not-found', component: PageNotFoundComponent, data: {message: 'Sayfa bulunamadı!'} },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
