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
  selector: 'app-creditdetails',
  templateUrl: './creditdetails.component.html',
  styleUrls: ['./creditdetails.component.scss']
})
export class CreditdetailsComponent implements OnInit {
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
  isdetail = true
  PaymentTypeId =0;
  description ='';
  creditTypeStatus ='';
  amount =0;
  TransactionId =0;
  isShown =false; 
  trans: any = {   amount: 0, creditTypeStatus:"", PaymentTypeId:1, supplier:'',
  description: "", CompanyId: 1,contactId:this.contactId,responsibleById:this.DispatchById,
  storeId:this.SuppliedById, contactType:0,contact:'',responsibleBy:'',
   TransDateTime:moment().format('YYYY-MM-DD HH:MM A'),TransactionId:0,
   TransDate:moment().format('YYYY-MM-DD HH:MM A'),
  CreatedDate:moment().format('YYYY-MM-DD HH:MM A')}

  //queen
  repay: any 
  testmaster: any ={
    name: '',
    amount: '',
    // billAmount: '',
    // billId: 0,
    contacttype: '',
    // contactTypeId: 0,
    credittype: 0 ,
    // id: 0,
    // paidAmount: '',
    paymenttype: '',
    // paymentTypeId: 0,
    store: '',
    responsible: 0,
    description: ''
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
  testfunid = 0


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
    // this.GetInputdata()
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
  responsbile: any
  response: any = {
    responsibleById: 0
  }
  getrecustomer(){
    console.log(this.testfunid)
    // this.Auth.saverepay(this.cred).subscribe(data =>{
      this.Auth.getcreditdetail(this.testfunid).subscribe(data =>{
      this.repay = data['detail']
      console.log(this.repay)
      this.testmaster = this.repay[0]
      console.log(this.testmaster)
      this.responsbile = data['responsbileby']
      console.log(this.responsbile)
      this.response = this.responsbile[0]
      console.log(this.response)
    })
  } 

 
  getTransList()
  {
    this.credData.push({
      companyId:this.CompanyId,
      id:this.OrdId
    })  
    this.Auth.getTransdata(this.credData).subscribe(data => {
      this.EditCredit = data;
      console.log("EditCredit",this.EditCredit)
      this.contactId = this.EditCredit.trans[0].contact.id;
       this.trans.paymentTypeId = this.EditCredit.trans[0].paymentType.description
      this.trans.contacttype = this.EditCredit.trans[0].contactTypeId
      this.SuppliedById = this.EditCredit.trans[0].storeId
       this.description = this.EditCredit.trans[0].description;
      this.creditTypeStatus = this.EditCredit.creditTypeStr;
      this.DispatchById =  this.EditCredit.responsibleById;
      this.trans.amount = this.EditCredit.trans[0].amount;
     this.trans.description = this.EditCredit.trans[0].description;
     this.trans.supplier = this.EditCredit.trans[0].store.name;
     this.trans.contact = this.EditCredit.trans[0].contact.name;
     this.TransactionId = this.EditCredit.trans[0].transactionId;
      console.log("EditCredit",this.EditCredit)
      })
  }
  onChange(e) {
    console.log("date",e);
    this.orderDate =e;
  }
  locback()
{
  this.router.navigate(['/apps/credit/']);
}

}
