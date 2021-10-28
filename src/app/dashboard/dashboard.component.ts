import { Component, OnInit } from '@angular/core';
import {NotedApiService} from "../noted-api.service";
import {UserInfo} from "../model/user-info.model";
import {Task} from "../model/task.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tasks : Task[] = [];

  private userInfo: UserInfo = {
    id: "",
    name:"",
    email: "",
    token: ""
  };

  task : Task = {
    id:"",
    userId: localStorage.getItem("id") || "",
    description: "",
    checked : false,
    edit: false
  }
  constructor(private notedApiService: NotedApiService) { }

  ngOnInit(): void {
    this.setUserInfo();
    this.getList();
  }

  setUserInfo() {
    this.userInfo.id = localStorage.getItem("id") || "";
    this.userInfo.name = localStorage.getItem("name") || "";
    this.userInfo.email = localStorage.getItem("email") || "";
    this.userInfo.token = localStorage.getItem("token") || "";
  }

  add(task: Task) {
    this.notedApiService.createTask(task).then(() => {
      this.getList();
    })
  }

  crossOver(task: Task) {
    task.checked = !task.checked;
    this.update(task);
  }

  remove(userId: string,taskId: string) {
    this.notedApiService.deleteTask(userId,taskId).then(() => {
      this.getList();
    })
  }

  update(task: Task) {
  this.notedApiService.updateTask(task).then((res)=> {
    //this.getList();
  })
  }
  edit(task: Task) {
    task.edit = !task.edit
  }
  getList() {
    this.notedApiService.getList(this.userInfo.id).then(res => {
      // @ts-ignorek
      this.tasks = res;
    });
  }
}
