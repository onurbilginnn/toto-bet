import { Injectable } from '@angular/core';

import allProbs from '../../assets/all-probs.json';

@Injectable()
export class DataStorageService {
  gamesList = {};

  constructor() {}

  getAllProbs(matchQty) {
    return allProbs[`m${matchQty}`];
}
}
