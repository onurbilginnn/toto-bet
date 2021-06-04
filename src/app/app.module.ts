import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CoreComponent } from './core/core.component';
import { HeaderComponent } from './core/header/header.component';
import { BankoComponent } from './banko/banko.component';
import { PriceService } from './price.service';
import { FilterProbsComponent } from './banko/filter-probs/filter-probs.component';
import { WeeklyMatchComponent } from './weekly-match/weekly-match.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { WeeklyMatchesService } from './weekly-matches.service';
import { BankoListComponent } from './banko/banko-list/banko-list.component';
import { DataStorageService } from './shared/data-storage.service';


@NgModule({
  declarations: [
    AppComponent,
    CoreComponent,
    HeaderComponent,
    BankoComponent,
    FilterProbsComponent,
    WeeklyMatchComponent,
    PageNotFoundComponent,
    BankoListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [PriceService,
              WeeklyMatchesService,
              DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
