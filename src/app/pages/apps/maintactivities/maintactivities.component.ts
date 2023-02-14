// import { Component, OnInit } from '@angular/core';
// import { AuthService } from 'src/app/auth.service';
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

@Component({
  selector: 'app-maintactivities',
  templateUrl: './maintactivities.component.html',
  styleUrls: ['./maintactivities.component.scss']
})
export class MaintactivitiesComponent implements OnInit {
  isShown = true
  isCreate = false

  choovalue: boolean = false

  CompanyId: 0
  StoreId: 0
  userId: 0
  mainttypeId= null
  expectedamount= ''
  frequencytypeid= 1
  contTypeId= null
  IsRecurring: boolean
  //maintbill
  maintbill : any = {
    ExpectedAmount: 0,
    IsRecurring: false,
    MaintBillTypeId: 0,
    VendorId: 0,
    LiabilityId: 0,
    FrequencyTypeId: 0,
    CreatedBy: 0,
    ContactId: null,
    CompanyId: 0,
    CreatedDate: '', 
    ModifiedDate: ''
  }

  constructor(
    private Auth: AuthService
  ) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'))
    const store = JSON.parse(localStorage.getItem('store'))
    // console.log(user)
    this.userId = user.id
    this.CompanyId = user.companyId
    this.StoreId = user.storeid
    this.getBillData()
    this.getmainttypes()
    this.getvendors()
    this.getconttype()
  }

  PurchaseDatatest: any
  tabledata: any
  billstatusid: any
  getBillData() {
    this.Auth.getmaintbillIndex(this.CompanyId).subscribe(data => {
      this.PurchaseDatatest = data
      console.log(this.PurchaseDatatest)
      // this.tabledata = this.PurchaseDatatest['maintks']
      // console.log(this.tabledata)
      // this.isShown = true
    })     
  }; 
 
  //MaintBillTypes
  mainttype: any
  getmainttypes(){
    this.Auth.getmaintbill(this.CompanyId).subscribe(data => {
      this.mainttype = data
      console.log(this.mainttype)
    }) 
  }
 
  //Maintbill Type
  maintbilltypeid: 0
  liabilityid: any
  selectedItem(item){
    console.log(item)
    this.maintbilltypeid = item.id
    this.liabilityid = item.liabilityTypeId
    console.log('maintbilltypeid',this.maintbilltypeid)
    console.log('liabilityTypeid',this.liabilityid)
    this.getasset()
  }

  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    map(term =>
      term === ''
        ? []
        : this.mainttype
            .filter(
              v =>
                v.description.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
            .slice(0, 10),
    ),
  )

  formatter = (x: { description: string }) => x.description

  //Get Asset
  asset: any
  getasset(){
    this.Auth.getliabilitybyId(this.CompanyId, this.liabilityid).subscribe(data =>{
      this.asset = data
      console.log(this.asset)
    })
  }

  //Asset Name
  assetid: any
  assetselectedItem(item){
    console.log(item)
    this.assetid = item.id
    console.log(this.assetid)
  }

  assetsearch = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    map(term =>
      term === ''
        ? []
        : this.asset
            .filter(
              v =>
                v.description.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
            .slice(0, 10),
    ),
  )

  assetformatter = (x: { description: string }) => x.description

  //get vendors
  vendors: any
  getvendors(){
    this.Auth.getvendorsmaint(this.CompanyId).subscribe(data => {
      this.vendors = data
      console.log(this.vendors)
    })
  }
  vendorid: any
  venselectedItem(item){
    console.log(item)
    this.vendorid = item.id
    console.log(this.vendorid)
  }

  vensearch = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    map(term =>
      term === ''
        ? []
        : this.vendors
            .filter(
              v =>
                v.name.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
            .slice(0, 10),
    ),
  )
  venformatter = (x: { name: string }) => x.name

  //ContactType
  conttype: any
  getconttype(){
    this.Auth.getcontType(this.CompanyId).subscribe(data => {
      this.conttype = data
      console.log(this.conttype)
    })
  }

  // contTypeId: null
  selectedcontType(){
    console.log('ContactType', this.contTypeId)
    this.getcontact()
  }

  //Contact
  Contact: any
  getcontact() {
    this.Auth.getcontact(this.CompanyId, this.contTypeId).subscribe(data => {
      this.Contact = data
      console.log('Contact', this.Contact)
    })
  }
  contactId: 0
  getcontactid(){
    console.log('ContactId', this.contactId)
  }
  
  selectedcontact(item) {
    this.contactId = item.id
    console.log('contactId', this.contactId)
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

  savemaintbill(){
    this.maintbill.ExpectedAmount = this.expectedamount
    if(this.mainttypeId == 1){
      this.maintbill.IsRecurring == true
    }else{
      this.maintbill.IsRecurring == false
    }
    // this.maintbill.IsRecurring = this.mainttypeId
    this.maintbill.IsActive = true
    this.maintbill.MaintBillTypeId = this.maintbilltypeid
    this.maintbill.VendorId = this.vendorid
    this.maintbill.LiabilityId = this.assetid
    this.maintbill.FrequencyTypeId = this.frequencytypeid
    this.maintbill.CreatedBy = this.userId
    this.maintbill.ContactId = this.contactId
    this.maintbill.CompanyId = this.CompanyId
    this.maintbill.CreatedDate =  moment().format('YYYY-MM-DD HH:MM A'),
    this.maintbill.ModifiedDate =  moment().format('YYYY-MM-DD HH:MM A')
    console.log(this.maintbill) 

    // this.Auth.Savemaintenbill(this.maintbill).subscribe(data =>{
    //   console.log(data)
    // })
  }
 
  // Create New btn 
  create(){
    this.isShown = !this.isShown
    this.isCreate = !this.isCreate
  }
  addback(){
    this.isShown = !this.isShown
    this.isCreate = !this.isCreate
  }
  testid: any
  getmaintTypeid(value){
    this.mainttypeId = value
    console.log(value)
    console.log(this.mainttypeId)
    // this.mainttypeId = value
    // console.log("MaintType", this.mainttypeId)

    
  }
  getchoosedvalue(value){
    this.choovalue = value
    console.log('Choose', this.choovalue)
  }
 
}
