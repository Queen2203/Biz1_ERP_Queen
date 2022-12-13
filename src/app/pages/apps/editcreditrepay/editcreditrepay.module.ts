import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import moment from 'moment';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class EditcreditrepayModule { }

export class Transmodule {
  TransactionId: number
  CompanyId: number
  ContactId: number
  // UserId: number
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
  TransTypeId: number
  TransModeId: number
  CreatedBy: number
  Bill: BillModule

  constructor() {
    this.TransactionId = 0
    this.CompanyId = 0
    this.ContactId = 0
    // this.UserId = 0
    this.ResponsibleById = 0
    this.ContactTypeId = 0
    this.StoreId = 0
    this.CreditTypeId = 0
    // this.ProviderId = 0
    this.Amount = ''
    this.Description = ''
    this.TransDate = ''
    this.CreatedDate = ''
    this.TransDateTime = ''
    this.PaymentTypeId = 0
    this.PaymentStatusId = 0
    this.TransTypeId = 8
    this.TransModeId = 0
    this.CreatedBy = 0
    this.Bill = new BillModule()
  }
}

export class BillModule {
  BillId: number
  InVoiceNum: string
  BillType: number
  DispathchType: number
  BillAmount: number
  BillAmountNoTax: number
  TaxAmount: number
  PaidAmount: number
  Quantity: number
  ProviderId: number
  ReceiverId: number
  DispatchById: number
  ReceivedById: number
  CreatedDate: string
  CreatedBy: number
  BillDate: string
  DispatchedDate: string
  // ReceivedDate: string
  // ReceiveStatus: number
  // DispatchLater: boolean
  // ReceiveLater: boolean
  // IsReturn: boolean
  DiscPercent: number
  DiscAmount: number
  TotalDiscount: number
  IsPaid: boolean
  CreditTypeStr: string
  TotalAmount: number
  CompanyId: number
  OrderId: number
  // ShowallProd: boolean
  ResponsibleById: number
  BillStatusId: number
  constructor(contactId = 0, padamt =0) {
    this.BillId = 0
    this.InVoiceNum = ''
    this.BillAmountNoTax = 0
    this.BillType = 0
    this.DispathchType = 0
    this.BillAmount = 0
    this.TaxAmount = 0
    this.PaidAmount = padamt
    this.Quantity = 0
    this.ProviderId = 0
    this.ReceiverId = contactId
    this.DispatchById = null
    this.ReceivedById = 0
    this.BillDate = moment().format('YYYY-MM-DD HH:MM A')
    this.CreatedDate = moment().format('YYYY-MM-DD HH:MM A')
    this.CreatedBy = 12
    this.DispatchedDate = moment().format('YYYY-MM-DD HH:MM A')
    // this.ReceivedDate = moment().format('YYYY-MM-DD HH:MM A');
    // this.ReceiveStatus = 0
    // this.DispatchLater = false
    // this.ReceiveLater = false
    // this.IsReturn = false
    this.DiscPercent = 0
    this.DiscAmount = 0
    this.TotalDiscount = 0
    this.IsPaid = false
    this.CreditTypeStr = ''
    this.TotalAmount = 0
    this.CompanyId = 1
    this.OrderId = 0
    // this.ShowallProd = false
    this.ResponsibleById = 0
    this.BillStatusId = 0
  }
}
