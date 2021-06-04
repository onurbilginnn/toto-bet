import { Subject } from 'rxjs';


import { GameList } from '../shared/game-list.model';

export class BankoService {
matchQtySelection: number;
selectedMatchQtyChanged = new Subject<number>();
gamesFiltered = new Subject<GameList>();
hide = new Subject<boolean>();
bankoArr: string[];
gameList = new GameList(
 0, // id
  new Date(), // date
  0, // col qty
  0, // totalPrice
  [], // orgMatches
  [], // orgGameList
  [], // adjMatches
  [], // adjGameList
  [], // orgFilteredGameList
  []); // adjFilteredGameList
  changedGameIndexes = new Array(15);


  setSelectedMatchQty(qty) {
    this.matchQtySelection = parseFloat(qty);
    this.selectedMatchQtyChanged.next(this.matchQtySelection);
  }

  setBankoArr(bankoArr: string[]) {
    this.bankoArr = bankoArr;
  }

  getBankoArr() {
    return this.bankoArr;
  }

  calcTotalGamePrice (colQty: number, oneColPrice: number) {
    const totalPrice = colQty * oneColPrice;
    return totalPrice;
  }

  setGameList(game: GameList) {
    this.gameList = game;
  }

  getGameList() {
    return this.gameList;
  }

  generateOrgGames() {
    this.convertOrgGameList(this.gameList.adjMatchArr, this.gameList.orgMatchArr,
      this.changedGameIndexes, this.gameList.colQty, this.gameList.adjGameList, this.gameList.orgGameList);
  }

  generateOrgFilteredGames() {
    this.convertOrgGameList(this.gameList.adjMatchArr, this.gameList.orgMatchArr,
      this.changedGameIndexes, this.gameList.colQty, this.gameList.adjFilteredGameList, this.gameList.orgFilteredGameList);
  }

  // Order games by toto match list
  convertOrgGameList(adjMatchArr, orgMatchArr, changedGameIndexes, colQty, adjGameList, orgGameList) {
    for (let j = 0; j < adjMatchArr.length; j++) {
      for ( let k = orgMatchArr.length - 1; k >= 0; k--) {
        if (adjMatchArr[j] === orgMatchArr[k]) {
          changedGameIndexes[j] = k;
          break;
        }
      }
    }
    let tempArr = new Array(changedGameIndexes.length);

    for (let z = 0; z <  colQty; z++) {
      for(let i = 0 ;i < changedGameIndexes.length; i++) {
        if(i === changedGameIndexes[i]) {
          tempArr[i] = adjGameList[`col${z+1}`][i];
        } else {
          tempArr[i] = adjGameList[`col${z+1}`][changedGameIndexes[i]];
        }
      }
      orgGameList[`col${z + 1}`] = tempArr;
      tempArr = [];
      }
  }

  filterAdjGames(filterArr: string[]) {
    this.gameList.adjFilteredGameList = this.gameList.adjGameList;
    let filteredAdjGames = {};
    let count = 1;
    let length = Object.keys(this.gameList.adjFilteredGameList).length;

    // Loop selected filter qty
    for (let filterLoopQty = 0; filterLoopQty < filterArr.length; filterLoopQty++) {
      if (filterArr[filterLoopQty] !== '102') {
      // Loop all col object
      for (let col = 1; col <= length; col++) {
        // Filter demands array
            const splittedFilter = filterArr[filterLoopQty].split('');
            // Filtering
            splittedFilter.forEach(item => {
              if (item === this.gameList.adjFilteredGameList[`col${col}`][filterLoopQty]) {
                filteredAdjGames[`col${count}`] = this.gameList.adjFilteredGameList[`col${col}`];
                count++;
               }
              });

      }
      this.gameList.adjFilteredGameList = filteredAdjGames;
      } else {
      continue;
       }
      length = Object.keys(this.gameList.adjFilteredGameList).length;
      filteredAdjGames = {};
      count = 1;
    }
    this.gameList.colQty = length;
    this.gamesFiltered.next(this.gameList);
    this.hide.next(false);
    this.generateOrgFilteredGames();
  }


}
