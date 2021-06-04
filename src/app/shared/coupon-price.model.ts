export class CouponPrice {
  constructor(
    public id: any,
    public doubleSelQty: number,
    public tripleSelQty: number,
    public colQty: number,
    public minPrice: number,
    public totalPrice: number,
    public createDate: string
  ) {}
}
