import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarInicioComponent } from './components/inicio-interface-components/navbar-inicio/navbar-inicio.component';
import { NavbarWebworksComponent } from './components/webwork-interface-components/navbar-webworks/navbar-webworks.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { FooterInicioComponent } from './components/inicio-interface-components/footer-inicio/footer-inicio.component';
import { InicioPageComponent } from './components/inicio-interface-components/inicio-page/inicio-page.component';
import { AuthService } from './services/auth.service';
import { PlanesService } from './services/planes.service';
import { PersonService } from './services/person.service';
import { UserPageComponent } from './components/webwork-interface-components/user-page/user-page.component';
import { CookieService } from 'ngx-cookie-service';
import { DeveloperService } from './services/developer.service';
import { MetodoPagoService } from './services/metodo-pago.service';
import { ProyectoService } from './services/proyecto.service';
import { RepositorioService } from './services/repositorio.service';
import { SuscripcionService } from './services/suscripcion.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HttpClientModule,
    NavbarInicioComponent,
    NavbarWebworksComponent,
    FooterInicioComponent,
    InicioPageComponent,
    UserPageComponent
  ],
  providers: [
    AuthService, 
    PersonService,
    PlanesService,
    DeveloperService,
    MetodoPagoService,
    ProyectoService,
    RepositorioService,
    SuscripcionService,
    CookieService,
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'WebWorks';
  currentNavbar: string = 'inicio';
  currentPageInicio: string = 'inicio';
  currentFooter:string= 'inicio';
  currentNavbarUser:string='inicio';
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateNavbar(event.urlAfterRedirects);
      }
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updatePageInicio(event.urlAfterRedirects);
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
  }

  updateNavbar(url: string): void {
    if (url === '/'||url === '/IniciarSesion'||url === '/Registrar' || url === '/footerinicio' || url === '/plan') {
      this.currentNavbar = 'inicio';
    }else{
      this.currentNavbar = 'otro';
    } 
  }
  updatePageInicio(url: string): void {
    if (url === '/'||url === '/PageInicio'|| url === '/footerinicio') {
      this.currentPageInicio = 'inicio';
    } else {
      this.currentPageInicio = 'otro';
    }
  }
  updateFooter(url: string): void {
    if (url === '/'|| url === '/PageInicio') {
      this.currentFooter = 'inicio';
    } else {
      this.currentFooter = 'otro';
    }
  }

  updateNavbarUser(url: string): void {
    if (url === '/pageUser'||url === '/registrarRepository' 
      || url === '/pago' || url === '/registrarProyecto'|| url === '/registrarRepositorio' 
      ||url==='/listRepositorio'|| url==='/listProyecto') {
      this.currentNavbarUser = 'inicio';
    }else{
      this.currentNavbarUser = 'otro';
    } 
  }



}
