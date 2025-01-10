import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import { MatButtonModule} from "@angular/material/button";
import { MatCardModule} from "@angular/material/card";
import {RouterModule} from "@angular/router";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {User} from "../../../model/user";
import {UserService} from "../../../services/user.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatInputModule} from "@angular/material/input";
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeModule, MatTreeNestedDataSource} from "@angular/material/tree";
import {RepositoryService} from "../../../services/repository.service";
import {Repository} from "../../../model/repository";
import {ProjectService} from "../../../services/project.service";
import {Project} from "../../../model/project";
import { format } from 'date-fns';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

@Component({
  selector: 'app-view-profile-user',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatTableModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    RouterModule,
    MatInputModule,
    MatTreeModule, MatButtonModule, MatIconModule,
    NgOptimizedImage
  ],
  templateUrl: './view-profile-user.component.html',
  styleUrl: './view-profile-user.component.css'
})
export class ViewProfileUserComponent implements OnInit{

  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();


  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

  dataSourceUser = new MatTableDataSource<User>()
  constructor(
    private userService: UserService,
    private repositoryService: RepositoryService,
    private projectService: ProjectService,
    ) {}

  ngOnInit(): void {
    this.getUser()
    this.getRepositoriesUser()
  }

  getUser() {
    this.userService.getUserById(parseInt( this.userService.getSaveUserId())).subscribe((dataUser: User) => {
      this.dataSourceUser.data=[dataUser]
    })
  }

  getRepositoriesUser() {
  const TREE_DATA: FoodNode[] = [];

  this.repositoryService.getRepositoryUserCompany( parseInt( this.userService.getSaveUserId())).subscribe((repositories: Repository[]) => {
    repositories.forEach((repository) => {
      const repositoryNode: FoodNode = {
        name: repository.name.toString(),
        children: []
      };

      this.projectService.getProjectsRepositoryCompany(repository.id).subscribe((projects: Project[]) => {
        repositoryNode.children = projects.map((project) => {
          const formattedDate = format(new Date(project.dateCreate), 'dd/MM/yyyy');

          return {
            name:'Project: '+ project.name.toString(),
            children: [
              { name:'language: '+ project.language.toString() },
              { name:'description: '+ project.description.toString() },
              { name:'Date Create: '+ formattedDate }
            ]
          };
        });

        TREE_DATA.push(repositoryNode);
        this.dataSource.data = TREE_DATA;
      });
    });
  });
}

  deleteIdUserSave(){
    this.userService.deleteUserSave()
  }

}
