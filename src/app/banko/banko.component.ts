import { Component, OnInit, ViewChild, ElementRef, ViewChildren } from '@angular/core';

import { PriceService } from '../price.service';
import { BankoService } from './banko.service';
import { WeeklyMatchesService } from '../weekly-matches.service';
import { CouponMatch } from '../shared/coupon-match.model';

@Component({
  selector: 'app-banko',
  templateUrl: './banko.component.html',
  styleUrls: ['./banko.component.scss'],
  providers: [BankoService]
})


export class BankoComponent implements OnInit {
@ViewChild('matchQtySelect') matchQtyElement: ElementRef;
@ViewChild('clearBtn') clearBtn: ElementRef;
@ViewChild('allItems') allItems: ElementRef;
@ViewChildren('bankoOptSelect') bankoOptSelect: ElementRef[];
@ViewChildren('matchName') matchName: ElementRef[];

matchQty = [];
bankoInputArr: any;
selectedMatchQty: number;
matchInfo: CouponMatch;
oneColPrice: number;

  constructor(private priceService: PriceService,
              private bankoService: BankoService,
              private weeklyMatchesService: WeeklyMatchesService) { }


  ngOnInit() {
    // Fiiling match probability selection list numbers max 10
  this.fillMatchQty(this.matchQty);

  // Match list info from DB
  this.matchInfo = this.weeklyMatchesService.getMatchsInfo();

      // User enters new week match list
  this.weeklyMatchesService.matchsInfoChanged.subscribe(el => this.matchInfo = el);

  // Disable selections after game calculation
  this.weeklyMatchesService.isDisabled.subscribe(el => {
    this.matchName.forEach(el => el.nativeElement.disabled = el);
    this.bankoOptSelect.forEach(el => el.nativeElement.disabled = el);
    this.matchQtyElement.nativeElement.disabled = el;
    this.clearBtn.nativeElement.hidden = el;

  });

  }

  // Fill Match qty select list with 10 items
  fillMatchQty(qtyArr) {
    const probQty = 11 ;
    for (let i = 0; i < probQty; i++) {
      qtyArr[i] = i ;
    }
  }

  // Select auto generated match qty
  selectChange(e) {
    this.selectedMatchQty = e.target.value;
    this.bankoInputArr = new Array(15 - this.selectedMatchQty);
    this.clearBtn.nativeElement.hidden = false;
    this.bankoService.setSelectedMatchQty(this.selectedMatchQty);
  }

  // Game play selections
  gameSelect() {

    // Column qty Calculation
    let selectLength = 0;
    let doubleSelectionQty = 0;
    let tripleSelectionQty = 0;
    this.bankoOptSelect.forEach(el => {
      selectLength = el.nativeElement.value.length;
      if (selectLength === 2) {
        doubleSelectionQty++;
      } else if (selectLength === 3) {
        tripleSelectionQty++;
      }
      });
    this.priceService.setSelectionsQty(doubleSelectionQty, tripleSelectionQty);
    this.weeklyMatchesService.setGamePlays(this.bankoOptSelect.map(el => el.nativeElement.value));
    this.oneColPrice = this.priceService.couponPrice.totalPrice;
      }

  // Clear all current banko inputs
  clearBanko() {
    // Clear price
    this.priceService.clearCoupon();
    // Clear banko selections
    this.bankoOptSelect.forEach(el => {
      el.nativeElement.value = '0';
    });
    // Clear gamePlayArr
    this.weeklyMatchesService.matchsInfo.adjGameArr =  this.bankoOptSelect.map(el => el.nativeElement.value);
  }

  // Match name value change
  changeValues() {
    const adjustedArr = this.matchName.map((el) => el.nativeElement.value.toString());
    this.weeklyMatchesService.generateAdjArray(adjustedArr);
  }

}
