import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule,} from "@angular/material/card";
import {RouterModule} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {UserService} from "../../../services/user.service";
import {User} from "../../../model/user";
import {MatTableDataSource} from "@angular/material/table";
import {CommentProfile} from "../../../model/commentProfile";
import {CommentProfileService} from "../../../services/commentprofile.service";
import {SystemScoreService} from "../../../services/systemscore.service";
import {SystemScore} from "../../../model/systemScore";
import {CommentProfileSummary} from "../../../modelComplement/commentProfileSummary";

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})

export class CommentComponent implements OnInit {
  public commentForm!: FormGroup
  users=new MatTableDataSource<User>
  comments:{[key:number]:CommentProfileSummary[]}={}
  commentsCheck:{[key:number]:Boolean}={}

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private commentService:CommentProfileService,
    private systemScoreService:SystemScoreService,
  ) {}

  ngOnInit(): void {
    console.clear()
    this.reactiveForm()
  }

  reactiveForm(): void {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required],
      score: ['', Validators.required]
    })
    this.userService.gerAllUsers().subscribe(
      (users:User[])=>{
        this.users.data = users;
        this.users.data = this.users.data.filter((user: User) => user.id !== parseInt(this.userService.getId()));
        users.forEach((user) => {
          this.getComment(user.id);
        });
      }
    )
  }

  check(): string{
    return this.userService.getId()
  }

  getComment(idUser:number) {
    this.commentService.getComment(idUser).subscribe(
      (comments:CommentProfileSummary[])=>{
        this.comments[idUser]=comments;
        this.commentsCheck[idUser]=false;
      }
    )
  }

  createComment(idUserComment:number) {
    console.log(this.commentForm.value);
    if(this.commentForm.valid){
      const comment : CommentProfile ={
        id:0,
        score: parseInt(this.commentForm.get("score")!.value),
        comment:this.commentForm.get("comment")!.value,
        id_user:parseInt(this.userService.getId())
      }
      this.commentService.addComment(comment).subscribe(
        (idComment:number)=>{
          if(idComment!=null){
            const score :SystemScore ={
              id:0,
              dateScore : new Date(),
              id_user:idUserComment,
              id_commentProfile: idComment
            }
            this.systemScoreService.addScore(score).subscribe(
              (check :Boolean)=>{
                if(check){
                  this.commentsCheck[idUserComment]=false;
                  this.reactiveForm();
                }
              }
            )
          }
        }
      )

    }else{
      alert("ingrese todos los datos ")
    }

  }

}
