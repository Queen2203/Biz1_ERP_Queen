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
// Module SET
import { Transmodule } from 'src/app/pages/apps/credit/credit.module'
import { BillModule } from 'src/app/pages/apps/credit/credit.module'
import {
  NzPlacementType,
  NzContextMenuService,
  NzDropdownMenuComponent,
} from 'ng-zorro-antd/dropdown'
import { id } from 'date-fns/locale'
import { min } from 'date-fns'



@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.scss'],
})
export class CreditComponent implements OnInit {
  // order: OrderModule
  transmod: Transmodule
  billList: Array<BillModule> = null
  isIndex = true
  isShown = false
  isTable = false
  users = []
  CompanyId: any
  isRepay = false
  // term: ''
  termt: any = ''
  items = []
  isActive = false
  label = false
  isEdit = false
  isRepaymain = false
  isRepaytable = false
  isedit = false
  iseditRepaytable = false

  orderDate = ''
  closeResult = ''
  CreditDatatest: any
  tabledata: []
  billstatus: any
  BillStatus: any = 0
  billstatusid: any = null

  contactId: any
  //Queen
  inputvalue: any 
  Contact: any
  Contactt: any
  cred: any =
    {
      recontactId: 0
    } 
  test: any = {
    contacttypeId: null, 
    contactId: null, 
    creditid: null,
    payment: '',
    paymenttypeid: null,
    locationid: null, 
    responsiblebyid: null,
    reference: ''
  }
  temp: any = { 
    tempid: ''
  }
  totalbls = null
  // ={
  //   totbls:0
  // }

  //temp
  trans: any = {

  }

  deldata: any = {
    amount: 0,
    billId: 0,
    transactionId: 0,
    billpayid: 0
  }

  testmaster: any = {
    name: '',
    amount: null,
    // billId: 0,
    contactType: '',
    contactTypeId: 0,
    creditTypeId: 0,
    creditType: '',
    id: 0,
    // paidAmount: '',
    paymentType: '',
    paymentTypeId: 0,
    storeId: 0,
    store: '',
    description: null
 
  }
  tnsid: any
 
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
    this.getrepaycontactbtn()
    // this.getrepaycontact()
    this.getrecustomer()
    this.getrepayclickdata()
    // this.gettotbls()
    this.getcontacttype()
    // this.Delete(this.tnsid)
  }
  // reloadCurrentPage() {
  //   window.location.reload();
  //  }


  //Queen
  GetInputdata() {
    this.Auth.getinputdata(this.CompanyId).subscribe(data => {
      this.inputvalue = data
      console.log('inputvalue', this.inputvalue)
    })
  }
  conty: any
  crety: any 
  payty: any
  stor: any

  getcontacttype() {
    this.Auth.getinputdata(this.CompanyId).subscribe(data => {
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
    // this.getcontact()
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
  getbstatus() {
    this.Auth.getbillstatus(this.CompanyId).subscribe(data => {
      this.BillStatus = data
      console.log('BillStatus', this.BillStatus)
    })
  }
  // ContactType

  getcontacttypeid(){
    console.log('ContactType', this.test.contacttypeId)
    this.getcontact()
  }
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
  getcontactid(){
    console.log('ContactId', this.test.contactId)
  }
  
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

  repaycontact: any
  getrepaycontactbtn() {
    this.Auth.getCredit(this.CompanyId, 2).subscribe(data => {
      this.repaycontact = data['creditdatatest']
      // this.tabledata = this.CreditDatatest
      console.log(this.repaycontact)
      // this.isShown = true
    })
  };

  //repaycontact
  recontactId: any
  selectedrecontact(item) {
    this.recontactId = item.contactId
    console.log('recontactId', this.recontactId)
    // this.cred.recontactId = this.recontactId
    this.contactId = this.recontactId
    console.log(this.contactId)
    this.getrecustomer()
    this.gettotbls()
  }
  searchrecontact = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term =>
        term === ''
          ? []
          : this.repaycontact
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

  getpaymenttypeid(){
    console.log('PaymentType', this.test.paymenttypeid)
  }
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
  getlocationid(){
    console.log('locationid', this.test.locationid)
  }
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
  newlocation:any
  getlocationfun(value){
    console.log('newlocation', value)
    this.newlocation = value
  }

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

  CreditDatatestt: any
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
  term: any
  filtersearch(): void {
    this.filteredvalues = this.term
      ? this.CreditDatatest.filter(x => x.contactType.toLowerCase().includes(this.term.toLowerCase()))
      : this.CreditDatatest
    console.log(this.filteredvalues)
  } 

  // filteredvaluestest: number
  // filtersearchtest(): void {
  //   this.filteredvaluestest = this.termt 
  //     ? this.CreditDatatest.filter(x => x.billTransId)
  //     : this.CreditDatatest
  //   console.log(this.filteredvaluestest)
  // } 


  locback() {
    this.isShown = !this.isShown
    this.isTable = !this.isTable
    this.submitted = false
    this.test.contacttypeId = null,
    this.test.contacttypeId= null,
    this.test.contactId= null,
    this.test.creditid= null,
    this.test.payment= null,
    this.test.paymenttypeid= null,
    this.test.locationid= null, 
    this.test.responsiblebyid= null,
    this.test.reference= null
  }
  back() {
    this.isShown = this.isShown
    this.isTable = this.isTable
    this.isRepay = !this.isRepay
    this.isRepaymain = !this.isRepaymain
    // this.isRepaytable = !this.isRepaytable
    if (this.isRepaytable == false) {
      this.isRepaytable = this.isRepaytable
    }
    else
      this.isRepaytable = !this.isRepaytable

    this.test.payment = null
    this.totalbls =  null
    // this.date = null
    this.submitted = false

  }

  crerepay(id) {
    // this.isShown = !this.isShown
    // this.isTable = this.isTable
    // this.isRepay = !this.isRepay
    // this.isRepaytable = !this.isRepaytable
    this.isShown = !this.isShown
    this.isedit = !this.isedit
    this.isTable = this.isTable
    this.iseditRepaytable = !this.iseditRepaytable

    console.log(id)
    this.recontactId = id
    this.getrecustomer()
    // this.gettabledata()
    this.gettotbls()
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
    // this.getCreditData()
    // this.getrepaycontact()
    this.test.paymenttypeid = null
  }
  clickrepaytable() {
    this.isRepay = this.isRepay
    this.isRepaytable = !this.isRepaytable
    this.totalbls = null
  }
  clickcredit() { 
    this.isShown = !this.isShown
    // this.isedit = !this.isedit
  }
  repaybtn() {
    this.isShown = this.isShown
    this.isTable = this.isTable
    this.isRepay = !this.isRepay
    this.isRepaymain = !this.isRepaymain
    this.test.paymenttypeid =  null
    // this.getrecustomer()
    // document.getElementById("contact").focus();
  } 
  id: any 
  item: any 


  repaydolar(id) {
    this.isRepay = !this.isRepay
    this.isRepaymain = !this.isRepaymain
    this.isRepaytable = !this.isRepaytable
    console.log(id)
    this.recontactId = id
    this.getrecustomer()
    this.selectedrecontact(id)
  }

  repaydolarback() {
    this.isRepaymain = !this.isRepaymain
    this.iseditRepaytable = !this.iseditRepaytable
    this.isedit = !this.isedit
    this.totalbls = null
    this.submitted = false
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

  validation() {
    var isvalid = true
    if (this.test.contacttypeId == 0) isvalid = false
    if (this.test.contactId == 0) isvalid = false
    if (this.test.payment == 0) isvalid = false
    if (this.test.paymenttypeid == 0) isvalid = false
    if (this.test.locationid == 0) isvalid = false
    return isvalid

  }
  submitted: boolean = false
  savecreditdata: any
  SaveCredit() {
    this.submitted = true
    if (this.validation()) {
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
    this.transmod.BillStatusId = 2
    this.transmod.CreatedBy = this.StoreId
    var bill = new BillModule(this.transmod.ContactId, this.totalpaidamount)
    bill.BillAmount = this.test.payment,
    bill.ReceiverId = this.transmod.ContactId,
    bill.BillStatusId = 2
    bill.ResponsibleById = this.test.responsiblebyid
    bill.CreatedDate = moment().format('YYYY-MM-DD HH:MM A')
    this.bill = bill
    this.transmod.Bill = this.bill
    console.log(this.transmod)
    this.Auth.savecredit(this.transmod).subscribe(data => {
      this.savecreditdata = data
      console.log(this.savecreditdata) 
    })
    this.test.payment = null
    this.test.reference = null 
    this.isShown = !this.isShown
    this.isTable = !this.isTable
    this.getCreditData()
  }else{
    this.notification.error('Error', 'Check All Data')
  }
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
  repay: any = {}

  getrepay: any
  // saverepay(){
  //   this.Auth.saverepay(cred).subscribe(data => {
  //     repay = data
  //   })
  // }
  cal: any = {
    balanceamount: 0,
    cid: 0,
    cname: '',
    paidamount: 0

  }
  // paidamount: any
  alreadypaidamt: number
  testpaid: number
  testbill: number
  sumbill: any

  getrecustomer() {
    // this.Auth.saverepay(this.cred).subscribe(data =>{
    this.Auth.getdatabyid(this.recontactId).subscribe(data => {
      this.repay = data['bill']
      // this.sumofrepay(this.repay.)
      // this.alreadypaidamt = this.repay[0].paidAmount
      // console.log(this.alreadypaidamt)

      this.getrepay = this.repay['datatest']
      this.cal.cname = this.repay[0].name
      console.log(this.cal.cname)

      // this.cal.balanceamount = this.repay[0].balance
      // console.log('balance', this.cal.balanceamount)
      // console.log(this.recontactId)
      // this.cal.paidamount = this.repay[0].paidAmount 
      // console.log(this.cal.paidamount)
      // this.testpaid =  this.repay[0].paidAmount
      // this.testbill = this.repay[0].billAmount
      // this.sumbill = this.repay.sum.testbill
      // console.log(this.testbill)
      // console.log(this.sumbill)
      // console.log(this.testbill - this.testpaid)
      // console.log(this.cal.balanceamount)
      console.log(this.repay)
      // this.repay[0].
      // console.log(this.getrepay)
      // this.sumofrepay(this.repay)
    })
    // this.sumofrepay()
  }
  totabls: any = 0
  gettotbls() {
    // this.Auth.saverepay(this.cred).subscribe(data =>{
    this.Auth.getdatabyid(this.recontactId).subscribe(data => {
      this.totabls = data['bls']
      this.totalbls = this.totabls[0].totbls
      console.log(this.totalbls)
    })
    // this.sumofrepay()
  }

  sumtest: any
  balancetest = 0

  sumofrepay(data) {
    this.sumtest = data.billAmount
    for (let sum = 0; sum < data.length; sum++) {
      this.balancetest += this.sumtest[sum]
      console.log(this.balancetest)
    }
  }
  memdata: any
  getrepayclickdata() {
    this.Auth.getrepaycondatabyid(this.recontactId).subscribe(data => {
      this.memdata = data['editdata']
      console.log(this.memdata)
    })
  }


  // testfun(id){
  //   console.log(id)
  // }
  // Repay : any ={
  //   recontactId: 0,
  //   repaymenttypeid: 0,
  //   repayment: '',
  //   reReference: '',
  //   relocation: '',
  //   billId: 0,
  //   billDate: 0,
  //   paidamount: 0,
  //   balance: 0
  // }
  validationrepay() {
    var isvalid = true
    // if (this.recontactId == 0) isvalid = false
    if (this.test.payment == 0) isvalid = false
    if (this.test.paymenttypeid == 0) isvalid = false
    if (this.test.locationid == 0) isvalid = false
    return isvalid
  }
  bill: BillModule
  savedata: any
  totalpaidamount: any
  saverepaydata() {
    this.submitted = true
    if (this.validationrepay()) {
    this.transmod.CompanyId = this.CompanyId
    this.transmod.ContactId = this.recontactId,
    this.transmod.PaymentTypeId = this.test.paymenttypeid,
    this.transmod.Amount = this.test.payment,
    this.transmod.Description = this.test.reference,
    this.transmod.StoreId = this.test.locationid
    // this.transmod.CreditTypeId = this.test.creditid
    this.totalpaidamount = this.repay[0].paidAmount + this.test.payment
    // console.log(this.totalpaidamount)
    var bill = new BillModule(this.transmod.ContactId, this.totalpaidamount)
    bill.BillId = this.repay[0].billId,
    bill.BillDate = this.repay[0].billDate,
    bill.BillAmount = this.repay[0].billAmount,
      // bill.PaidAmount = this.repay[0].paidAmount + this.test.payment,
    console.log("Already Payed", this.alreadypaidamt)
    console.log("New Pay", this.test.payment)
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
    console.log(this.transmod)
    this.Auth.saverepay(this.transmod).subscribe(data => {
      this.savedata = data
      console.log(this.savedata)
    })

    this.test.payment = null
    this.test.reference = null
    this.isRepaymain = !this.isRepaymain
    this.isRepay = !this.isRepay
    this.isRepaytable = !this.isRepaytable
  }else{
    this.notification.error('Error', 'Check All Data')
  }
    // this.getreCreditData()
  }

  arrayName: string
  searchField: string

  search = (text$: Observable<string>) =>
    text$.pipe(
      map(term =>
        term === ''
          ? []
          : this.CreditDatatest
            .filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
            .slice(0, 10),
      ),
    )
  c_search = (text$: Observable<string>) => {
    return text$.pipe(
      map(term =>
        term === ''
          ? []
          : this[this.arrayName] 
            .filter(v => v[this.searchField].toLowerCase().indexOf(term.toLowerCase()) > -1)
            .slice(0, 10),
      ),
    )
  }

  formatter = (x: { name: string }) => x.name

  selectedItem(CreditDatatest) {
    console.log(CreditDatatest)
    // this.storeId = product.Id
  }
  queentest: any = []
  advancesearchdata() {
    this.Auth.getCredit(this.CompanyId, this.billstatusid).subscribe(data => {
      this.queentest = data
      // this.tabledata = this.CreditDatatest
      console.log(this.queentest)
      // this.isShown = true
    }) 
  }

  cname: any
  camount: any
  ref: any
  bildate: any
  cont: any
  gettabledata() {
    this.Auth.geteditcontbyid(this.recontactId).subscribe(data => {
      this.cont = data['edit']
      this.cont.cname = this.cont.name
      // this.camount = this.cont[0].amount
      // this.ref = this.cont[0].description
      // this.bildate = this.cont[0].billDate
      console.log(this.cont)
      console.log(this.cname)
    })
  }
  transactionId: any
  bilid: any
  amount: any
  del: any
  contt: any = {
  }
  deldat: any = {}
  objdata: any = {}
  testcontadata : any

  Delete(transid, billid, amt) {
    this.transactionId = transid
    this.bilid = billid
    this.amount = amt
    console.log(this.transactionId)
    console.log(this.bilid)
    console.log(this.amount)
    this.Auth.Deleterepaydata(this.transactionId, this.bilid, this.amount).subscribe(data => {
      this.testcontadata = data
      console.log('Deleted',this.testcontadata)
    })
    this.isRepaymain = this.isRepaymain
    this.getreCreditData()
  }
 
}

