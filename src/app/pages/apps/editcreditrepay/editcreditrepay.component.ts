import { Component, OnInit, TemplateRef, ViewChild, ElementRef, HostListener } from '@angular/core';
import * as moment from 'moment'
import { FormControl, Validators ,FormBuilder} from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal'
import { NgbModal, ModalDismissReasons, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap'
import { AuthService } from 'src/app/auth.service';
import { NzNotificationService } from 'ng-zorro-antd'
import { merge, Observable, Subject } from 'rxjs';
import { Router , ActivatedRoute} from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Location } from '@angular/common';
import { Transmodule } from './editcreditrepay.module';
import { BillModule } from './editcreditrepay.module';

@Component({
  selector: 'app-editcreditrepay',
  templateUrl: './editcreditrepay.component.html',
  styleUrls: ['./editcreditrepay.component.scss']
})
export class EditcreditrepayComponent implements OnInit {
  transmod: Transmodule
  billList: Array<BillModule> = null
  paymentmode =0;
  OrderedById = 0;
  SuppliedById = 0;
  DispatchById = 0;
  orderDate ='';
  EditCredit:any =[];
  stores :any= [];
  credData:any =[];
  CompanyId = 1;
  OrdId = 0;
  users = [];
  contactId =0;
  contacttype =0;
  paycred =[];
  credit =[];
  AddForm =[];
  // isTable =true;
  isRepay= true
  PaymentTypeId =0;
  description ='';
  creditTypeStatus ='';
  amount =0;
  TransactionId =0;
  // isShown =false; 
  isRepaytable = true
  trans: any = {   amount: 0, creditTypeStatus:"", PaymentTypeId:1, supplier:'',
  description: "", CompanyId: 1,contactId:this.contactId,responsibleById:this.DispatchById,
  storeId:this.SuppliedById, contactType:0,Cname:'',responsibleBy:'',
  TotalBalance:null,
   TransDateTime:moment().format('YYYY-MM-DD HH:MM A'),TransactionId:0,
   TransDate:moment().format('YYYY-MM-DD HH:MM A'),
  CreatedDate:moment().format('YYYY-MM-DD HH:MM A')}

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
    description: null,
    storeid: 0
  }
  
  Contact: any
  testfunid = 0
  contid = 0
  // repay: any
  typid= 0

  test: any = {
    contacttypeId: 0,
    contactId: 0,
    creditid: 0,
    amount: 0,
    paymenttypeid: 0,
    locationid: 0,
    responsiblebyid: 0,
    reference: ''
  }
  recontactId : 0
  StoreId: any

  newdata:any = {
    newlocation: 0,
    newpaytype: 0,
    amount: '',
    description : ''

  }
  repayyy:any = {
    name: '',
    camount: '',
    paymettypeid: 0,
    description: ''
  }
  

  constructor(
    private _fb: FormBuilder ,
    private modalService: NgbModal,
     private Auth: AuthService,
    private notification: NzNotificationService,
    private router: Router ,
    private _avRoute: ActivatedRoute,
    public location: Location )

    {
      this.testfunid = this._avRoute.snapshot.params["id"];
      // this.contid = this._avRoute.snapshot.params["id"];
      this.users = JSON.parse(localStorage.getItem("users"));
     }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'))
    const store = JSON.parse(localStorage.getItem('store'))
    this.transmod = new Transmodule()
    this.CompanyId = user.companyId
    this.StoreId = user.storeid
    // this.getStoreList();
    // this.getTransList();
    // this.getrecustomer()
    this.getcontacttype()
    this.gettotbls()
    this.gettabledata()
  }
  recontact: any
  getcontact() {
    this.Auth.getcontact(this.CompanyId, this.testmaster.contactTypeId).subscribe(data => {
      this.Contact = data
      this.recontact = this.Contact[0].id
      console.log('Contact', this.recontact)
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
  // getrecustomer(){
  //   console.log(this.testfunid)
  //   // this.Auth.saverepay(this.cred).subscribe(data =>{
  //     this.Auth.getrepaycondatabyid(this.testfunid).subscribe(data =>{
  //     this.repay = data['editdata']
  //     console.log(this.repay)
  //     this.testmaster = this.repay[0]
  //     console.log(this.testmaster)
  //   })
  // }
  getTransList()
  {
    this.Auth.getrepaydata(this.CompanyId,this.OrdId).subscribe(data => {
      this.EditCredit = data;
      this.contactId = this.EditCredit.bills[0].contactId
      // this.trans.paymentTypeId = this.EditCredit.bills.paymentType.description
      // this.trans.contacttype = this.EditCredit.bills.contactTypeId
      this.SuppliedById = this.EditCredit.bills[0].providerId
      // this.description = this.EditCredit.bills.description;
      // this.creditTypeStatus = this.EditCredit.creditTypeStr;
      this.DispatchById =  this.EditCredit.responsibleById;
      // this.trans.amount = this.EditCredit.bills[0].pendAmount;
    //  this.trans.description = this.EditCredit.bills.description;
    //  this.trans.supplier = this.EditCredit.bills.store.name;
     this.trans.contact = this.EditCredit.bills[0].contact.name;
    //  this.TransactionId = this.EditCredit.bills.transactionId;
          console.log("EditCredit",this.EditCredit)
          for (let i = 0; i < this.EditCredit.bills.length; i++) {
            this.trans.TotalBalance = this.trans.TotalBalance + this.EditCredit.bills[i].pendAmount;
            this.trans.amount = this.trans.amount + this.EditCredit.bills[i].pendAmount;
          }
      })
  }
  selectedcontactitem(item) {
    console.log("item", item);
    this.contactId = item.id;
  }

  searchcontact = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    map(term => term === '' ? []
      : this.stores.cusList.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )

formattercontact = (x: { name: string }) => x.name;


  getStoreList() {
    this.Auth.getstores(this.CompanyId).subscribe(data => {
      this.stores = data;
      console.log("stores",this.stores)
      })
  }

//   recStatus(Value)
//   {
//     console.log("rec",Value)
// this.paymentmode =Value;
//   }
//   creditStatus(Val)
//   {
//     console.log("credit",Val)
//     this.creditStatus = Val;
//   }
  onChange(e) {
    console.log('date', e)
    this.orderDate = e
  }
  date = new Date()
  onChangetime(e) {
    console.log(e, moment(e), this.date)
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

Updatecredit()
{
  this.paycred.push({
    CompanyId:this.CompanyId,
    ContactId:this.contactId,
     UserId:this.users[0].id,
     ResponsibleById:this.DispatchById,
     ContactType:this.contacttype,
    CreditType:this.creditTypeStatus,
    StoreId:this.SuppliedById,    
    ProviderId:this.SuppliedById,       
    Amount:this.trans.amount,
    Description:this.trans.description,
    TransDate:moment().format('YYYY-MM-DD HH:MM A'),
    CreatedDate:moment().format('YYYY-MM-DD HH:MM A'),
    TransDateTime:moment().format('YYYY-MM-DD HH:MM A'),
    PaymentTypeId:1,
    PaymentStatusId:2,
    TranstypeId:8,
    TransModeId:8,
    TransactionId:this.TransactionId,
  })
  this.Auth.UpdCredit(this.paycred).subscribe(data => {
    console.log(data)
  })
  this.router.navigate(['/apps/credit']);
}
goback()
{
  this.router.navigate(['/apps/credit/']);
}

//Queen
// contactchange(Value)
// {
//   console.log("rec",Value)
//  this.typid = Value;
// }
newpaytype: any
getpaymenttype(value){
  console.log('newpaytype', value)
  this.newdata.newpaytype = value
}
getpaymentfun(){
  console.log('newamount', this.repayyy.amount)
}
// newlocation: 0
getlocationfun(value){
  console.log('newlocation', value)
  this.newdata.newlocation = value
}
getreferencefun() {
  console.log('description', this.repayyy.description)
}


CreditDatatestt:any
quentest: any
getreCreditData() {
  this.Auth.getrepayIndex(this.CompanyId).subscribe(data => {
    this.quentest = data
    this.CreditDatatestt = data['creditRepayData']
    // this.tabledata = this.CreditDatatest
    console.log(this.quentest)
    console.log(this.CreditDatatestt)
    // this.isShown = true
  }) 
};
bill : BillModule 
savedata: any
totalpaidamount: any
saverepaydata(){
  this.transmod.TransactionId = this.testfunid
  this.transmod.CompanyId = this.CompanyId
  this.transmod.ContactId = this.testmaster.id,
  this.transmod.PaymentTypeId = this.repayyy.paymettypeid,
  this.transmod.Amount = this.repayyy.camount,
  this.transmod.Description = this.repayyy.description,
  this.transmod.StoreId = this.repayyy.storeid,
  this.totalpaidamount = this.repayyy.camount
  // console.log(this.totalpaidamount)
  var bill = new BillModule(this.transmod.ContactId, this.totalpaidamount)
 
  bill.BillId = this.repay[0].billId,
  bill.BillDate = this.repay[0].billDate,
  bill.BillAmount = this.repay[0].billAmount, 
  bill.ReceiverId = this.transmod.ContactId,
  bill.CreatedDate = moment().format('YYYY-MM-DD HH:MM A')
  bill.CreditTypeStr = this.testmaster.creditType
  if(bill.BillAmount == bill.PaidAmount){
    bill.IsPaid = true
  }
  else{
    bill.IsPaid = false
  }
  if(bill.BillAmount == bill.PaidAmount && bill.PaidAmount != 0){
    bill.BillStatusId = 3
  }
  else{
    bill.BillStatusId = 2
  }
  this.bill = bill
  this.transmod.Bill = this.bill
  console.log(this.transmod)
  this.Auth.saveeditdata(this.transmod).subscribe(data =>{
    this.savedata = data
    console.log(this.savedata)
  })
  this.router.navigate(['/apps/credit/']);
}
totabls: any
totalbls = 0
gettotbls(){
  // this.Auth.saverepay(this.cred).subscribe(data =>{
  this.Auth.geteditcontbyid(this.testfunid).subscribe(data =>{
    this.totabls = data['bls']
    console.log(this.totabls)
    this.totalbls = this.totabls[0].totbls
    console.log(this.totalbls)
  })
  // this.sumofrepay()
}

// repayyy:any = {
//   name: '',
//   camount: ''
// }
repay: any
cname: any
camount: ''
ref: any
bildate: any
gettabledata(){
  this.Auth.getrepaycondatabyid(this.testfunid).subscribe(data =>{
    this.repay = data['editdata']
    this.cname = this.repay[0].name
    this.repayyy.camount = this.repay[0].amount
    this.repayyy.paymettypeid = this.repay[0].paymentTypeId
    this.repayyy.storeid = this.repay[0].storeId
    this.repayyy.description = this.repay[0].description
    // this.ref = this.repay[0].description
    // this.bildate = this.repay[0].billDate
    console.log(this.repay)
    // console.log(this.cname)
  })
} 
}
