export class CouponMatch {
  constructor(
   public year: number,
   public weekNo: number,
   public orgMatchArr: string[],
   public adjMatchArr: string[],
   public orgGameArr: string[],
   public adjGameArr: string[],
  ) {}
}
