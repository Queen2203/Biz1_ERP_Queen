import { Component, OnInit, TemplateRef, ViewChild, ElementRef, HostListener } from '@angular/core'
import * as moment from 'moment'
import { FormControl, Validators } from '@angular/forms'
import { NzModalService } from 'ng-zorro-antd/modal'
import { NgbModal, ModalDismissReasons, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap'
import { AuthService } from 'src/app/auth.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { merge, Observable, Subject } from 'rxjs'
import { Router, ActivatedRoute } from '@angular/router'
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast'
import { Location } from '@angular/common'
import { Transmodule } from 'src/app/pages/apps/credit/credit.module'
import {
  NzPlacementType,
  NzContextMenuService,
  NzDropdownMenuComponent,
} from 'ng-zorro-antd/dropdown'
import { id } from 'date-fns/locale'


@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.scss'],
})
export class CreditComponent implements OnInit {
  // order: OrderModule
  transmod: Transmodule
  isIndex = true
  isShown = false
  isTable = false
  users = []
  CompanyId: any
  isRepay = false
  term: string = ''
  items = []
  isActive = false
  label = false
  isEdit = false
  isRepaymain = false
  isRepaytable = false
  isedit = false
  orderDate = ''
  closeResult = ''
  CreditDatatest: any
  tabledata: []
  billstatus: any
  BillStatus: any= 0
  billstatusid: any = null

 
  //Queen
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
  Test: 'Hi'
 
  //temp
  trans: any ={

  }

  StoreId: any
  // contactId:this.contactId,
  // responsibleById:this.DispatchById, contactType:this.contacttype,
  constructor(
    private modalService: NgbModal,
    private Auth: AuthService,
    private notification: NzNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    public location: Location,
    private nzContextMenuService: NzContextMenuService,
  ) {
    this.users = JSON.parse(localStorage.getItem('users'))
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'))
    const store = JSON.parse(localStorage.getItem('store'))
    this.transmod = new Transmodule()
    this.CompanyId = user.companyId
    this.StoreId = user.storeid
    this.getCreditData()
    this.GetInputdata()
    this.getbstatus()
    this.getreCreditData()
    this.temprfun()
    // this.getrepaycontact()
    // this.getrecustomer()
  }
  // reloadCurrentPage() {
  //   window.location.reload();
  //  }
credi: any
name: ''
  temprfun(){
    this.Auth.getCredit(this.CompanyId, 2).subscribe(data => {
      this.credi = data['creditdatatest']
      this.name = this.credi[0].name
      console.log(this.name)
    })
  }

 
  //Queen
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
  // getrepaycontact(){
  //   this.Auth.getconforrep(this.CompanyId).subscribe(data =>{
  //     this.Contactt = data
  //     console.log('Contactt', this.Contactt)
  //   })
  // }
  getbstatus(){
    this.Auth.getbillstatus(this.CompanyId).subscribe(data =>{
      this.BillStatus = data
      console.log('BillStatus', this.BillStatus)
    })
  }
  // ContactType
  selectedcontacttype(item) {
    this.test.contacttypeId = item.id
    console.log('contacttypeId', this.test.contacttypeId)
    this.getcontact()
  }
  searchcontacttype = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    map(term =>
      term === ''
        ? []
        : this.inputvalue.contactType
          .filter(s => s.description.toLowerCase().indexOf(term.toLowerCase()) > -1)
          .slice(0, 10),
    ),
  ) 

  formattercontacttype = (x: { description: string }) => x.description

  // contacttypeId: 0
  // contacttypeid() {
  //   console.log('contactType', this.test.contacttypeId);
  //   this.getcontact()
  // }

  // contactType(val) {
  //   console.log('contacttype', val)
  //   this.contacttypeId = val
  // }

  //Contact
  selectedcontact(item) {
    this.test.contactId = item.id
    console.log('contactId', this.test.contactId)
  }
  searchcontact = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    map(term =>
      term === ''
        ? []
        : this.Contact
          .filter(s => s.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
          .slice(0, 10),
    ),
  ) 

  formattercontact = (x: { name: string }) => x.name


  //repaycontact
  recontactId: any
  selectedrecontact(item) {
    this.recontactId = item.contactId
      console.log('recontactId', this.recontactId)
      this.cred.recontactId = this.recontactId
      this.temp.tempid = item
      console.log(this.cred)
      console.log(this.temp.tempid)
      this.getrecustomer()
  }
  searchrecontact = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    map(term =>
      term === ''
        ? []
        : this.CreditDatatestt
          .filter(s => s.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
          .slice(0, 10),
    ),
  ) 

  formatterrecontact = (x: { name: string }) => x.name

  //CreditType
  selectedcredit(item) {
    this.test.creditid = item.id
    console.log('creditid', this.test.creditid)
  }
  searchcredit = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    map(term =>
      term === ''
        ? []
        : this.inputvalue.creditType
          .filter(s => s.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
          .slice(0, 10),
    ),
  ) 
  formattercredit = (x: { name: string }) => x.name
  credittypeid() {
    console.log('creditType', this.test.creditid);
  }
  creditType(val) {
    console.log('creditid', val)
    this.test.creditid = val
  }

  //payment
  getamountfun() {
    console.log('payment', this.test.payment)
  }
  
  //paymentType
  selectedpaymenttype(item) {
    this.test.paymenttypeid = item.id
    console.log('paymenttypeid', this.test.paymenttypeid)
  }
  searchpaymenttype = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    map(term =>
      term === ''
        ? []
        : this.inputvalue.paymentType
          .filter(s => s.description.toLowerCase().indexOf(term.toLowerCase()) > -1)
          .slice(0, 10),
    ),
  ) 
  formatterpaymenttype = (x: { description: string }) => x.description

  //Location
  selectedlocation(item) {
    this.test.locationid = item.id
    console.log('locationid', this.test.locationid)
  }
  searchlocation = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    map(term =>
      term === ''
        ? []
        : this.inputvalue.store
          .filter(s => s.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
          .slice(0, 10),
    ),
  ) 
  formatterlocation = (x: { name: string }) => x.name

  //ResponsibleBy
  selectedresponsible(item) {
    this.test.responsiblebyid = item.id
    console.log('responsiblebyid', this.test.responsiblebyid)
  }
  searchresponsible = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    map(term =>
      term === ''
        ? []
        : this.Contact
          .filter(s => s.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
          .slice(0, 10),
    ),
  ) 
  formatterresponsible = (x: { name: string }) => x.name 

  //Reference
  getreferencefun() {
    console.log('reference', this.test.reference)
  }

  // Billstatus(val) {
  //   console.log('val', val)
  //   if (val == 1) {
  //     this.billstatus = 'PEN'
  //   }
  //   if (val == 2) {
  //     this.billstatus = 'PAID'
  //   }
  //   if (val == 3) {
  //     this.billstatus = 'ALL'
  //   }
  //   this.getCreditData()
  // }

  BillstsId() {
    console.log('billstatusid', this.billstatusid);
    this.getCreditData()
  }
  recStatus(Value) {
    console.log('rec', Value)
    this.billstatusid = Value
  }

// CreditIndex
  getCreditData() {
    this.Auth.getCredit(this.CompanyId, this.billstatusid).subscribe(data => {
      this.CreditDatatest = data['creditdatatest']
      // this.tabledata = this.CreditDatatest
      console.log(this.CreditDatatest)
      // this.isShown = true
    })
  };
  CreditDatatestt:any
  getreCreditData() {
    this.Auth.getCredit(this.CompanyId, 2).subscribe(data => {
      this.CreditDatatestt = data['creditdatatest']
      // this.tabledata = this.CreditDatatest
      console.log(this.CreditDatatestt)
      // this.isShown = true
    }) 
  };
  // getcreditid: any 
  // getcreditdatabyid(){
  //   this.Auth.getCredit(this.CompanyId).subscribe(data => {
  //     this.getcreditid = data['creditdatatest'][0]
  //     console.log('filterdata', this.getcreditid.billId)
  //   })
  // } 
  openDetailpopup(contentdetail) {
    const modalRef = this.modalService
      .open(contentdetail, {
        ariaLabelledBy: 'modal-basic-title',
        centered: true,
      })
      .result.then(
        result => { },
        reason => { },
      )
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC'
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop'
    } else {
      return `with: ${reason}`
    }
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
      },
    )
  }
  openCustomClass(content) {
    this.modalService.open(content, { centered: true })
  }
  opensplit(content) {
    this.modalService.open(content, { centered: true })
  }
  filteredvalues = []
  filtersearch(): void {
    this.filteredvalues = this.term
      ? this.CreditDatatest.filter(x => x.name.toLowerCase())
      : this.CreditDatatest
    console.log(this.filteredvalues)
  } 

 
  locback() {
    this.isShown = !this.isShown
    this.isTable = !this.isTable
  }
  back() {
    this.isShown = this.isShown
    this.isTable = this.isTable
    this.isRepay = !this.isRepay
    this.isRepaymain = !this.isRepaymain
    // this.isRepaytable = !this.isRepaytable
    if(this.isRepaytable == false){
      this.isRepaytable = this.isRepaytable
    }
    else
    this.isRepaytable = !this.isRepaytable
    
  }
  crerepay(){
    this.isShown = !this.isShown
    this.isTable = this.isTable
    this.isRepay = !this.isRepay
  }

  onChange(e) {
    console.log('date', e)
    this.orderDate = e
  }
  date = new Date()
  onChangetime(e) {
    console.log(e, moment(e), this.date)
  }

  clickpay() {
    this.isShown = !this.isShown
    this.isIndex = !this.isIndex
  }
  clickrepay() {
    this.isRepaymain = !this.isRepaymain
    this.isIndex = !this.isIndex
    this.getCreditData()
    // this.getrepaycontact()
  }
  clickrepaytable(){
    this.isRepay = this.isRepay
    this.isRepaytable = !this.isRepaytable
  }
  clickcredit(){
    this.isShown = !this.isShown
    this.isedit = !this.isedit
  }
  repaybtn() {
    this.isShown = this.isShown
    this.isTable = this.isTable
    this.isRepay = !this.isRepay
    this.isRepaymain = !this.isRepaymain
    this.getrecustomer()
  }
  id: any
  item: any


  repaydolar(id){
    this.isRepay = !this.isRepay
    this.isRepaymain = !this.isRepaymain
    this.isRepaytable = !this.isRepaytable
    console.log(id)
    this.cred.recontactId = id
    this.getrecustomer()  

    // this.testfun()
  }
  // contactid() {
  //   console.log('contactType', this.contacttypeId);
  //   // this.getcontact()
  // }

  // Queen 25-10-=2022
  // testsave() {
  //   this.submitted = true
  //   if (this.validation()) {
  //     this.transmod.CompanyId = 1,
  //       this.transmod.ContactId = this.contactId,
  //       // this.transmod.ContactId = this.contactId,
  //       console.log(this.contactId)
  //       this.transmod.UserId = this.users[0].id,
  //       this.transmod.ResponsibleById = this.Responsiblebyid,
  //       this.transmod.ContactTypeId = this.contacttypeId,
  //       this.transmod.CreditTypeId = this.credittypeId,
  //       this.transmod.StoreId = this.SuppliedById,
  //       this.transmod.ProviderId = this.SuppliedById,
  //       this.transmod.Amount = this.amt,
  //       this.transmod.Description = this.description,
  //       this.transmod.TransDate = moment().format('YYYY-MM-DD HH:MM A'),
  //       this.transmod.CreatedDate = moment().format('YYYY-MM-DD HH:MM A'),
  //       this.transmod.TransDateTime = moment().format('YYYY-MM-DD HH:MM A'),
  //       this.transmod.PaymentTypeId = this.paymentTypeId,
  //       this.transmod.PaymentStatusId = 2,
  //       this.transmod.TranstypeId = 8
  //     console.log(this.transmod)
  //     // this.Auth.savecredit(this.transmod).subscribe(data => {
  //     //   console.log(data)
  //     // })
  //     this.isShown = !this.isShown
  //     this.isTable = !this.isTable
  //     this.getCreditData()
  //    this.contactId = null
  //    this.contacttypeId = null
  //    this.credittypeId = null
  //    this.amt = null
  //    this.paymentTypeId = null
  //    this.description  = null
  //    this.submitted = false
  //   } 
  //   return
  //   this.submitted = false
  //   this.contactId = null
  //   this.contacttypeId = null
  //   this.credittypeId = null
  //   this.amt = null
  //   this.paymentTypeId = null 

  // }   
  SaveCredit(){
    this.transmod.CompanyId = this.CompanyId,
    this.transmod.ContactTypeId = this.test.contacttypeId,
    this.transmod.ContactId = this.test.contactId,
    this.transmod.CreditTypeId = this.test.creditid,
    this.transmod.Amount = this.test.payment,
    this.transmod.PaymentTypeId = this.test.paymenttypeid,
    this.transmod.StoreId = this.test.locationid,
    this.transmod.ResponsibleById = this.test.responsiblebyid,
    this.transmod.Description = this.test.reference,
    this.transmod.TransDate = moment().format('YYYY-MM-DD HH:MM A'),
    this.transmod.CreatedDate = moment().format('YYYY-MM-DD HH:MM A'),
    this.transmod.TransDateTime = moment().format('YYYY-MM-DD HH:MM A'),
    this.transmod.TransTypeId = 8
    this.transmod.TransModeId = 2
    this.transmod.CreatedBy = this.StoreId
    console.log(this.transmod)
    this.Auth.savecredit(this.transmod).subscribe(data => {
        console.log(data)
      })
    // this.test = null
    this.test.payment = null
    this.test.reference = null
    this.isShown = !this.isShown 
    this.isTable = !this.isTable
    this.getCreditData()
  }

  //AdvanceSearch
  visibleIndex = -1
  showSubItem(ind) {
    if (this.visibleIndex === ind) {
      this.visibleIndex = -1
    } else {
      this.visibleIndex = ind
    }
  }
  repay: any

  getrepay: any
  // saverepay(){
  //   this.Auth.saverepay(cred).subscribe(data => {
  //     repay = data
  //   })
  // }
cal: any ={
  balanceamount: 0 ,
  cid:0,
  cname: ''
} 

  getrecustomer(){
    this.Auth.saverepay(this.cred).subscribe(data =>{
      this.repay = data
      this.getrepay = this.repay.datatest
      this.cal.cname = this.getrepay[0].name
      console.log(this.cal.cname)

      // this.cal.balanceamount = this.getrepay[0].balance
      // console.log('balance', this.cal.balanceamount)
      // console.log(this.recontactId)
      console.log(this.getrepay)
    })
  }
 
  testfun(id){
    console.log(id)
  }

  contestfun(value){
    this.recontactId = value
    console.log('tempid', this.recontactId)
  }

  mastertest = "MAster";
}

 