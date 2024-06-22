import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NavbarInicioComponent } from './components/inicio-interface-components/navbar-inicio/navbar-inicio.component';
import { InicioPageComponent } from './components/inicio-interface-components/inicio-page/inicio-page.component';
import { RegistrarComponent } from './components/inicio-interface-components/registrar/registrar.component';
import { InicioSesionComponent } from './components/inicio-interface-components/inicio-sesion/inicio-sesion.component';
import { NavbarWebworksComponent } from './components/webwork-interface-components/navbar-webworks/navbar-webworks.component';
import { FooterInicioComponent } from './components/inicio-interface-components/footer-inicio/footer-inicio.component';
import { ListplanComponent } from './components/inicio-interface-components/listplan/listplan.component';
import { authGuard } from './guards/auth.guard';
import { UserPageComponent } from './components/webwork-interface-components/user-page/user-page.component';
import { RegistrarRepositorioComponent } from './components/webwork-interface-components/registrar-repositorio/registrar-repositorio.component';
import { RegistrarMetodoPagoComponent } from './components/webwork-interface-components/registrar-metodo-pago/registrar-metodo-pago.component';
import { RegistrarProyectoComponent } from './components/webwork-interface-components/registrar-proyecto/registrar-proyecto.component';
import { ListProyectoComponent } from './components/webwork-interface-components/list-proyecto/list-proyecto.component';
import { ListRepositorioComponent } from './components/webwork-interface-components/list-repositorio/list-repositorio.component';

export const routes:Routes=[
  {path: '', redirectTo: '', pathMatch: 'full'},
  {path:'Inicio', component:NavbarInicioComponent},
  {path:'IniciarSesion',component:InicioSesionComponent},
  {path:'Registrar',component:RegistrarComponent},
  {path:'footerinicio',component:FooterInicioComponent},
  {path:'plan',component:ListplanComponent},
  ///componentes de user 
  {path:'Interface',component:NavbarWebworksComponent , canActivate:[authGuard]},
  {path:'PageInicio',component:InicioPageComponent},
  {path:'registrarRepository',component:RegistrarRepositorioComponent},
  {path:'pageUser',component:UserPageComponent},
  {path:'pago',component:RegistrarMetodoPagoComponent},
  {path:'registrarProyecto',component:RegistrarProyectoComponent},
  {path:'listProyecto',component:ListProyectoComponent},
  {path:'registrarRepositorio',component:RegistrarRepositorioComponent},
  {path:'listRepositorio',component:ListRepositorioComponent},

  {path:'**', redirectTo:'', pathMatch:'full' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
