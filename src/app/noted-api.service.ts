import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {environment} from "../environments/environment";
import {Task} from "./model/task.model";
import {UserInfo} from "./model/user-info.model";
import {UserCreate} from "./model/user-create.model";

@Injectable({
  providedIn: 'root'
})

export class NotedApiService {
  private notedApiEndPoint = 'https://noted-web-api.herokuapp.com/';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set("Authorization","Bearer "+ localStorage.getItem("token"));
  }

  public createUser(user: UserCreate): Promise<void> {
    return this.http.post<void>(this.notedApiEndPoint+'api/user/create',user).toPromise();
  }

  public authenticate(email: string, password: string): Promise<UserInfo> {
    return this.http.get<UserInfo>(this.notedApiEndPoint+'api/user/auth',{params: {email: email, password: password}}).toPromise();
  }

  public getList(userId: string): Promise<Task[]> {
    return this.http.get<Task[]>(this.notedApiEndPoint+'api/task/'+userId,{ headers: this.getHeaders()}).toPromise();
  }

  public createTask(task: Task): Promise<Task> {
    return this.http.post<Task>(this.notedApiEndPoint+'api/task/create',task,{headers: this.getHeaders()}).toPromise();
  }

  public updateTask(task: Task): Promise<Task> {
    return this.http.post<Task>(this.notedApiEndPoint+'api/task/update',task,{headers: this.getHeaders()}).toPromise();
  }

  public deleteTask(userId: string, taskId: string):Promise<boolean> {
    return this.http.delete<boolean>(this.notedApiEndPoint+"api/task/"+userId+"/"+taskId,{headers: this.getHeaders()}).toPromise();
  }
}
