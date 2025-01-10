import { Component,OnInit} from '@angular/core';
import {  NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarInicioComponent } from './components/inicio-interface-components/navbar-inicio/navbar-inicio.component';
import { NavbarWebworksComponent } from './components/webworks-interface-components-user/navbar-webworks/navbar-webworks.component';
import { CommonModule } from '@angular/common';
import { FooterInicioComponent } from './components/inicio-interface-components/footer-inicio/footer-inicio.component';
import { InicioPageComponent } from './components/inicio-interface-components/inicio-page/inicio-page.component';
import {NavbarCompanyComponent} from "./components/webworks-interface-components-company/navbar-company/navbar-company.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarInicioComponent,
    NavbarWebworksComponent,
    FooterInicioComponent,
    NavbarCompanyComponent,
    InicioPageComponent,
     ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'WebWorks';

  currentNavbar: string = 'inicio';
  currentFooter:string= 'inicio';
  currentInicioPage: string = 'inicio';
  currentNavbarUser: string = 'otro';
  currentNavbarCompany: string = 'otro';


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateNavbar(event.urlAfterRedirects);
      }
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateInicioPage(event.urlAfterRedirects);
      }
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateFooter(event.urlAfterRedirects);
      }
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateNavbarUser(event.urlAfterRedirects);
      }
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateNavbarCompany(event.urlAfterRedirects);
      }
    });
  }
  isInitialView(): boolean {
    return this.currentNavbar === 'inicio' ||
           this.currentInicioPage === 'inicio' ||
           this.currentFooter === 'inicio';
  }


  updateNavbar(url: string): void {
    if (url === '/pageInicio'||url === '/login'
      ||url === '/registrar' || url === '/footerinicio'||
      url === '/listPlanInicio') {
      this.currentNavbar = 'inicio';
    }else{
      this.currentNavbar = 'otro';
    }
  }

  updateInicioPage(url: string): void {
    if (url === '/pageInicio'||url === '/footerinicio') {
      this.currentInicioPage = 'inicio';
    } else {
      this.currentInicioPage = 'otro';
    }
  }

  updateFooter(url: string): void {
    if (url === '/pageInicio') {
      this.currentFooter = 'inicio';
    } else {
      this.currentFooter = 'otro';
    }
  }

  updateNavbarUser(url: string): void {
    if (url === '/pageUser'|| url === '/repository'
      ||url === '/subscription' || url==='/listSubscription'
      || url==='/listMethodPayment' || url==='/addMethodPayment'
      || url==='/updateProfile' || url==='/profileUser'
      || url==='/listPlanUser'|| url==='/listProyecto'
      || url==='/agregarProyecto' || url==='/listRepositorio'
      || url==='/agregarRepositorio' || url==='/listEmploymentUser'
      || url==='/comment') {
      this.currentNavbarUser = 'user'
    } else {
      this.currentNavbarUser = 'otro';
    }
  }

  updateNavbarCompany(url: string): void {
    if (url === '/pageCompany' || url === '/profileCompany'||
        url==='/updateProfileCompany' || url==='/listEmployment' ||
        url==='/addOrUpdateEmployment' || url=='/listJobApplication'||
      url==='/viewProfileUser') {
      this.currentNavbarCompany = 'company'
      }else {
      this.currentNavbarCompany = 'otro';
    }
  }

}
