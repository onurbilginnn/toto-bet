import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { WeeklyMatchesService } from '../weekly-matches.service';
import { CouponMatch } from '../shared/coupon-match.model';

@Component({
  selector: 'app-weekly-match',
  templateUrl: './weekly-match.component.html',
  styleUrls: ['./weekly-match.component.scss']
})
export class WeeklyMatchComponent implements OnInit {
  matchQty = [];
  dateNow = new Date().getFullYear();


  constructor(private weeklyMatchesService: WeeklyMatchesService) { }

  ngOnInit() {
    this.matchQty = new Array(15);
  }

  // Send match info to weekly-matches service
  sendData(form: NgForm) {
    const value = form.value;
    const matchArr = [];

    this.fillMatchArrays(matchArr, value, 'matchName');

    const matchInfo = new CouponMatch(
      value.year,
      value.weekNo,
      matchArr,
      matchArr,
      [],
      [],
      );

    this.weeklyMatchesService.setMatchsInfo(matchInfo);

  }

  // Create match info array
  fillMatchArrays(arr, obj: any, DOMString: string) {
    for (let i = 1; i <= this.matchQty.length; i++) {
      arr.push(obj[`${DOMString}${i}`]);
      }
  }
}
