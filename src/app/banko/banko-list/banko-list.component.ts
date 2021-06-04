import { Component, OnInit, Input } from '@angular/core';
import { UUID } from 'angular2-uuid';

import { GameList } from 'src/app/shared/game-list.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { WeeklyMatchesService } from 'src/app/weekly-matches.service';
import { BankoService } from '../banko.service';
import { ExcelService } from './excel.service';

@Component({
  selector: 'app-banko-list',
  templateUrl: './banko-list.component.html',
  styleUrls: ['./banko-list.component.scss'],
  providers: [ExcelService]
})
export class BankoListComponent implements OnInit {
  // DB probs qty
  @Input() playedMatchQty: number;
  @Input() oneColPrice: number;

  display = 'none';
  isDisabled: boolean;
  dateNow = new Date();
  isHidden = true;
  gameList = new GameList(
    UUID.UUID(), // id
    this.dateNow, // date
    0, // col qty
    0, // totalPrice
    [], // orgMatches
    [], // orgGameList
    [], // adjMatches
    [], // adjGameList
    [], // orgFilteredGameList
    []); // adjFilteredGameList

  constructor(private weeklyMatchesService: WeeklyMatchesService,
              private dataStorageService: DataStorageService,
              private bankoService: BankoService,
              private excelService: ExcelService) { }

   ngOnInit() {
    // Games calculated
     this.weeklyMatchesService.gameInfoChanged.subscribe(el => {

      // Match info to gamelist
      this.gameList.adjMatchArr = el.adjMatchArr;
      this.gameList.orgMatchArr = el.orgMatchArr;

      // Generate all games
      try {
        const allProbs = this.dataStorageService.getAllProbs(this.playedMatchQty);
        allProbs.forEach((item, i) => this.gameList.adjGameList[`col${i + 1}`] = el.adjGameArr.concat(item.split('')));
        this.gameList.adjFilteredGameList = this.gameList.adjGameList;
        this.gameList.colQty = Object.keys(this.gameList.adjFilteredGameList).length;
        this.gameList.totalPrice = this.gameList.colQty * this.oneColPrice;
      } catch (e) {
        alert(`Kupon hesaplarken sorun oluştu!! Tekrar deneyiniz..`);
      }
      this.bankoService.setGameList(this.gameList);
      this.display = 'flex';
      this.gameList = this.bankoService.getGameList();
      this.disabledCheck(25000);
    });
    // Games filtered
     this.bankoService.gamesFiltered.subscribe(el => {
      this.gameList = el;
      this.gameList.totalPrice = el.colQty * this.oneColPrice;
      this.disabledCheck(25000);
    });
    this.bankoService.hide.subscribe(el => this.isHidden = el);
  }

  excel() {
    console.log(this.gameList);
    this.excelService.exportAsExcelFile(this.gameList.orgMatchArr, this.gameList.orgFilteredGameList,
      this.gameList.colQty, 'aaa');
  }

  disabledCheck(num: number) {
    if (this.gameList.colQty < num) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
 };

}
