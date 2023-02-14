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
import { Transmodule } from './billbyvendor.module';
import { BillModule } from './billbyvendor.module';

@Component({
  selector: 'app-billbyvendor',
  templateUrl: './billbyvendor.component.html',
  styleUrls: ['./billbyvendor.component.scss']
})
export class BillbyvendorComponent implements OnInit {

  transmod: Transmodule
  billList: Array<BillModule> = null
  vendors:any =[];
  stores:any =[];
  paymentTypes:any =[];
  users = [];
  isShown = true;
  isTable =false;
  vendorId : any;
  venid= null
  SuppliedById = null;
  CompanyId =1;
  paycred =[];
  numRecords =50;
  type ='';
  items:any =[];
  bankAccountId = null;
  accTypeId =null;
  isActive = true;
  label = false;
  term: string = '';

  Ordprd =[];
  bankName ="";
accountData:any =[];
  vendor: any = 
  {  name:'',
    amount: null, 
    creditTypeStatus:"", 
    PaymentTypeId:1, 
    accountNo:null,
    Description: "", 
    CompanyId: 1,
    balance:null,
    billDate:'',
    billId:null,
    pay:null,
    // storeId:this.SuppliedById, 
    contactType:0,
    contactId:null,
    TransDateTime:moment().format('YYYY-MM-DD HH:MM A'),
    TransDate:moment().format('YYYY-MM-DD HH:MM\ A'),
    CreatedDate:moment().format('YYYY-MM-DD HH:MM A')
  }

  test: any ={
    paymenttypeid: 0,
    payment: '',
    reference: '',
    transdate: moment().format('YYYY-MM-DD HH:MM A')
  }

  vendorlist: any
  pytstoreid: any
  billdata: any 
  demo: any



  constructor(
  private modalService: NgbModal,
  private Auth: AuthService,
  private notification: NzNotificationService,
  private router: Router ,
  private route: ActivatedRoute,
  public location: Location )
     { 
      this.users = JSON.parse(localStorage.getItem("users"));

    }
    StoreId: any
    totalbls = null
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'))
    const store = JSON.parse(localStorage.getItem('store'))
    this.transmod = new Transmodule()
    this.CompanyId = user.companyId
    this.StoreId = user.storeid
    // this.getvendorList();
    this.getStoreList();
    this.getPaymentTypesList();
    this.getBankAccts();
    //queen
    this.getvendor();
    // this.getbill()
    // this.gettotbls()
  }

  //queen
  date = new Date()
  onChangetime(e) {
    console.log(e, moment(e), this.date)
  } 
  getvendor(){
    this.Auth.getvendorserach(this.CompanyId).subscribe(data => {
      this.vendorlist = data['vendor']
      console.log(this.vendorlist)
    }) 
  }
  //

  getStoreList() {
    this.Auth.getstores(this.CompanyId).subscribe(data => {
      this.stores = data;
      console.log("stores",this.stores)
      })
  }

  // getvendorList() {
  //   this.Auth.getvendors(this.CompanyId).subscribe(data => {
  //     this.vendors = data;
  //     this.filteredvalues =this.vendors.value.billList;
  //     console.log("vendors",this.vendors)
  //     })
  // }
  // filteredvalues = [];
  // filtersearch(): void {
  //   this.filteredvalues = this.term
  //     ? this.vendors.value.billList.filter(x => x.provider.toLowerCase().includes(this.term.toLowerCase()))
  //     : this.vendors;
  //   console.log("filtered values",this.filteredvalues)
  // }


  getPaymentTypesList() {
    this.Auth.PaymentTypesList(this.CompanyId).subscribe(data => {
      this.paymentTypes = data;
      console.log("paymentTypes", this.paymentTypes)
    })
  }
  getBankAccts()
{
  this.Ordprd.push({
    companyId:this.CompanyId,
    numRecords:this.numRecords,
    bankAccountId:this.bankAccountId,
    accTypeId:this.accTypeId,
    isActive:this.isActive,
    bankName:this.bankName
  })
  this.Auth.getbankaccount(this.Ordprd).subscribe(data => {
    this.accountData = data;
    console.log("accountData",this.accountData)
  })
}
 
  updquery()
  {
    this.vendors.value.bills.forEach(element => {
      element["pay"] = this.vendor.amount;                                                                                                                                                     
    }) 
    console.log("paymentTypes", this.items) 
  }
  paymttype()
  {
  if(this.vendor.PaymentTypeId =="2")
  {
    this.label = true;
  }
  }
  
  Submit()
  {
    this.paycred.push({
      companyId:this.CompanyId,
trans:this.vendor,
creditArr:this.items,
type :this.type,
UserId:this.users[0].id
    })
    console.log("data",this.paycred)
    this.Auth.billpay(this.paycred).subscribe(data => {
      console.log(data)
      this.isShown =  !this.isShown;
      this.isTable =  !this.isTable;
    })
  }
  selectedvendoritem(item) {
    console.log("item", item);
    this.venid = item.id
    this.vendorId = this.venid;
    this.isShown = this.isShown
    this.isTable = !this.isTable
    console.log(this.vendorId)
    this.getbill()
    this.gettotbls()
  } 
  // searchvendor = (text$: Observable<string>) =>
  //   text$.pipe(
  //      debounceTime(200),
  //     map(term => term === '' ? []
  //       : this.vendors.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  //   )
  searchvendor = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    map(term =>
      term === ''
        ? []
        : this.vendorlist
          .filter(s => s.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
          .slice(0, 10),
    ),
  )

  formattervendor = (x: { name: string }) => x.name; 

  selectedsupplieritem(item) {
    console.log("item",item);
    this.SuppliedById =item.id;
    // this.getbilldetails(item.id,this.vendorId)
    this.pytstoreid = this.SuppliedById
    this.getbill()
    this.gettotbls()
  } 


  getbilldetails(Id,vendorId)
  {
    this.isTable = !this.isTable;
    this.isShown = !this.isShown;
    console.log("item",Id,vendorId);
    this.Auth.getbillnpays(Id,vendorId).subscribe(data => {
      this.vendors = data;
      console.log("vendors",this.vendors)
      this.vendor.Description = this.vendors.value.billList[0].contact.name;
      // this.vendor.amount = this.vendors.value.billList[0].amount;
      this.vendor.balance = this.vendors.value.balance;
      this.vendor.billDate = this.vendors.value.billList[0].billDate;
       this.vendor.name = this.vendors.value.paymentStore;
       this.vendor.storeId = this.vendors.value.bills[0].storeId
       this.items = this.vendors.value.bills;
       this.vendor.contactId = this.vendors.value.contactId;
       this.vendor.billId = this.vendors.value.bills[0].billId;
       this.vendors.value.bills.forEach(element => {
         element["pay"] = this.vendor.amount; 
         element["BillId"] = this.vendor.billId;                                                                                                                                                          
       })  
      console.log("vendors",this.vendors)
      })
  }
  searchsupplier = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.stores.storeList.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  formattersupplier = (x: { name: string }) => x.name;

  //queen
mastertest : any
  getpaymenttypeid(){

    console.log('PaymentType', this.test.payment)
    this.mastertest = this.test.payment
    console.log(this.mastertest)
  }
  paidamt: any
  getbill(){
    // console.log("BillData", CompanyId, venid, pytstoreid)
    this.Auth.getbilldatabyid(this.CompanyId, this.venid, this.pytstoreid).subscribe(data => {
      this.billdata = data['bill']
      // this.paidamt = this.billdata[0].paidAmount
      // console.log(this.paidamt)
      console.log(this.billdata)
    }) 
  }
  validationrepay() {
    var isvalid = true
    // if (this.recontactId == 0) isvalid = false
    if (this.test.payment == 0) isvalid = false
    if (this.test.paymenttypeid == 0) isvalid = false
    if (this.test.locationid == 0) isvalid = false
    return isvalid
  }

  totabls: any = 0
  gettotbls() {
    // console.log("BlsData", CompanyId, venid, pytstoreid)
    // this.Auth.saverepay(this.cred).subscribe(data =>{
    this.Auth.getbilldatabyid(this.CompanyId,this.venid, this.pytstoreid).subscribe(data => {
      this.totabls = data['bls']
      this.totalbls = this.totabls[0].totbls
      console.log(this.totalbls)
    })
    // this.sumofrepay()
  }
  submitted: boolean = false
  bill: BillModule
  savedata: any
  totalpaidamount: any
  testpayment: any
  saverepaydata() {
    this.submitted = true
    if (this.validationrepay()) {
    this.transmod.CompanyId = this.CompanyId
    this.transmod.ContactId = this.vendorId,
    this.transmod.PaymentTypeId = this.test.paymenttypeid,
    this.transmod.Amount = this.test.payment,
    this.transmod.Description = this.test.reference,
    this.transmod.StoreId = this.StoreId
    this.transmod.CreditTypeId = this.test.creditid
    this.transmod.TransDate = this.test.transdate
    this.testpayment = this.billdata[0].paidAmount
    console.log(this.testpayment)
    this.totalpaidamount = this.paidamt + this.mastertest
    console.log(this.totalpaidamount)
    var bill = new BillModule(this.transmod.ContactId, this.totalpaidamount)
    bill.BillId = this.billdata[0].billId,
    bill.BillDate = this.billdata[0].billDate,
    bill.BillAmount = this.billdata[0].billAmount,
    console.log(this.totalpaidamount)
      // bill.PaidAmount = this.repay[0].paidAmount + this.test.payment,
    // console.log("Already Payed", this.alreadypaidamt)
    // console.log("New Pay", this.test.payment)
    // console.log("TotAL pAID", this.bill.PaidAmount)
    // console.log(this.bill.PaidAmount)
    // console.log(this.test.payment)
    bill.ReceiverId = this.transmod.ContactId,
      bill.CreatedDate = moment().format('YYYY-MM-DD HH:MM A')
    if (bill.BillAmount == bill.PaidAmount) {
      bill.IsPaid = true
    }
    else {
      bill.IsPaid = false
    }
    if (bill.BillAmount == bill.PaidAmount) {
      bill.BillStatusId = 3
    }
    else {
      bill.BillStatusId = 2
    }
    this.bill = bill
    this.transmod.Bill = this.bill
    // console.log(this.transmod)
    // this.Auth.saverepay(this.transmod).subscribe(data => {
    //   this.savedata = data
    //   console.log(this.savedata)
    // })
    console.log('vendid',this.vendorId)
    this.test.payment = null
    this.test.reference = null
    this.vendorId = null
    this.SuppliedById = null
    this.test.paymenttypeid =null
    this.isTable = !this.isTable 
    // window.location.reload();

  }else{
    this.notification.error('Error', 'Check All Data')
  }
    // this.getreCreditData()
  }


}
