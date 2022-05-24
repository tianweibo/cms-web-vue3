export interface TotalPaidOrderAmount {
  title: string;
  p1: string;
  p2?: string;
  p3?: string;
  p4?: string;
  p5?: string;
}
export interface Description {
  metaName: string;
  metaCode: string;
  totalPaidOrderAmount: TotalPaidOrderAmount;
}