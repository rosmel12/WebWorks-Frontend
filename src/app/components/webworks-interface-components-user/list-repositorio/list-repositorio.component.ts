import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { RepositoryService } from '../../../services/repository.service';
import ApexCharts from 'apexcharts'
import {Repository} from "../../../model/repository";
import {DomSanitizer} from "@angular/platform-browser";
import {SubscriptionService} from "../../../services/subscription.service";

const projectIcon = `
<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
  <path d="M0,6v-1C0,2.243,2.243,0,5,0h2.528c.463,0,.927,.109,1.341,.316l3.156,1.578c.138,.069,.293,.105,.447,.105h6.528c2.414,0,4.434,1.721,4.899,4H0Zm24,12c0,3.314-2.686,6-6,6s-6-2.686-6-6,2.686-6,6-6,6,2.686,6,6Zm-2.5,0c0-.553-.447-1-1-1h-1.5v-1.5c0-.553-.447-1-1-1s-1,.447-1,1v1.5h-1.5c-.553,0-1,.447-1,1s.447,1,1,1h1.5v1.5c0,.553,.447,1,1,1s1-.447,1-1v-1.5h1.5c.553,0,1-.447,1-1Zm-11.5,0c0-4.411,3.589-8,8-8,2.39,0,4.533,1.059,6,2.726v-4.726H0v9c0,2.757,2.243,5,5,5h6.082c-.684-1.178-1.082-2.542-1.082-4Z"/>
</svg>
`;

@Component({
  selector: 'app-list-repositorio',
  standalone: true,
  imports: [
    MatTableModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    RouterModule,
    MatInputModule,
    CommonModule,],
  templateUrl: './list-repositorio.component.html',
  styleUrl: './list-repositorio.component.css'
})

export class ListRepositorioComponent implements OnInit {

  private chart: ApexCharts | null = null;
  displayedColumns: string[] = ['name', 'description', 'datePublication', 'quantityProject', 'actions'];
  dataSource = new MatTableDataSource<Repository>()

  constructor(
    private repositoryService: RepositoryService,
    private userService: UserService,
    private subscriptionService: SubscriptionService,
    private router: Router,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIconLiteral('projectIcon', sanitizer.bypassSecurityTrustHtml(projectIcon));
  }

  ngOnInit(): void {
    console.clear();
    this.getRepositoriesUser()
  }

  getRepositoriesUser() {
     this.repositoryService.getRepositoriesUser(parseInt(this.userService.getId())).subscribe(
       (data: Repository[]) => {
       this.dataSource = new MatTableDataSource(data)
       this.grafico(data);
     })
  }

  saveDate(id:number,name:string,numProjects:number){
    this.repositoryService.saveDateImport(id,name,numProjects)
  }

  deleteDateSave(){
    this.repositoryService.deleteDateSave()
    if(this.subscriptionService.getCheckSubscription()==false && this.dataSource.data.length ==  this.subscriptionService.freMaxNumberRepositories()){
      alert("usted tiene el plan free, ya alcanzo el maximo de " + this.subscriptionService.freMaxNumberRepositories()+ " repositorios permitidos, unete al lado divertido"  );
      return;
    }

    this.router.navigateByUrl("/agregarRepositorio").then( ()=> console.log("redirigiendo a form repositorio"));
  }

  delete(id:number){
    this.repositoryService.delete(id).subscribe({
      next: () => {
        console.log('repositorio eliminado')
        this.getRepositoriesUser();
        this.router.navigate(["/listRepositorio"]).then(()=>"redireccionando")
      },error(err:any){
        console.log(err)
      }
    })

  }

  grafico(repositorio:Repository[]) {
    const options= {
      series: repositorio.map(repositorio => repositorio.numberProject),
      chart: {
        type: 'donut',
        height: 350
      },
      labels: repositorio.map(repositorio => '' + repositorio.name),
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 250
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ],
      title: {
        text: 'Repositorios con respecto a su cantidad de proyectos '
      }
    };

  if (this.chart) {
    this.chart.destroy();
  }

  this.chart = new ApexCharts(document.querySelector("#chart"), options);
  this.chart.render().then(() => "Todo correcto");
}

}
