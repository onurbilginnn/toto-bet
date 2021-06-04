import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter  } from '@angular/core';

import { PriceService } from '../../price.service';
import { WeeklyMatchesService } from 'src/app/weekly-matches.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: []

})
export class HeaderComponent implements OnInit {

  @ViewChild('tripleSelectQty') tripleSelectQty: ElementRef;
  @ViewChild('doubleSelectQty') doubleSelectQty: ElementRef;
  @ViewChild('colTotal') colTotal: ElementRef;
  @ViewChild('couponMinPrice') couponMinPrice: ElementRef;
  @ViewChild('totalPrice') totalPrice: ElementRef;
  @ViewChild('weekNo') weekNo: ElementRef;

  minPrice: number;

constructor(private priceService: PriceService,
            private weeklyMatchesService: WeeklyMatchesService) {

}
  ngOnInit() {
    // Inıtial value assignment
    this.weekNo.nativeElement.innerHTML = this.weeklyMatchesService.getMatchsInfo().weekNo;
    this.tripleSelectQty.nativeElement.innerHTML = this.priceService.couponPrice.tripleSelQty;
    this.doubleSelectQty.nativeElement.innerHTML = this.priceService.couponPrice.doubleSelQty;
    this.colTotal.nativeElement.innerHTML = this.priceService.couponPrice.colQty;
    this.couponMinPrice.nativeElement.value = this.priceService.couponPrice.minPrice;
    this.totalPrice.nativeElement.innerHTML = this.priceService.couponPrice.totalPrice;

    // Subscribe Services
    this.priceService.couponChanged.subscribe(el => {
      this.tripleSelectQty.nativeElement.innerHTML = el.tripleSelQty;
      this.doubleSelectQty.nativeElement.innerHTML = el.doubleSelQty;
      this.colTotal.nativeElement.innerHTML = el.colQty;
      this.totalPrice.nativeElement.innerHTML = el.totalPrice;
  });
    this.weeklyMatchesService.matchsInfoChanged.subscribe(el => this.weekNo.nativeElement.innerHTML = el.weekNo);
    this.weeklyMatchesService.isDisabled.subscribe(el => this.couponMinPrice.nativeElement.disabled = el);

}
// Coupon min price change
  changeCouponMinPrice(e) {
     this.minPrice = e.target.value;
     this.priceService.setMinPrice(this.minPrice);
     this.totalPrice.nativeElement.innerHTML = this.priceService.couponPrice.totalPrice;
  }

}
