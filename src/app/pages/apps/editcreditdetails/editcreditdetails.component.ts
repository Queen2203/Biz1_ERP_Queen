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
  selector: 'app-editcreditdetails',
  templateUrl: './editcreditdetails.component.html',
  styleUrls: ['./editcreditdetails.component.scss']
})
export class EditcreditdetailsComponent implements OnInit {
  paymentmode =0;
  OrderedById = 0;
  SuppliedById = 0;
  DispatchById = 0;
  orderDate ='';
  EditCredit:any =[];
  stores :any= [];
  credData:any =[];
  CompanyId =1;
  OrdId = 0;
  users = [];
  contactId =0;
  contacttype =0;
  paycred =[];
  credit =[];
  AddForm =[];
  // isTable =true;
  PaymentTypeId =0;
  description ='';
  creditTypeStatus ='';
  amount =0;
  TransactionId =0;
  // isShown =false; 
  isRepay = true
  isRepaytable = true
  trans: any = {   amount: 0, creditTypeStatus:"", PaymentTypeId:1, supplier:'',
  description: "", CompanyId: 1,contactId:this.contactId,responsibleById:this.DispatchById,
  storeId:this.SuppliedById, contactType:0,Cname:'',responsibleBy:'',
   TransDateTime:moment().format('YYYY-MM-DD HH:MM A'),TransactionId:0,
   TransDate:moment().format('YYYY-MM-DD HH:MM A'),
  CreatedDate:moment().format('YYYY-MM-DD HH:MM A')}

  //queen
  repay: any 
  testmaster: any ={
    name: '',
    billAmount: '',
    billId: 0,
    contactType: '',
    contactTypeId: 0,
    creditTypeId: 0 ,
    id: 0,
    // paidAmount: '',
    paymentType: '',
    paymentTypeId: 0,
    store: ''
  }
  isedit= true
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

testfunid= 0
  constructor(
    private modalService: NgbModal,
     private Auth: AuthService,
    private notification: NzNotificationService,
    private router: Router ,
    private _avRoute: ActivatedRoute,
    public location: Location )

    {
      this.testfunid = this._avRoute.snapshot.params["id"];
      this.users = JSON.parse(localStorage.getItem("users"));
  
     }


  ngOnInit(): void {
    // this.getTransList();
    this.getrecustomer()
    this.getcontacttype()
    this.gettotbls()
  }
  getTransList()
  {
    this.credData.push({
      companyId:this.CompanyId,
      id:this.OrdId
    })  
    this.Auth.getTransdata(this.credData).subscribe(data => {
      this.EditCredit = data;
      this.contactId = this.EditCredit.trans[0].contactId
      this.trans.paymentTypeId = this.EditCredit.trans[0].paymentType.description
      this.trans.contacttype = this.EditCredit.trans[0].contactTypeId
      this.SuppliedById = this.EditCredit.trans[0].storeId
      this.description = this.EditCredit.trans[0].description;
      this.creditTypeStatus = this.EditCredit.creditTypeStr;
      this.DispatchById =  this.EditCredit.responsibleById;
      this.trans.amount = this.EditCredit.trans[0].amount;
     this.trans.description = this.EditCredit.trans[0].description;
     this.trans.supplier = this.EditCredit.trans[0].store.name;
     this.trans.name = this.EditCredit.trans[0].name;
     this.TransactionId = this.EditCredit.trans[0].transactionId;
      console.log("EditCredit",this.EditCredit)
      })
  }
  onChange(e) {
    console.log("date",e);
    this.orderDate =e;
  }

   //queen
   GetInputdata(){
    this.Auth.getinputdata(this.CompanyId).subscribe(data => {
      this.inputvalue = data
      console.log('inputvalue', this.inputvalue)
    })
  } 
  getcontact() {
    this.Auth.getcontact(this.CompanyId, this.test.contacttypeId).subscribe(data => {
      this.Contact = data
      console.log('Contact', this.Contact)
    })
  }
  tname: ''
  // testmaster : string
  getrecustomer(){
    console.log(this.testfunid)
    // this.Auth.saverepay(this.cred).subscribe(data =>{
      this.Auth.getrepaycondatabyid(this.testfunid).subscribe(data =>{
      this.repay = data['editdata']
      console.log(this.repay)
      this.testmaster = this.repay[0]
      console.log(this.testmaster)
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
  newpaytype: any
  getpaymenttype(value){
    console.log('newpaytype', value)
    this.newpaytype = value
  }
  getpaymentfun(){
    console.log('newamount', this.testmaster.amount)
  }
  newlocation: any
  getlocationfun(value){
    console.log('newlocation', value)
    this.newlocation = value
  }
  getreferencefun() {
    console.log('description', this.testmaster.description)
  }
  locback()
{
  this.router.navigate(['/apps/credit/']);
}
}
