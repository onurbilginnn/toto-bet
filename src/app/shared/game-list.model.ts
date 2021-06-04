export class GameList {
  constructor(
    public id: any,
    public playDate: Date,
    public colQty: number,
    public totalPrice: number,
    public orgMatchArr: string[],
    public orgGameList: {},
    public adjMatchArr: string[],
    public adjGameList: {},
    public orgFilteredGameList: {},
    public adjFilteredGameList: {},
  ) {}
}
