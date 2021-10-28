import { Component, OnInit } from '@angular/core';
import {NotedApiService} from "../noted-api.service";
import {User} from "../model/user.model";
import {Router} from "@angular/router";
import {UserInfo} from "../model/user-info.model";
import {UserCreate} from "../model/user-create.model";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLogin: boolean = false;

   userCreate: UserCreate = {
    id: "",
    name:"",
    email: "",
    password:"",
  };

  constructor(private notedApiService: NotedApiService,private router: Router) { }

  ngOnInit(): void {
  }

  changeLogin() {
    this.isLogin = !this.isLogin;
  }

  createUser(user: UserCreate) {
    this.notedApiService.createUser(user).then(r => {
      this.isLogin = !this.isLogin;
    });
  }

  login() {
    this.notedApiService.authenticate(this.userCreate.email,this.userCreate.password).then((res)=> {
      //this.userInfo = res;
      localStorage.setItem("id",res.id);
      localStorage.setItem("name",res.name);
      localStorage.setItem("email",res.email);
      localStorage.setItem("token",res.token);
    this.router.navigate(["dashboard"]).then();
    })
  }
}
