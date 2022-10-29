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
import { OrderModule, Transmodule } from 'src/app/pages/apps/credit/credit.module'

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.scss'],
})
export class CreditComponent implements OnInit {
  order: OrderModule
  transmod: Transmodule
  isIndex = true
  isShown = false
  isTable = false
  users = []
  CompanyId: any
  stores: any = []
  paymentType: any = []
  creditData: any = []
  billstatus = ''
  billType = 2
  numRecords = 50
  ordId = 0
  Ordprd: any = []
  OrderedById = 0
  SuppliedById = 0
  Accountdata = 0
  DispatchById = 0
  contactId: any
  orderDate = ''
  paymentmode = 2
  creditTypeStatus = ''
  contacttype = 0
  paycred: any = []
  amt = 400
  NewArr: any = []
  EditCredit: any = []
  credData: any = []
  OrdId = 0
  isRepay = false
  term: string = ''
  description = ''
  TotalBalance = null
  supplier = ''
  PaymentType = 0
  paidAmount = 0
  items = []
  bankAccountId = null
  accTypeId = null
  isActive = false
  bankName = ''
  accountData: any = []
  label = false
  isEdit = false
  isRepaymain = false
  closeResult = ''
  arrayName: string
  searchField: string
  CtType = ''
  cttype: any = []
  ContactType: any
  credittype = 0
  CreditType: any
  paymentTypeId = 0
  amount = ''



  // trans =[];
  trans: any = {
    // amount: '',
    // creditTypeStatus: '',
    // PaymentTypeId: '',
    // Description: '',
    // CompanyId: 1,
    // contactId: this.contactId,
    // responsibleById: this.DispatchById,
    // storeId: this.SuppliedById,
    // contacttypeId: 1,
    // credittypeId: 1,
    // CreditType: '',
    // ContactType: '',
    // TotalBalance: null,
    // TransDateTime: moment().format('YYYY-MM-DD HH:MM A'),
    // Payment: null,
    // paymentmode: this.paymentmode,
    // TransDate: moment().format('YYYY-MM-DD HH:MM A'),
    // CreatedDate: moment().format('YYYY-MM-DD HH:MM A'),
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
  ) {
    this.users = JSON.parse(localStorage.getItem('users'))
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'))
    const store = JSON.parse(localStorage.getItem('store'))
    this.CompanyId = user.companyId
    this.StoreId = user.storeid
    this.getStoreList()
    // this.getcreditData('ALL')
    this.getPaymentTypesList()
    this.getBankAccts()
    this.getCreditData()
    this.getctlist()
    this.getcreditlist()
    // this.getcreditdatabyid()
  }

  //Queen
  getctlist() {
    this.Auth.getcttypes(this.CompanyId).subscribe(data => {
      this.ContactType = data
      console.log('ContactType', this.ContactType)
    })
  }
  getcreditlist() {
    this.Auth.getcredittypes().subscribe(data => {
      this.CreditType = data
      console.log('CreditType', this.CreditType)
    })
  }
  validation() {
    var isvalid = true
    if (this.trans.paymentmode <= 0) isvalid = false
    if (this.contactId <= 0) isvalid = false
    // if (this.batchentry.price <= 0) isvalid = false
    // if (this.batchno == 0) isvalid = false
    // if (this.batchdate == null) isvalid = false

    // if (this.product.name == '') isvalid = false;
    // console.log(isvalid)
    return isvalid
  }

  getStoreList() {
    this.Auth.getstores(this.CompanyId).subscribe(data => {
      this.stores = data
      console.log('stores', this.stores)
    })
  }
  getPaymentTypesList() {
    this.Auth.PaymentTypesList(this.CompanyId).subscribe(data => {
      this.paymentType = data
      console.log('paymentType', this.paymentType)
    })
  };
  getBankAccts() {
    this.Ordprd.push({
      companyId: this.CompanyId,
      numRecords: this.numRecords,
      bankAccountId: this.bankAccountId,
      accTypeId: this.accTypeId,
      isActive: this.isActive,
      bankName: this.bankName,
    })
    this.Auth.getbankaccount(this.Ordprd).subscribe(data => {
      this.accountData = data
      console.log('accountData', this.accountData)
    })
  }
  paymttype() {
    if (this.trans.paymentTypeId == 2) {
      this.label = true
    }
  }

  // getcreditData(Billstatus) {
  //   var x = new Date()
  //   x.setDate(1)
  //   x.setMonth(x.getMonth() - 1)
  //   console.log('fromdate', x)
  //   // console.log("fromdate",x.setMonth(x.getMonth() - 1))
  //   this.Ordprd.push({
  //     companyId: this.CompanyId,
  //     searchId: this.ordId,
  //     UserID: this.users[0].id,
  //     billType: this.billType,
  //     billstatus: Billstatus,
  //     numRecords: this.numRecords,
  //     dateFrom: x,
  //   })
  //   console.log('billstatus', this.billstatus)
  //   this.Auth.getCreditdata(this.Ordprd).subscribe(data => {
  //     this.creditData = data
  //     // this.filteredvalues = this.creditData
  //     console.log('creditData', this.creditData)
  //   })
  // }

  CreditDatatest: any
  companyId: any
  tabledata: []
  getCreditData() {
    this.Auth.getCredit(this.CompanyId).subscribe(data => {
      this.CreditDatatest = data['creditdatatest']
      // this.tabledata = this.CreditDatatest
      console.log(this.CreditDatatest)
      // this.isShown = true
    })
  };
  getcreditid: any
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
      ? this.CreditDatatest.creditdatatest.filter(x => x.name.toLowerCase().includes(this.term.toLowerCase()))
      : this.CreditDatatest.creditdatatest
    console.log(this.filteredvalues)
  }

  Deletedata(id) {
    this.NewArr.push({
      companyId: this.CompanyId,
      TransactionId: id,
    })
    this.Auth.deleteCredit(this.NewArr).subscribe(data => {
      console.log('delete', data)
    })
  }
  getTransList(id) {
    this.isShown = !this.isShown
    this.isTable = !this.isTable
    this.credData.push({
      companyId: this.CompanyId,
      id: id,
    })
    this.Auth.getTransdata(this.credData).subscribe(data => {
      this.trans = data
      console.log('EditCredit', this.trans)
    })
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
  //   this.getCreditData(this.billstatus)
  // }

  locback() {
    this.isShown = !this.isShown
    this.isTable = !this.isTable
  }

  onChange(e) {
    console.log('date', e)
    this.orderDate = e
  }
  date = new Date()
  onChangetime(e) {
    console.log(e, moment(e), this.date)
  }

  selecteddispatchitem(item) {
    // console.log('item', item)
    this.DispatchById = item.id
    console.log('responsible by', this.DispatchById)
  }
  searchdispatch = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term =>
        term === ''
          ? []
          : this.stores.cusList
            .filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
            .slice(0, 10),
      ),
    )

  formatterdispatch = (x: { name: string }) => x.name

  selectedcttypeitem(item) {
    console.log('item', item)
    this.ContactType = item.id
  }
  searchcttype = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term =>
        term === ''
          ? []
          : this.cttype
            .filter(v => v.ContactType.toLowerCase().indexOf(term.toLowerCase()) > -1)
            .slice(0, 10),
      ),
    )

  formatterctType = (x: { ContactType: string }) => x.ContactType


  selectedcontactitem(item) {
    // console.log('item', item)
    this.contactId = item.id
    this.ContactId = this.contactId
    console.log('select contact', this.ContactId)
  } 
  searchcontact = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term =>
        term === ''
          ? []
          : this.stores.cusList
            .filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
            .slice(0, 10),
      ),
    )

  formattercontact = (x: { name: string }) => x.name

  selectedsupplieritem(item) {
    // console.log('item', item)
    this.SuppliedById = item.id
    console.log('location', this.SuppliedById)
  }
  searchsupplier = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term =>
        term === ''
          ? []
          : this.stores.storeList
            .filter(s => s.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
            .slice(0, 10),
      ),
    )

  formattersupplier = (x: { name: string }) => x.name
  selectedaccountitem(item) {
    console.log('item', item)
    this.Accountdata = item.id
  }
  searchBankAccount = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term =>
        term === ''
          ? []
          : this.stores.bankAcct
            .filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
            .slice(0, 10),
      ),
    )

  formatteraccount = (x: { name: string }) => x.name

  recStatus(Value) {
    console.log('rec', Value)
    this.paymentmode = Value
  }
  rectStatus(Value) {
    console.log('rec', Value)
    this.contactType = Value
  }
  recreditStatus(Value) {
    console.log('rec', Value)
    this.CreditType = Value
  }
  // creditStatus(Val) {
  //   console.log('credit', Val)
  //   if (Val == 1) {
  //     this.creditTypeStatus = 'SALADV'
  //   }
  //   if (Val == 2) {
  //     this.creditTypeStatus = 'PURADV'
  //   }
  //   if (Val == 3) {
  //     this.creditTypeStatus = 'MANADV'
  //   }
  //   if (Val == 4) {
  //     this.creditTypeStatus = 'OTR'
  //   }
  // } 
  getrepayList(Id) {
    this.isTable = this.isTable
    this.isShown = !this.isShown
    this.isRepay = !this.isRepay
    this.Auth.getRecreditData(this.CompanyId, Id).subscribe(data => {
      this.EditCredit = data
      this.contactId = this.EditCredit.bills[0].contactId
      // this.trans.paymentTypeId = this.EditCredit.trans[0].paymentType.description
      // this.trans.contacttype = this.EditCredit.trans[0].contactTypeId
      this.SuppliedById = this.EditCredit.bills[0].storeId
      //  this.description = this.EditCredit.bills[0].contact.name;
      this.trans.creditTypeStatus = this.EditCredit.bills[0].creditTypeStr
      //   this.DispatchById =  this.EditCredit.responsibleById;
      //  this.trans.amount = this.EditCredit.bills[0].billAmount;
      this.trans.contact = this.EditCredit.bills[0].contact.name
      this.items = this.EditCredit.bills
      // this.trans.description = this.EditCredit.bills[0].contact.name;
      this.supplier = this.EditCredit.bills[0].store
      //  this.trans.name = this.EditCredit.trans[0].name;
      //  this.TransactionId = this.EditCredit.trans[0].transactionId;
      console.log('EditCredit', this.EditCredit)
      var totalamount = 20000
      for (let i = 0; i < this.EditCredit.bills.length; i++) {
        this.trans.TotalBalance = this.trans.TotalBalance + this.EditCredit.bills[i].pendAmount
        console.log(totalamount, this.EditCredit.bills[i].pendAmount)
        if (totalamount > this.EditCredit.bills[i].pendAmount) {
          this.EditCredit.bills[i].pay = this.EditCredit.bills[i].pendAmount
          totalamount -= this.EditCredit.bills[i].pendAmount
        } else if (totalamount > 0) {
          this.EditCredit.bills[i].pay = totalamount
          totalamount = 0
        } else this.EditCredit.bills[i].pay = 0
        console.log(this.EditCredit.bills[i].pay)
        //  this.trans.Payment =  this.EditCredit.bills[i].pendAmount - this.trans.amount;
      }
    })
  }
  testcredit: any
  submitted: boolean = false
  Submit() {
    this.submitted = true
    if (this.validation()) {
      this.paycred.push({
        CompanyId: this.CompanyId,
        ContactId: this.contactId,
        UserId: this.users[0].id,
        ResponsibleById: this.DispatchById,
        ContactTypeId: this.contacttypeId,
        CreditTypeId: this.credittypeId,
        StoreId: this.SuppliedById,
        ProviderId: this.SuppliedById,
        Amount: this.amount,
        Description: this.description,
        TransDate: moment().format('YYYY-MM-DD HH:MM A'),
        CreatedDate: moment().format('YYYY-MM-DD HH:MM A'),
        TransDateTime: moment().format('YYYY-MM-DD HH:MM A'),
        PaymentTypeId: this.paymentTypeId,
        PaymentStatusId: 2,
        TranstypeId: 8,
      })
      this.submitted = false
      this.Auth.savecredit(this.paycred).subscribe(data => {
        this.testcredit = ['paycred']
        console.log(this.testcredit)
        console.log(data)
        this.isShown = !this.isShown
        this.isTable = !this.isTable
        this.getCreditData()
      })
    }
  }
  Repaycredit() {
    this.paycred.push({
      CompanyId: this.CompanyId,
      ContactId: this.contactId,
      UserId: this.users[0].id,
      ResponsibleById: this.DispatchById,
      ContactType: this.trans.CtType,
      CreditType: this.trans.creditTypeStatus,
      StoreId: this.SuppliedById,
      ProviderId: this.SuppliedById,
      Amount: this.trans.amount,
      Description: this.trans.description,
      TransDate: moment().format('YYYY-MM-DD HH:MM A'),
      CreatedDate: moment().format('YYYY-MM-DD HH:MM A'),
      TransDateTime: moment().format('YYYY-MM-DD HH:MM A'),
      PaymentTypeId: this.trans.paymentmode,
      PaymentStatusId: 2,
      TranstypeId: 8,
      items: this.items,
    })
    console.log('update', this.paycred)
    this.Auth.Submitpay(this.paycred).subscribe(data => {
      console.log(data)
      this.isShown = this.isShown
      this.isTable = this.isTable
      this.isRepay = !this.isRepay
      this.isRepaymain = !this.isRepaymain
      // this.getcreditData('ALL')
    })
  }

  contactType(val) {
    console.log('contact', val)
    this.contacttype = val
  }
  Delete(Id) {
    this.paycred.push({
      transactionId: Id,
      companyId: this.CompanyId,
    })
    this.Auth.DeleteCreditpay(this.paycred).subscribe(data => {
      console.log(data)
    })
  }
  back() {
    this.isShown = this.isShown
    this.isTable = this.isTable
    this.isRepay = !this.isRepay
    this.isRepaymain = !this.isRepaymain
  }
  repayback() {
    this.isShown = this.isShown
    this.isTable = this.isTable
    this.isRepay = !this.isRepay
    this.isIndex = this.isIndex
    this.isRepaymain = !this.isRepaymain
  }

  // Queen 19-09-2022 
  // billId: number = 0
  // popupData: any = []
  // creditdata: any = null
  // getorderid(billId, modalRef) {
  //   this.Auth.getCredit(this.CompanyId, billId).subscribe(data => {
  //     this.popupData = data
  //     this.popupData.CreditDatatest.creditdatatest.forEach(rec => {
  //       rec.itemDetails = JSON.parse(rec.orderJson)
  //       console.log(JSON.parse(rec.orderJson))
  //     })
  //     this.creditdata = this.popupData.creditdatatest.billId[0]
  //     console.log(this.popupData)
  //     this.openDetailpopup(modalRef)
  //   })
  // }
  // TransactionId: any
  // getTransListinfo()
  // {
  //   this.credData.push({
  //     companyId:this.CompanyId,
  //     id:this.OrdId
  //   })  
  //   this.Auth.getTransdata(this.credData).subscribe(data => {
  //     this.EditCredit = data;
  //     console.log("EditCredit",this.EditCredit)
  //     this.contactId = this.EditCredit.trans[0].contact.id;
  //      this.trans.paymentTypeId = this.EditCredit.trans[0].paymentType.description
  //     this.trans.contacttype = this.EditCredit.trans[0].contactTypeId
  //     this.SuppliedById = this.EditCredit.trans[0].storeId
  //      this.description = this.EditCredit.trans[0].description;
  //     this.creditTypeStatus = this.EditCredit.creditTypeStr;
  //     this.DispatchById =  this.EditCredit.responsibleById;
  //     this.trans.amount = this.EditCredit.trans[0].amount;
  //    this.trans.description = this.EditCredit.trans[0].description;
  //    this.trans.supplier = this.EditCredit.trans[0].store.name;
  //    this.trans.contact = this.EditCredit.trans[0].contact.name;
  //    this.TransactionId = this.EditCredit.trans[0].transactionId;
  //     console.log("EditCredit",this.EditCredit)
  //     })
  // }
  clickpay() {
    this.isShown = !this.isShown
    this.isIndex = !this.isIndex
  }
  clickrepay() {
    this.isRepaymain = !this.isRepaymain
    this.isIndex = !this.isIndex
  }
  visibleIndex = -1
  showSubItem(ind) {
    if (this.visibleIndex === ind) {
      this.visibleIndex = -1
    } else {
      this.visibleIndex = ind
    }
  }
  search = (text$: Observable<string>) =>
    text$.pipe(
      map(term =>
        term === ''
          ? []
          : this.CreditDatatest.creditdatatest
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

  selectedItem(creditdatatest) {
    console.log(creditdatatest)
    // this.storeId = product.Id
  }
  name = 1
  filtersearchtest(): void {
    if (this.name === 1) {
      this.filteredvalues = this.term
        ? this.CreditDatatest.creditdatatest.filter(x => x.name.toLowerCase().includes(this.term.toLowerCase()))
        : this.CreditDatatest.creditdatatest
      console.log(this.filteredvalues)
    } else {
      this.name
    }
  }
  acselectedpd: any
  advsearch = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => {
        if (term == '') return []
        if (term.includes('*')) {
          term = term.replace('*', '')
          return this.CreditDatatest.filter(
            x => x.name?.toLowerCase() == term.toLowerCase() && term != '' && !x.ishidden,
            x => x.location?.toLowerCase() == term.toLowerCase() && term != '' && !x.ishidden,
          )
        }
        else {
          return this.CreditDatatest.filter(v => v.product.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
            v.BarCode?.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
            v.ProductCode?.toLowerCase().indexOf(term.toLowerCase()) > -1 && !v.ishidden)
        }
      }),
    )
  contacttypeId: 0
  contacttypeid() {
    console.log('contactType', this.contacttypeId);
  }
  credittypeId: 0
  credittypeid() {
    console.log('creditType', this.credittypeId);
  }
  paymenttypeid() {
    console.log('paymentmode', this.paymentTypeId);
  } 
  getamountfun() {
    console.log('Amount', this.amount)
  }

  //Queen 25-10-=2022
  // testsave(){
  //   this.submitted = true
  //   if (this.validation()) {
  //   // this.transmod.testCompanyId= 1,
  //   // this.transmod.ContactId  = this.contactId,
  //   this.transmod.ContactId = this.contactId
  //   console.log(this.contactId)
  //   this.transmod.UserId = this.users[0].id,
  //   this.transmod.ResponsibleById = this.DispatchById,
  //   this.transmod.ContactTypeId = this.contacttypeId,
  //   this.transmod.CreditTypeId = this.credittypeId,
  //   this.transmod.StoreId = this.SuppliedById,
  //   this.transmod.ProviderId = this.SuppliedById,
  //   this.transmod.Amount = this.amount,
  //   this.transmod.Description = this.description,
  //   this.transmod.TransDate = moment().format('YYYY-MM-DD HH:MM A'),
  //   this.transmod.CreatedDate = moment().format('YYYY-MM-DD HH:MM A'),
  //   this.transmod.TransDateTime = moment().format('YYYY-MM-DD HH:MM A'),
  //   this.transmod.PaymentTypeId = this.paymentTypeId,
  //   this.transmod.PaymentStatusId = 2,
  //   this.transmod.TranstypeId = 8
  //   console.log(this.transmod)
  //   }
  // this.Auth.savecredit(this.transmod).subscribe(data => {
  //   console.log(data)
  // })
  // this.isShown = !this.isShown
  // this.isTable = !this.isTable
  // this.getCreditData()
  ContactId = 0
  SaveCredit(){
    this.transmod.ContactId = this.ContactId
    console.log(this.transmod.ContactId)
  }
}

