import { ɵSafeHtml } from '@angular/core'
import { SafeHtml } from '@angular/platform-browser'
import internal from 'events'
import moment from 'moment'
export class OrderModule {
  Id: number
  Updated: boolean = false
  OrderNo: number
  InvoiceNo: number
  // SourceId: number;
  AggregatorOrderId: string
  UPOrderId: string
  StoreId: number
  // CustomerId: number;
  // CustomerAddressId: number;
  OrderStatusId: number
  PreviousStatusId: number
  BillAmount: number
  PaidAmount: number
  RefundAmount: number
  Source: string
  Tax1: number
  Tax2: number
  Tax3: number
  BillStatusId: number
  // SplitTableId: number;
  DiscPercent: number
  DiscAmount: number
  IsAdvanceOrder: boolean = false
  CustomerData: string
  // DiningTableId: number;
  // WaiterId: number;
  OrderedDateTime: string
  OrderedDate: string
  DeliveryDateTime: string
  BillDateTime: string
  BillDate: string
  Note: string
  OrderStatusDetails: string
  RiderStatusDetails: string
  FoodReady: boolean = false
  Closed: boolean = false
  OrderJson: string
  ItemJson: string
  ChargeJson: string
  ModifiedDate: string
  CompanyId: number
  OrderType: number
  CreatedDate: string
  SuppliedById: number
  OrderedById: number
  SpecialOrder: boolean = false
  WipStatus: string
  ProdStatus: string
  Subtotal: number
  TaxAmount: number
  BatchNo: number
  constructor(ordertype) {
    this.Updated = false
    this.OrderNo = 0
    this.InvoiceNo = 0
    this.AggregatorOrderId = ''
    this.UPOrderId = ''
    this.StoreId = 0
    // this.CustomerId = 0;
    // this.CustomerAddressId = 0;
    this.OrderStatusId = 0
    this.PreviousStatusId = 0
    this.BillAmount = 0
    this.PaidAmount = 0
    this.RefundAmount = 0
    this.Source = ''
    this.Tax1 = 0
    this.Tax2 = 0
    this.Tax3 = 0
    this.BillStatusId = 0
    // this.SplitTableId = 0;
    this.DiscPercent = 0
    this.DiscAmount = 0
    this.IsAdvanceOrder = false
    this.CustomerData = ''
    // this.DiningTableId = 0;
    // this.WaiterId = 0;
    this.OrderedDateTime = ''
    this.OrderedDate = ''
    this.DeliveryDateTime = ''
    this.BillDateTime = ''
    this.BillDate = ''
    this.Note = ''
    this.OrderStatusDetails = ''
    this.RiderStatusDetails = ''
    this.FoodReady = false
    this.Closed = false
    this.OrderJson = ''
    this.ItemJson = ''
    this.ChargeJson = ''
    // this.Charges = 0;
    // this.OrderDiscount = 0;
    // this.OrderTaxDisc = 0;
    // this.OrderTotDisc = 0;
    // this.AllItemDisc = 0;
    // this.AllItemTaxDisc = 0;
    // this.AllItemTotalDisc = 0;
    this.ModifiedDate = ''
    // this.UserId = 0;
    this.CompanyId = 0
    this.OrderType = ordertype
    // this.AutoOrderId = 0;
    this.CreatedDate = ''
    this.SuppliedById = 0
    this.OrderedById = 0
    // this.OrderStatus = 0;
    // this.DispatchStatus = 0;
    //  this.ReceiveStatus = 0;
    // this.CancelStatus = 0;
    this.SpecialOrder = false
    this.WipStatus = ''
    this.ProdStatus = ''
    // this.DifferentPercent = 0;
  }
}
export class Transmodule {
  ContactId: number
  UserId: number
  ResponsibleById: number
  ContactTypeId: number
  StoreId: number
  CreditTypeId: number
  ProviderId: number
  Amount: string
  Description: string
  TransDate: string
  CreatedDate: string
  TransDateTime: string
  PaymentTypeId: number
  PaymentStatusId: number
  TranstypeId: number

  constructor() {
    this.ContactId = 0
    this.UserId = 0
    this.ResponsibleById = 0
    this.ContactTypeId = 0
    this.StoreId = 0
    this.CreditTypeId = 0
    this.ProviderId = 0
    this.Amount = ''
    this.Description = '',
    this.TransDate = ''
    this.CreatedDate = ''
    this.TransDateTime = ''
    this.PaymentTypeId = 0
    this.PaymentStatusId = 0
    this.TranstypeId = 0
  }
}
