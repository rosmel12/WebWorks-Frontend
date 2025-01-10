import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioSesionComponent } from './components/inicio-interface-components/inicio-sesion/inicio-sesion.component';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarComponent } from './components/inicio-interface-components/registrar/registrar.component';
import { InicioPageComponent } from './components/inicio-interface-components/inicio-page/inicio-page.component';
import { FooterInicioComponent } from './components/inicio-interface-components/footer-inicio/footer-inicio.component';
import { ListplanComponent } from './components/inicio-interface-components/listplan/listplan.component';
import { authenticateGuard } from './guards/authenticate.guard';
import { PageUsuarioComponent } from './components/webworks-interface-components-user/page-usuario/page-usuario.component';
import { SubscriptionComponent } from './components/webworks-interface-components-user/subscription/subscription.component';
import { ListMetodoPagoComponent } from './components/webworks-interface-components-user/list-metodo-pago/list-metodo-pago.component';
import { AgregarMetodoPagoComponent } from './components/webworks-interface-components-user/agregar-metodo-pago/agregar-metodo-pago.component';
import { ModificarUsuarioComponent } from './components/webworks-interface-components-user/modificar-usuario/modificar-usuario.component';
import { ListProyectoComponent } from './components/webworks-interface-components-user/list-proyecto/list-proyecto.component';
import { AgregarProyectoComponent } from './components/webworks-interface-components-user/agregar-proyecto/agregar-proyecto.component';
import { ListRepositorioComponent } from './components/webworks-interface-components-user/list-repositorio/list-repositorio.component';
import { AgregarRepositorioComponent } from './components/webworks-interface-components-user/agregar-repositorio/agregar-repositorio.component';
import {PageCompanyComponent} from "./components/webworks-interface-components-company/page-company/page-company.component";
import {ProfileUsuarioComponent} from "./components/webworks-interface-components-user/profile-usuario/profile-usuario.component";
import {ProfileCompanyComponent} from "./components/webworks-interface-components-company/profile-company/profile-company.component";
import {UpdateProfileCompanyComponent} from "./components/webworks-interface-components-company/update-profile-company/update-profile-company.component";
import {ListEmploymentCompanyComponent} from "./components/webworks-interface-components-company/list-employment-company/list-employment-company.component";
import {RegisterEmploymentComponent} from "./components/webworks-interface-components-company/register-employment/register-employment.component";
import {ListEmploymentComponent} from "./components/webworks-interface-components-user/list-employment/list-employment.component";
import {ViewProfileUserComponent} from "./components/webworks-interface-components-company/view-profile-user/view-profile-user.component";
import {
  ListJobApplicationComponent
} from "./components/webworks-interface-components-company/list-job-application/list-job-application.component";
import {
  ListSubscriptionComponent
} from "./components/webworks-interface-components-user/list-subscription/list-subscription.component";
import {CommentComponent} from "./components/webworks-interface-components-user/comment/comment.component";


export const routes: Routes = [
  { path: '', redirectTo: 'pageInicio', pathMatch: 'full' },
  { path: 'pageInicio', component: InicioPageComponent },
  { path: 'footerinicio', component: FooterInicioComponent },
  { path: 'login', component: InicioSesionComponent },
  { path: 'registrar', component: RegistrarComponent },

  { path: 'listPlanInicio', component: ListplanComponent },

  //usuarios-
  { path: 'updateProfile', component: ModificarUsuarioComponent, canActivate: [authenticateGuard], data: { role: ['USER'] } },
  { path: 'profileUser', component:ProfileUsuarioComponent, canActivate: [authenticateGuard], data: { role: ['USER'] } },
  { path: 'subscription', component: SubscriptionComponent, canActivate: [authenticateGuard], data: { role: ['USER'] } },
  { path: 'listSubscription', component: ListSubscriptionComponent, canActivate: [authenticateGuard], data: { role: ['USER'] } },
  { path: 'pageUser', component: PageUsuarioComponent, canActivate: [authenticateGuard], data: { role: ['USER'] } },
  { path: 'listPlanUser', component: ListplanComponent, canActivate: [authenticateGuard], data: { role: ['USER'] } },
  { path: 'listProyecto', component: ListProyectoComponent, canActivate: [authenticateGuard], data: { role: ['USER'] } },
  { path: 'agregarProyecto', component: AgregarProyectoComponent, canActivate: [authenticateGuard], data: { role: ['USER'] } },
  { path: 'listRepositorio', component: ListRepositorioComponent, canActivate: [authenticateGuard], data: { role: ['USER'] } },
  { path: 'agregarRepositorio', component: AgregarRepositorioComponent, canActivate: [authenticateGuard], data: { role: ['USER'] } },
  { path: 'listMethodPayment', component: ListMetodoPagoComponent, canActivate: [authenticateGuard], data: { role: ['USER'] } },
  { path: 'addMethodPayment', component: AgregarMetodoPagoComponent, canActivate: [authenticateGuard],data: { role: ['USER'] }  },
  { path: 'listEmploymentUser', component:ListEmploymentComponent, canActivate: [authenticateGuard],data: { role: ['USER'] }  },
  { path: 'comment', component:CommentComponent, canActivate: [authenticateGuard],data: { role: ['USER'] }  },


  //Company
  { path: 'pageCompany', component:PageCompanyComponent, canActivate: [authenticateGuard] },
  { path: 'profileCompany', component:ProfileCompanyComponent, canActivate: [authenticateGuard] },
  { path: 'updateProfileCompany', component:UpdateProfileCompanyComponent, canActivate: [authenticateGuard] },
  { path: 'listEmployment', component:ListEmploymentCompanyComponent, canActivate: [authenticateGuard] },
  { path: 'addOrUpdateEmployment', component:RegisterEmploymentComponent , canActivate: [authenticateGuard]},
  { path: 'addOrUpdateEmployment', component:RegisterEmploymentComponent , canActivate: [authenticateGuard]},
  { path: 'listJobApplication', component:ListJobApplicationComponent, canActivate: [authenticateGuard]},
  { path: 'viewProfileUser', component:ViewProfileUserComponent, canActivate: [authenticateGuard]},

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
