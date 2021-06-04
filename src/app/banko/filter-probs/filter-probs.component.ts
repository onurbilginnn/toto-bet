import { Component, OnInit, ViewChildren, ElementRef, ViewChild } from '@angular/core';

import { BankoService } from '../banko.service';
import { CouponMatch } from 'src/app/shared/coupon-match.model';
import { WeeklyMatchesService } from 'src/app/weekly-matches.service';

@Component({
  selector: 'app-filter-probs',
  templateUrl: './filter-probs.component.html',
  styleUrls: ['./filter-probs.component.scss'],
  providers: []
})
export class FilterProbsComponent implements OnInit {

@ViewChild('warning') warning: ElementRef;
@ViewChildren('allBtns') allBtns: ElementRef[];
@ViewChildren('filtreOptSelect') filtreOptSelect: ElementRef[];
@ViewChildren('matchName') matchName: ElementRef[];

matchInfo: CouponMatch;
isDisabled = true;
filterQty: number[];
filterStartNumber = 0;
gamesPlayedArr: string[];
filterSelectArr: string[];

  constructor(private bankoService: BankoService,
              private weeklyMatchesService: WeeklyMatchesService) { }

  ngOnInit() {
    this.bankoService.selectedMatchQtyChanged.subscribe(el => {
      // Hide Btns
      this.allBtns.forEach(el => el.nativeElement.childNodes.forEach(item => item.hidden = true));
      this.warning.nativeElement.hidden = false;

      this.filterQty = new Array(el);
      this.filterStartNumber = 16 - el;
      this.matchInfo = this.weeklyMatchesService.getMatchsInfo();

      // User enters new week match list
      this.weeklyMatchesService.matchsInfoChanged.subscribe( el => this.matchInfo = el);

      // User changed bet order of TOTO
      this.weeklyMatchesService.matchsSelectionsChanged.subscribe( el => {

        // Filter match labels assigned to an array
        const filterArr = this.matchName.map(el => el.nativeElement.innerHTML);

        // Filter match labels sent to service
        this.weeklyMatchesService.getFilterArr(filterArr);

      });

    });

    this.weeklyMatchesService.matchsInfoChanged.subscribe(el => {
      this.allBtns.forEach( el => el.nativeElement.childNodes.forEach((item, i) => {
        if(i === 1) {
          item.hidden = false;
        }
        }));
      this.warning.nativeElement.hidden = true;
      this.gamesPlayedArr = el.adjGameArr;
    });
  }

  // Set all filters to 102
  clearFilter() {
    this.filtreOptSelect.forEach(el => el.nativeElement.value = '102');
  }

  // Calculate btn clicked
  calcCoupons() {
    this.isDisabled = false;
    this.allBtns.forEach(el => el.nativeElement.childNodes[1].hidden = true);
    this.allBtns.forEach(el => el.nativeElement.childNodes[0].hidden = false);
    this.allBtns.forEach(el => el.nativeElement.childNodes[2].hidden = false);
    this.weeklyMatchesService.calculateGames();
    this.bankoService.generateOrgGames();
  }

  filterCoupons() {
    const filterArrStartNo = this.filterStartNumber - 1;
    const filterArr = this.filtreOptSelect.map(el => el.nativeElement.value);

    this.filterSelectArr = new Array(15);
    for (let i = 0; i < this.filterSelectArr.length; i++) {
      if (i < filterArrStartNo) {
        this.filterSelectArr[i] = '102';
      } else {
       this.filterSelectArr[i] = filterArr[i - filterArrStartNo];
      }
    }

    this.bankoService.filterAdjGames(this.filterSelectArr);

  }

}
