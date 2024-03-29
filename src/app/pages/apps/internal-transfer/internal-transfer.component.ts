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
import {
  DelModule,
  OrderItemModule,
  OrderModule,
  OrdModule,
  OrderItemDetailModule,
  OrderstatusDetails,
} from './internal-transfer.module'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast'
import { Location } from '@angular/common'

@Component({
  selector: 'app-internal-transfer',
  templateUrl: './internal-transfer.component.html',
  styleUrls: ['./internal-transfer.component.scss'],
})
export class InternalTransferComponent implements OnInit {
  @ViewChild('instance', { static: true }) instance: NgbTypeahead
  @ViewChild('quantityel', { static: false }) public quantityel: TemplateRef<any> //productinput
  @ViewChild('discper', { static: false }) public discperel: TemplateRef<any>
  @ViewChild('disc', { static: false }) public discel: TemplateRef<any>
  @ViewChild('productautocomplete', { static: false }) public productinput: TemplateRef<any>
  @ViewChild('scrollframe', { static: false }) scrollFrame: ElementRef

  model: any = 'QWERTY'
  order: OrderModule
  RecData: DelModule
  inputValue: string = ''
  focus$ = new Subject<string>()
  click$ = new Subject<string>()

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term =>
        term === ''
          ? []
          : this.products
              .filter(
                v =>
                  v.product.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                  v.barCode?.toLowerCase().indexOf(term.toLowerCase()) > -1,
              )
              .slice(0, 10),
      ),
    )

  formatter = (x: { product: string }) => x.product

  searchstore = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term =>
        term === ''
          ? []
          : this.stores.storeList
              .filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10),
      ),
    )

  formatterstore = (x: { name: string }) => x.name
  selectedsupplieritem(item) {
    console.log('item', item)
    this.SuppliedById = item.id
  }
  searchsupplier = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term =>
        term === ''
          ? []
          : this.stores.storeList
              .filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10),
      ),
    )

  formattersupplier = (x: { name: string }) => x.name

  // Master
  // 14-06-2022
  // selectedreceiveritem(item) {
  //   console.log('item', item)
  //   this.OrderedById = item.id
  // }

  // searchreceiver = (text$: Observable<string>) =>
  //   text$.pipe(
  //     debounceTime(200),
  //     map(term =>
  //       term === ''
  //         ? []
  //         : this.stores.storeList
  //             .filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
  //             .slice(0, 10),
  //     ),
  //   )

  // formatterreceiver = (x: { name: string }) => x.name

  // @ViewChild('cardnumber', { static: false }) cardnumber: ElementRef;
  buffer = ''
  paymenttypeid = 1
  isuppercase: boolean = false
  WaiterId = null
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    let data = this.buffer || ''
    if (event.key !== 'Enter' && event.key !== 'Shift') {
      // barcode ends with enter -key
      if (this.isuppercase) {
        data += event.key.toUpperCase()
        this.isuppercase = false
      } else {
        data += event.key
      }
      this.buffer = data
    } else if (event.key === 'Shift') {
      this.isuppercase = true
    } else {
      this.buffer = ''
      this.setproductbybarcode(data)
    }
    // console.log(event)
  }
  draft = false
  dispatchStatus = 1
  scrollContainer: any
  products: any = []
  OrdData: any = []
  popupData: any = []
  stores: any = []
  filteredvalues = []
  barcValue: string = ''
  cartitems: any = []
  subtotal = 0
  searchTerm = ''
  tax = 0
  discount = 0
  isVisible = false
  batchno = 5
  isShown = true
  isTable = false
  ordNo = 0
  storeId: any
  orderDate = ''
  CustomerAddressId = null
  CompanyId: any
  CustomerId = null
  InvoiceNo = 0
  sourceId = 0
  DiningTableId = null
  Price = 0
  refamt = 0
  Tax1 = 0
  Tax2 = 0
  Tax3 = 0
  CancelStatus = 0
  ProdStatus = ''
  DispatchStatus = 0
  ReceiveStatus = 0
  OrderStatusId = 1
  OrderedById = 0
  SuppliedById = 0
  FoodReady = true
  OrderType = 2
  UserId = null
  SpecialOrder = false
  Charges
  OrderDiscount = 0
  OrderTaxDisc = 0
  OrderTotDisc = 0
  AllItemDisc = 0
  AllItemTaxDisc = 0
  AllItemTotalDisc = 0
  DiscAmount = 0
  DiscPercent = 0
  SplitTableId = 0
  PreviousStatusId = 0
  AutoOrderId = 0
  isRxve = true
  isNRxve = false
  closeResult = ''
  ordId = null
  TotalProductSale = 0
  TotalPrdQty = 0
  streId = 0
  isDisp = false
  numRecordsStr = 50
  // orders: any = []
  // companyId = 1
  numRecords = 50
  NewArr: any = []
  show = true
  tableData = [
    {
      key: '1',
      actionName: 'New Users',
      progress: { value: 60, color: 'bg-success' },
      value: '+3,125',
    },
    {
      key: '2',
      actionName: 'New Reports',
      progress: { value: 15, color: 'bg-orange' },
      value: '+643',
    },
    {
      key: '3',
      actionName: 'Quote Submits',
      progress: { value: 25, color: 'bg-primary' },
      value: '+982',
    },
  ]
  temporaryItem: any = { DiscAmount: 0, Quantity: null }
  barcodeItem = { quantity: null, tax: 0, amount: 0, price: null, Tax1: 0, Tax2: 0 }
  barcodemode: boolean = false
  customerdetails = { data_state: '', name: '', PhoneNo: '', email: '', address: '', companyId: 0 }
  customers: any = []
  users = []
  Ordprd: any = []
  orderType = 'Receiver'
  // orderStatus = 3

  // quantityfc = new FormControl('', [Validators.required, Validators.min(1)]);

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
  // getErrorMessage() {
  //   if (this.quantityfc.hasError('required')) {
  //     return "Quantity can't be Empty";
  //   }

  //   return this.quantityfc.hasError('min') ? 'Quantity should be greater than 0' : '';
  // }
  loginfo
  StoreId: any

  Items: Array<OrderItemModule> = []

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'))
    const store = JSON.parse(localStorage.getItem('store'))
    this.CompanyId = user.companyId
    this.StoreId = user.storeid
    this.order = new OrderModule(2)
    this.products = []
    this.getBarcodeProduct()
    this.getStoreList()
    this.Getorderlist()

    // this.Auth.getdbdata(['loginfo']).subscribe(data => {
    //   this.loginfo = data['loginfo'][0]
    //   this.CompanyId = this.loginfo.companyId
    //   this.StoreId = this.loginfo.storeId
    //   console.log(this.loginfo)
    //   this.order = new OrderModule(2)
    //   this.products = []
    //   this.getBarcodeProduct()
    //   this.getStoreList()
    //   this.Getorderlist()
    // })

    // this.products = JSON.parse(localStorage.getItem("Product"));
    this.products.forEach(product => {
      product.quantity = null
      product.tax = 0
      product.amount = 0
    })
    // Queen 31-01-2022
    this.orderkey = localStorage.getItem('orderkey')
      ? JSON.parse(localStorage.getItem('orderkey'))
      : { orderno: 1, timestamp: 0, GSTno: '' }
  }
  // this.location.back()

  getBarcodeProduct() {
    this.Auth.getBarcodeProduct(this.CompanyId, this.StoreId).subscribe(data => {
      console.log('data', data)
      this.products = data['products']
      console.log(this.products)
      this.batchno = data['lastbatchno'] + 1
      this.ordNo = data['lastorderNo'] + 1
    })
  }

  // getBarcodeProduct(){
  //   this.Auth.getinterproduct(this.CompanyId).subscribe(data =>{
  //     this.products = data
  //     console.log(this.products)
  //   })
  // }
  receiveStk(id) {
    console.log(id)
    this.Auth.editInternalord(id).subscribe(data => {
      console.log(data)
    })
    // this.isRxve = ! this.isRxve;
    // this.isNRxve =!this.isNRxve;
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
  dispatch(data) {
    console.log('data', data)
    this.dispatch = data
    this.isDisp = !this.isDisp
    this.isShown = this.isShown
    this.isTable = this.isTable
    // this.router.navigateByUrl("/apps/dispatch/this.dispatch");
    // {
    //   orderId:this.ordId
    // });
  }
  searchbyproduct(event) {
    console.log('event', event)
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
  orderstatus = 1
  saveOrder() {
    console.log(this.order)
    this.updateorderno()
    this.order.OrderNo = this.orderkey.orderno
    this.order.StoreId = this.StoreId
    this.order.BatchNo = this.batchno
    this.order.BillDate = moment().format('YYYY-MM-DD HH:MM A')
    this.order.CreatedDate = moment().format('YYYY-MM-DD HH:MM A')
    this.order.BillDateTime = moment().format('YYYY-MM-DD HH:MM A')
    this.order.OrderedDate = moment().format('YYYY-MM-DD HH:MM A')
    this.order.OrderedDateTime = moment().format('YYYY-MM-DD HH:MM A')
    this.order.DeliveryDateTime = moment().format('YYYY-MM-DD HH:MM A')
    this.order.ModifiedDate = moment().format('YYYY-MM-DD HH:MM A')
    this.order.CompanyId = this.CompanyId
    this.order.InvoiceNo = this.InvoiceNo
    this.order.RefundAmount = this.refamt
    this.order.ProdStatus = '1'
    this.order.WipStatus = '1'
    this.order.OrderStatusId = this.OrderStatusId
    this.order.OrderedById = this.StoreId
    this.order.SuppliedById = this.SuppliedById
    this.order.OrderType = this.OrderType
    this.order.SpecialOrder = this.SpecialOrder
    this.order.DiscAmount = this.DiscAmount
    this.order.DiscPercent = this.DiscPercent
    this.order.PreviousStatusId = this.PreviousStatusId
    this.order.OrderStatus = this.orderstatus

    this.order.Items.forEach(item => {
      item.CompanyId = this.CompanyId
    })
    this.order.OrderDetail.forEach(Od => {
      Od.CompanyId = this.CompanyId
    })
    console.log(this.Items)

    // this.order.OrderStatusDetails = new OrderstatusDetails()
    console.log('save', this.order)
    this.RecData = new DelModule(
      this.CompanyId,
      this.order.Items,
      this.draft,
      this.order,
      this.order.OrderDetail,
    )
    console.log('finalarray', this.RecData)
    this.Auth.savestock(this.RecData).subscribe(data => {
      console.log(data)

      this.isShown = !this.isShown
      this.isTable = !this.isTable
      this.Getorderlist()
      this.order = new OrderModule(2)
    })
  }
  internal() {
    this.isShown = !this.isShown
    this.isTable = !this.isTable
  }
  goback() {
    this.router.navigateByUrl('internaltransfer')
  }

  back() {
    this.isTable = !this.isTable
    this.isShown = !this.isShown
  }
  locback() {
    this.isTable = !this.isTable
    this.isShown = !this.isShown
  }
  getStoreList() {
    this.Auth.getstores(this.CompanyId).subscribe(data => {
      this.stores = data
      console.log(this.stores)
    })
  }
  getOrderList() {
    this.Ordprd.push({
      companyId: this.CompanyId,
      searchId: this.ordId,
      numRecordsStr: this.numRecordsStr,
    })
    // this.Auth.getorder(this.Ordprd).subscribe(data => {
    //   this.OrdData = data
    //   console.log('OrdData', this.OrdData)
    // })
  }
  setproductbybarcode(code) {
    // console.log("code",code, this.products.filter(x => x.Product == code));
    // var product = this.products.filter(x => x.Product == code)[0];
    // if (product) {
    //   this.temporaryItem = product;
    //   this.temporaryItem.quantity = null;
    //   this.temporaryItem.amount = this.temporaryItem.price * this.temporaryItem.quantity
    //   this.temporaryItem.tax = (this.temporaryItem.Tax1 + this.temporaryItem.Tax2) * this.temporaryItem.amount / 100
    //   this.temporaryItem.amount = +this.temporaryItem.amount.toFixed(2)
    //   // this.temporaryItem.totalprice = +(this.temporaryItem.price * this.temporaryItem.quantity).toFixed(2)
    //   if (this.cartitems.some(x => x.Id == this.temporaryItem["Id"])) {
    //     this.cartitems.filter(x => x.Id == this.temporaryItem["Id"])[0].quantity += this.temporaryItem.quantity
    //   } else {
    //     this.cartitems.push(Object.assign({}, this.temporaryItem));
    //   }
    //   this.calculate();
    //   this.temporaryItem = { Id: 0, quantity: null, taxpercent: 0, tax: 0, amount: 0, price: null, Tax1: 0, Tax2: 0, barcode_Id: 0, disc: 0, product: "" };
    //   8901803000179
    // }
  }
  // getcustomers() {
  //   this.Auth.getcustomers().subscribe(data => {
  //     this.customers = data
  //   })
  // }
  savedata() {
    if (this.customerdetails.data_state == 'new') {
      this.addcustomer()
    } else if (this.customerdetails.data_state == 'old') {
      this.updatecustomer()
    }
  }
  updatecustomer() {
    this.Auth.updateCustomer(this.customerdetails).subscribe(
      data => {
        console.log(data)
        this.notification.success(
          'Customer Updated!',
          `${this.customerdetails.name} updated successfully.`,
        )
      },
      error => {
        console.log(error)
      },
      () => {
        // this.getcustomers();
      },
    )
  }
  addcustomer() {
    this.Auth.addCustomers(this.customerdetails).subscribe(
      data => {
        console.log(data)
        this.notification.success(
          'Customer Added!',
          `${this.customerdetails.name} added successfully.`,
        )
        this.customerdetails.data_state = 'old'
      },
      error => {
        console.log(error)
      },
      () => {
        // this.getcustomers();
      },
    )
  }
  ngAfterViewInit() {
    // this.scrollContainer = this.scrollFrame.nativeElement;
    // console.log(this.scrollContainer, this.scrollFrame)
    // Add a new item every 2 seconds for demo purposes
    // setInterval(() => {
    //   this.cartitems.push({});
    // }, 2000);
    // this.cardnumber.nativeElement.inputmask({"mask":"9999-9999-9999-9999"})
  }
  // getCustomer() {

  // }
  private async getCustomer() {
    // Sleep thread for 3 seconds
    console.log(this.customerdetails.PhoneNo)
    console.log(this.customers)
    this.customerdetails.data_state = 'loading'
    // await this.delay(3000);

    if (this.customers.some(x => x.PhoneNo == this.customerdetails.PhoneNo)) {
      var obj = this.customers.filter(x => x.PhoneNo == this.customerdetails.PhoneNo)[0]
      Object.keys(obj).forEach(element => {
        this.customerdetails[element] = obj[element]
      })
      this.customerdetails.data_state = 'old'
    } else {
      this.customerdetails.data_state = 'new'
    }
  }
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  // scrollToBottom(): void {
  //   var el = document.getElementsByClassName('ant-table-body')[0]
  //   console.log(el.scrollHeight)
  //   // this.scrollContainer = this.scrollFrame.nativeElement;
  //   // console.log(this.scrollContainer, this.scrollFrame)
  //   el.scroll({
  //     top: el.scrollHeight + 1000,
  //     left: 0,
  //     behavior: 'smooth'
  //   });
  // }
  submitted: boolean = false
  addItem() {
    console.log('temporaryItem', this.temporaryItem)
    this.submitted = true
    console.log(this.validation())
    if (this.validation()) {
      this.order.addproduct(this.temporaryItem)
      this.temporaryItem = { DiscAmount: 0, Quantity: null }
      this.productinput['nativeElement'].focus()
      this.model = ''
      this.filteredvalues = []
      this.submitted = false
      console.log('cvcv', this.order)
    }
    return
  }

  barcodereaded(event) {
    console.log(event)
    console.log(event.element.nativeElement.id)
    var product = this.products.filter(x => x.Id == +event.element.nativeElement.id)[0]
    this.inputValue = product.Product
    this.barcodeItem = product
    this.barcodeItem.quantity = 1
    if (this.cartitems.some(x => x.Id == this.barcodeItem['Id'])) {
      this.cartitems.filter(
        x => x.Id == this.barcodeItem['Id'],
      )[0].quantity += this.barcodeItem.quantity
    } else {
      this.cartitems.push(Object.assign({}, this.barcodeItem))
    }
    this.calculate()
    this.barcodeItem = { quantity: null, tax: 0, amount: 0, price: null, Tax1: 0, Tax2: 0 }
    this.barcValue = ''
  }
  delete(index) {
    this.order.Items.splice(index, 1)
    this.order.OrderDetail.splice(index, 1)
    this.order.setbillamount()
  }

  deleteOrder(Id) {
    console.log('delete', Id)
    console.log(this.NewArr)
    this.Auth.deleteItem({ companyId: this.CompanyId, orderId: Id }).subscribe(data => {
      this.getorderedList = data
      console.log('delete', data)
      this.Getorderlist()
    })
  }
  settotalprice(i, qty) {
    this.cartitems[i].amount = this.cartitems[i].Price * this.cartitems[i].Quantity
    this.cartitems[i].tax =
      (this.cartitems[i].amount * (this.cartitems[i].Tax1 + this.cartitems[i].Tax2)) / 100
    console.log(
      i,
      this.cartitems[i].Price,
      this.cartitems[i].Quantity,
      this.cartitems[i].amount,
      qty,
    )
    this.cartitems[i].amount = +this.cartitems[i].amount.toFixed(2)
    this.calculate()
  }
  calculate() {
    this.subtotal = 0
    this.tax = 0
    this.discount = 0
    this.cartitems.forEach(item => {
      console.log(item)
      item.amount = item.price * item.quantity
      item.tax = (item.taxpercent * item.amount) / 100
      item.amount = +item.amount.toFixed(2) - item.disc
      this.subtotal += item.price * item.quantity
      this.tax += item.tax
      this.discount += item.disc
    })
    this.subtotal = +this.subtotal.toFixed(2)
    this.tax = +this.tax.toFixed(2)
    this.discount = +this.discount.toFixed(2)
    // console.log(this.tax)
  }
  date = new Date()
  onChange(e) {
    console.log('date', e)
    this.orderDate = e
  }
  showModal(): void {
    this.isVisible = true
  }

  handleOk(): void {
    console.log('Button ok clicked!')
    this.isVisible = false
  }

  handleCancel(): void {
    console.log('Button cancel clicked!')
    this.isVisible = false
  }
  openCustomClass(content) {
    this.modalService.open(content, { centered: true })
  }
  opensplit(content) {
    this.modalService.open(content, { centered: true })
  }
  //////////////////////////////////////////rough////////////////////////////////////////////////////////
  selectedItem(item) {
    console.log(item, Object.assign({}, this.temporaryItem))
    Object.keys(item).forEach(key => {
      this.temporaryItem[key] = item[key]
    })
    console.log(this.temporaryItem)
    this.quantityel['nativeElement'].focus()
  }
  selectedstoreitem(item) {
    console.log('item', item)
    // this.StoreId = item.id
  }
  productbybarcode = []
  barcode = ''
  searchbybarcode() {
    this.productbybarcode = this.products.filter(x => x.barCode == this.barcode)[0]
    console.log(this.barcode, this.productbybarcode, this.products)
    this.model = this.productbybarcode['product']
  }
  validation() {
    var isvalid = true
    if (!this.temporaryItem.productId) isvalid = false
    if (this.temporaryItem.Quantity <= 0) isvalid = false
    // if (this.temporaryItem.Price <= 0) isvalid = false;
    return isvalid
  }
  reloadPage() {
    window.location.reload()
  }

  // order: any = null

  // openDetailpopup(contentdetail, orderId) {
  //   this.OrdId = orderId
  //   if (this.OrdId != 0) {
  //     this.Auth.getOrderIdinternal(this.OrdId).subscribe(data => {
  //       this.popupData = data
  //       console.log(this.popupData)
  //     })
  //   }
  //   // for (let i = 0; i < this.popupData.orders.length; i++) {
  //   //   this.TotalProductSale = this.TotalProductSale + this.popupData.orders[i].billAmount
  //   //   this.TotalPrdQty = this.TotalPrdQty + this.popupData.orders[i].orderQuantity
  //   //   this.TotalProductSale = +this.TotalProductSale.toFixed(2)
  //   //   this.TotalPrdQty = +this.TotalPrdQty.toFixed(2)
  //   // }
  //   const modalRef = this.modalService
  //     .open(contentdetail, {
  //       ariaLabelledBy: 'modal-basic-title',
  //       centered: true,
  //     })
  //     .result.then(
  //       result => { },
  //       reason => { },
  //     )
  // }

  OrdId: number = 0
  OrderDetail: any = null
  test: any
  getorderid(OrdId, modalRef) {
    this.Auth.getOrderIdinternal(OrdId).subscribe(data => {
      this.popupData = data
      console.log(this.popupData)
      // this.test = this.popupData['receipts']
      // console.log(this.test)
      this.popupData.receipts.forEach(rec => {
        rec.itemDetails = JSON.parse(rec.itemJson)
        console.log(JSON.parse(rec.itemJson))
      })
      // this.OrderDetail = this.popupData.receipts[0]
      // this.test = this.OrderDetail.itemDetails.Items
      // console.log(this.OrderDetail)
      // console.log('test', this.test)
      // console.log(this.popupData)
      this.OrderDetail = this.popupData.receipts[0]
      this.test = this.OrderDetail.itemDetails
      console.log(this.OrderDetail)
      this.openDetailpopup(modalRef)
    })
  }
 
  orders: any = null 

  parseOrder(json_string, modalRef) {
    this.orders = JSON.parse(json_string)
    console.log(this.orders)
    this.openDetailpopup(modalRef)
  }

  openDetailpopup(contentdetail) {
    const modalRef = this.modalService
      .open(contentdetail, {
        ariaLabelledBy: 'modal-basic-title',
        centered: true,
      })
      .result.then(
        result => {},
        reason => {},
      )
  }

  storeIdByInt: any
  getorderedList: any = []
  Getorderlist() {
    this.Auth.getorderlist(this.StoreId).subscribe(data => {
      this.getorderedList = data['order']
      this.tabledata = this.getorderedList
      console.log(this.getorderedList)
      // this.StoreByIdInternal(0)
    })
  }
  tabledata: []
  term: string = ''
  filtersearch(): void {
    this.tabledata = this.term
      ? this.getorderedList.filter(x =>
          x.description.toLowerCase().includes(this.term.toLowerCase()),
        )
      : this.getorderedList
    console.log(this.tabledata)
  }

  compid: any

  StoreByIdInternal(storeId) {
    this.Auth.getstoreIdInternal(this.CompanyId, storeId).subscribe(data => {
      const stores = data['storeList']
      this.getorderedList.forEach(order => {
        order.supplier = stores.filter(x => x.id == order.SuppliedById)[0]?.name
        order.receiver = stores.filter(x => x.id == order.OrderedById)[0]?.name
      })
    })
  }

  orderkey = { orderno: 1, timestamp: 0, GSTno: '' }

  updateorderno() {
    this.orderkey.orderno++
    localStorage.setItem('orderkey', JSON.stringify(this.orderkey))
    // this.Auth.updateorderkey(this.orderkey).subscribe(data => { })
    console.log(this.orderkey)
  }
  orderlogging(eventname) {
    var logdata = {
      event: eventname,
      orderjson: JSON.stringify(this.order),
      orderno: this.orderkey.orderno,
      timestamp: new Date().getTime(),
    }
    this.Auth.logorderevent(logdata).subscribe(data => {})
  }

  getintordId: any = []
  editinternalord(id) {
    console.log(id)
  }
}
