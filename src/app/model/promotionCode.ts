export interface PromotionCode {
  id:number,
  code:string,
  discountPercentage:number,
  minPurchaseAmount:number,
  maxPurchaseAmount:number,
  maxUsageCount:number,
  dateStart:Date,
  dateEnd:Date,
  status:string,
}
