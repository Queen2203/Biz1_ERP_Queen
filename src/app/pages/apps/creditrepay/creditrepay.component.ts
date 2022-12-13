import { Component, OnInit, TemplateRef, ViewChild, ElementRef, HostListener } from '@angular/core';
import * as moment from 'moment'
import { FormControl, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal'
import { NgbModal, ModalDismissReasons, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap'
import { AuthService } from 'src/app/auth.service';
import { NzNotificationService } from 'ng-zorro-antd'
import { merge, Observable, Subject } from 'rxjs';
import { Router , ActivatedRoute} from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Location } from '@angular/common';

@Component({
  selector: 'app-creditrepay',
  templateUrl: './creditrepay.component.html',
  styleUrls: ['./creditrepay.component.scss']
})
export class CreditrepayComponent implements OnInit {
  // isShown = true;
  // isTable =false;
  users = [];
  CompanyId =1;
  stores :any= [];
  creditData: any =[];
  billstatus = 'ALL';
  transtype =2;
  numRecords = 50;
  ordId =0;
  Ordprd:any =[];
  OrderedById = 0;
  SuppliedById = 0;
  Accountdata =0;
  DispatchById = 0;
  contactId =0;
  orderDate =''; 
  paymentmode =2;
  creditTypeStatus =" ";                                                                                                        
  contacttype =2;
  paycred =[];
  amt =400;
  NewArr:any =[];
  EditCredit:any =[];
  credData:any =[];
  OrdId = 0;
  transactionId = null;
  credit =[];
  repayInf:any =[];
  // trans =[];
  trans: any = {   amount: 0, creditTypeStatus:"", PaymentTypeId: '', 
  Description: "", CompanyId: 1,contactId:this.contactId,responsibleById:this.DispatchById,
  storeId:this.SuppliedById, contactType:0,
   TransDateTime:moment().format('YYYY-MM-DD HH:MM A'),
   TransDate:moment().format('YYYY-MM-DD HH:MM\ A'),
  CreatedDate:moment().format('YYYY-MM-DD HH:MM A')}
    // contactId:this.contactId,
    // responsibleById:this.DispatchById, contactType:this.contacttype,
    isRepay = true
    isRepaytable = true
    inputvalue: any
    Contact: any
    Contactt: any 
    cred: any = 
    {
      recontactId : 0
    }
    test: any = {
      contacttypeId: 0,
      contactId: 0,
      creditid: 0,
      payment: '',
      paymenttypeid: 0,
      locationid: 0,
      responsiblebyid: 0,
      reference: ''
    }
    temp:any ={
      tempid: ''
    }
    repay: any 

    //queen
  testmaster: any ={
    name: '',
    amount: null,
    // billId: 0,
    contactType: '',
    contactTypeId: 0,
    creditTypeId: 0 ,
    creditType: '',
    id: 0,
    // paidAmount: '',
    paymentType: '',
    paymentTypeId: 0,
    storeId: 0,
    store: '',
    description: null
  }
  testfunid = 0


  constructor(
    private modalService: NgbModal,
     private Auth: AuthService,
    private notification: NzNotificationService,
    private router: Router,
    private _avRoute: ActivatedRoute,
    // private route: ActivatedRoute,
    public location: Location )
     { 
      this.testfunid = this._avRoute.snapshot.params["id"];
      this.users = JSON.parse(localStorage.getItem("users"));

    }

  ngOnInit(): void {
    // this.getStoreList();
    //  this.getcreditrepayData();
    this.getrecustomer()
    this.GetInputdata()
    this.getcontacttype()
  }

  //Queen
  GetInputdata(){
    this.Auth.getinputdata(this.CompanyId).subscribe(data => {
      this.inputvalue = data
      console.log('inputvalue', this.inputvalue)
    })
  } 
  getcontact() {
    this.Auth.getcontact(this.CompanyId, this.testmaster.contactTypeId).subscribe(data => {
      this.Contact = data
      console.log('Contact', this.Contact)
    })
  }
  conty: any
  crety: any
  payty: any
  stor: any 
  getcontacttype(){
    this.Auth.getinputdata(this.CompanyId).subscribe(data =>{
      this.conty = data['contactType']
      this.crety = data['creditType']
      this.payty = data['paymentType']
      this.stor = data['store']
      this.testmaster.contactTypeId = this.conty[0].id
      this.testmaster.creditTypeId = this.crety[0].id
      this.testmaster.paymentTypeId = this.payty[0].id
      this.testmaster.storeId = this.stor[0].id
      // console.log('testcon',  this.testcon)
      console.log('contactTypeId', this.testmaster.contactTypeId)
    })
    this.getcontact()
  }
  tname: ''
  // testmaster : string
  getrecustomer(){
    console.log(this.testfunid)
    // this.Auth.saverepay(this.cred).subscribe(data =>{
      this.Auth.getdatabyid(this.testfunid).subscribe(data =>{
      this.repay = data['editdata']
      console.log(this.repay)
      this.testmaster = this.repay[0]
      console.log(this.testmaster)
    })
  }

  totabls: any
  totalbls=0
  gettotbls(){
    // this.Auth.saverepay(this.cred).subscribe(data =>{
    this.Auth.getdatabyid(this.testfunid).subscribe(data =>{
      this.totabls = data['bls']
      this.totalbls = this.totabls[0].totbls
      console.log(this.totalbls)
    })
    // this.sumofrepay()
  }


  getStoreList() {
    this.Auth.getstores(this.CompanyId).subscribe(data => {
      this.stores = data;
      console.log("stores",this.stores)
      })
  }
  getcreditrepayData() {
    var x = new Date();
    x.setDate(1);
    x.setMonth(x.getMonth() - 1);
    console.log("fromdate",x)
    // console.log("fromdate",x.setMonth(x.getMonth() - 1))
    this.Ordprd.push({
      companyId:this.CompanyId,
      searchId:this.ordId,
       UserID:this.users[0].id,
       transtype:this.transtype,
       transactionId:this.transactionId,
      numRecords:this.numRecords,
      dateFrom:x
    })
    // console.log("billstatus",this.billstatus)
    this.Auth.getCreditrepaydata(this.Ordprd).subscribe(data => {
      this.creditData = data;
      console.log("creditData",this.creditData)
    })
  }
  Deletedata(id)
  {
    this.NewArr.push({
      companyId:this.CompanyId,
      TransactionId:id
    })
    this.Auth.deleteCredit(this.NewArr).subscribe(data => {
      console.log("delete",data)
      })
    
  }
  // getTransList(id)
  // {
  //   this.isShown =  !this.isShown;
  //   this.isTable =  !this.isTable;
  //   this.credData.push({
  //     companyId:this.CompanyId,
  //     id:id
  //   })
  //   this.Auth.getTransdata(this.credData).subscribe(data => {
  //     this.trans = data;
  //     console.log("EditCredit",this.trans)
  //     })
  // }

  Billstatus(val)
  {
    console.log("val",val)
    this.billstatus =val;
    //  this.getcreditrepayData();
  }  
  // locback()
  // {
  //   this.isShown =  !this.isShown;
  //   this.isTable =  !this.isTable;

  // }
  onChange(e) {
    console.log("date",e);
    this.orderDate =e;
  }

  selecteddispatchitem(item) {
    console.log("item", item);
    this.DispatchById = item.id;
  }
  searchdispatch = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.stores.cusList.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  formatterdispatch = (x: { name: string }) => x.name;

  selectedcontactitem(item) {
    console.log("item", item);
    this.contactId = item.id;
    this.credits(item.id);
  }
  credits(Id)
  {
    this.Auth.getrepaydata(this.CompanyId,Id).subscribe(data => {
      this.repayInf = data;
      console.log("repayInf",this.repayInf)
      })
 
  }
  searchcontact = (text$: Observable<string>) =>
    text$.pipe(
       debounceTime(200),
      map(term => term === '' ? []
        : this.stores.cusList.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  formattercontact = (x: { name: string }) => x.name;

  selectedsupplieritem(item) {
    console.log("item",item);
    this.SuppliedById =item.id;
  }
  searchsupplier = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.stores.storeList.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  formattersupplier = (x: { name: string }) => x.name;
  selectedaccountitem(item) {
    console.log("item",item);
    this.Accountdata =item.id;
  }
  searchBankAccount = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    map(term => term === '' ? []
      : this.stores.bankAcct.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )

formatteraccount = (x: { name: string }) => x.name;

  recStatus(Value)
  {
    console.log("rec",Value)
this.paymentmode =Value;
  }
  creditStatus(Val)
  {
    console.log("credit",Val)
    this.creditTypeStatus = Val;
  }
 
  Submit()
  {
    this.paycred.push({
      CompanyId:this.CompanyId,
      ContactId:this.contactId,
       UserId:this.users[0].id,
       ResponsibleById:this.DispatchById,
       ContactType:this.contacttype,
      CreditType:this.trans.creditTypeStatus,
      StoreId:this.SuppliedById,
      ProviderId:this.SuppliedById,       
      Amount:this.trans.amount,
      Description:this.trans.description,
      TransDate:moment().format('YYYY-MM-DD HH:MM A'),
      CreatedDate:moment().format('YYYY-MM-DD HH:MM A'),
      TransDateTime:moment().format('YYYY-MM-DD HH:MM A'),
      PaymentTypeId:1,
      PaymentStatusId:2,
      TranstypeId:2
    })
    this.Auth.Creditpay(this.paycred).subscribe(data => {
      console.log(data)
      // this.isShown =  !this.isShown;
      // this.isTable =  !this.isTable;
      // this.getcreditrepayData();
    })
  }
  contactType(val)
  {
    this.contacttype = val;
  }
  Delete(Id)
  {
    this.paycred.push({
      transactionId:Id,
      companyId:this.CompanyId
    })
    this.Auth.DeleteCreditpay(this.paycred).subscribe(data => {
      console.log(data)
    }) 
  }
}
      