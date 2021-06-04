import { Subject } from 'rxjs';

import { CouponMatch } from './shared/coupon-match.model';
import matchesInfo from '../assets/matchesInfo.json';


export class WeeklyMatchesService {
  date = new Date();
  matchsInfo = new CouponMatch(
    matchesInfo.year, // Current Year
    matchesInfo.week, // Week No
      matchesInfo.orgMatchArr, // Original match arr
      matchesInfo.orgMatchArr, // Adj match arr
      [], // Original game arr
      [], // Adj game arr
      ); // results of matches
      filterArr = [];
      matchsInfoChanged = new Subject<CouponMatch>();
      matchsSelectionsChanged = new Subject<CouponMatch>();
      gameInfoChanged = new Subject<CouponMatch>();
      isDisabled = new Subject<boolean>();


// Weekly-match.component method
setMatchsInfo(info: CouponMatch) {
this.matchsInfo = info;
this.matchsInfoChanged.next(this.matchsInfo);
}

getMatchsInfo() {
  return this.matchsInfo;
}

// Change selections
generateAdjArray(bankoArr) {
let changedIndex;
let replacedIndex;
this.matchsSelectionsChanged.next(this.matchsInfo);
const tempArr = bankoArr.concat(this.filterArr);

for (let i = 0; i < tempArr.length; i++) {
  if (tempArr[i] !== this.matchsInfo.adjMatchArr[i]) {
    changedIndex = i;
  }
}

replacedIndex = this.matchsInfo.adjMatchArr.findIndex(el => el === tempArr[changedIndex]);

tempArr[replacedIndex] = this.matchsInfo.adjMatchArr[changedIndex];

this.matchsInfo.adjMatchArr = tempArr;

}

// Get filter component matches array
getFilterArr(arr) {
  this.filterArr = arr;
}

setGamePlays(arr) {
  this.matchsInfo.adjGameArr = arr;
  this.matchsInfoChanged.next(this.matchsInfo);
}

calculateGames() {
this.gameInfoChanged.next(this.matchsInfo);
this.isDisabled.next(true);
}

}
