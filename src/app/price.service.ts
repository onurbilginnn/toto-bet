import { Subject } from 'rxjs';
import {UUID} from 'angular2-uuid';

import { CouponPrice } from './shared/coupon-price.model';

export class PriceService {
  basePrice = 0.5;
public couponPrice = new CouponPrice(UUID.UUID(), 0, 0, 1, this.basePrice, this.basePrice, Date());
couponChanged = new Subject<CouponPrice>();

constructor() {
}

  setMinPrice(minPrice) {
    this.couponPrice.minPrice = parseFloat(minPrice);
    this.calcCouponPrice();
  }

  setSelectionsQty(double, triple) {
    this.couponPrice.doubleSelQty = double;
    this.couponPrice.tripleSelQty = triple;
    this.calcCouponPrice();
  }

  calcCouponPrice() {
    this.couponPrice.colQty = Math.pow(2, this.couponPrice.doubleSelQty) *  Math.pow(3, this.couponPrice.tripleSelQty);
    this.couponPrice.totalPrice = this.couponPrice.colQty * this.couponPrice.minPrice;
    this.couponChanged.next(this.couponPrice);

  }

  clearCoupon() {
    this.couponPrice.doubleSelQty = 0;
    this.couponPrice.tripleSelQty = 0;
    this.couponPrice.colQty = 1;
    this.couponPrice.minPrice = this.basePrice;
    this.couponPrice.totalPrice = this.basePrice;
    this.couponPrice.createDate = Date();
    this.couponChanged.next(this.couponPrice);
  }

}
