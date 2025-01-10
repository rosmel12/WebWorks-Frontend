import {Component, OnInit} from '@angular/core';
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {RouterModule} from "@angular/router";
import {MatListModule} from "@angular/material/list";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {ReactiveFormsModule} from "@angular/forms";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatMenuModule} from "@angular/material/menu";
import {Company} from "../../../model/company";
import {AuthService} from "../../../services/auth.service";
import {DomSanitizer} from "@angular/platform-browser";
import {CompanyService} from "../../../services/company.service";
import {MatCardModule} from "@angular/material/card";
import {EmploymentService} from "../../../services/employment.service";
const busquedaIcon = `
<svg xmlns="http://www.w3.org/2000/svg"   id="Capa_1" x="0px" y="0px" viewBox="0 0 513.749 513.749" style="enable-background:new 0 0 513.749 513.749;" xml:space="preserve" width="512" height="512">
<g>
	<path d="M504.352,459.061l-99.435-99.477c74.402-99.427,54.115-240.344-45.312-314.746S119.261-9.277,44.859,90.15   S-9.256,330.494,90.171,404.896c79.868,59.766,189.565,59.766,269.434,0l99.477,99.477c12.501,12.501,32.769,12.501,45.269,0   c12.501-12.501,12.501-32.769,0-45.269L504.352,459.061z M225.717,385.696c-88.366,0-160-71.634-160-160s71.634-160,160-160   s160,71.634,160,160C385.623,314.022,314.044,385.602,225.717,385.696z"/>
</g>
</svg>
`;
@Component({
  selector: 'app-page-company',
  standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        RouterModule,
        MatListModule,
        MatTableModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatButtonModule,
        MatSelectModule,
        MatMenuModule,
        MatIconModule,
      MatCardModule,
    ],
  templateUrl: './page-company.component.html',
  styleUrl: './page-company.component.css'
})
export class PageCompanyComponent implements OnInit{
  dataSource = new MatTableDataSource<Company>()
 constructor(
   private authService:AuthService,
   private companyService:CompanyService,
   private employmentService:EmploymentService,
   private iconRegistry: MatIconRegistry,
   private sanitizer: DomSanitizer
 ) {this.iconRegistry.addSvgIconLiteral('busquedaIcon', this.sanitizer.bypassSecurityTrustHtml(busquedaIcon));

 }
 ngOnInit() {
    console.clear()
   this.getCompany();
 }

 getCompany(){
    this.companyService.getCompany(this.authService.getUser() || "").subscribe((data: Company)=>{
      this.dataSource.data=[data]
    })
 }

 deleteDataSave(){
 this.employmentService.deleteIdEmployment()

 }

}
