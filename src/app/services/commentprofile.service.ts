import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {CommentProfile} from "../model/commentProfile";
import {CommentProfileSummary} from "../modelComplement/commentProfileSummary";
import {Url} from "../model/url";


const base_url = Url.urlBackend + '/webworks/commentProfile';

@Injectable({
  providedIn: 'root'
})
export class CommentProfileService {
  constructor(private http: HttpClient,private authService: AuthService) {}

addComment(comment:CommentProfile) {
    const url = base_url + '/user/addComment';
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
    });
    const endpoint = `${url}`;
    return this.http.post<number>(endpoint,comment,{headers});
}

getComment(idUser:number) {
    const url = base_url + `/user/getCommentProfileByUser/${idUser}`;
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
  const endpoint = `${url}`;
return this.http.get<CommentProfileSummary[]>(endpoint,{headers});
}

}

