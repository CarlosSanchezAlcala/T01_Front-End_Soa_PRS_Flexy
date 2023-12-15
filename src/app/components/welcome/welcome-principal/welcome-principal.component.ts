import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../component-funcionality/services/login/login.service";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MenssageService} from "../../component-funcionality/services/login/menssage.service";

@Component({
  selector: 'app-welcome-principal',
  templateUrl: './welcome-principal.component.html',
  styleUrls: ['./welcome-principal.component.scss']
})
export class WelcomePrincipalComponent implements OnInit {

  isLogged!: boolean;
  idAdmin!: boolean;
  username!: boolean;

  constructor(private breakpointObserver: BreakpointObserver,
              private loginService: LoginService,
              private messageService: MenssageService) {
  }

  ngOnInit(): void {
    this.messageService.getMessage().subscribe(res => {
        this.username = res['text'];
        this.isLogged = res['isLogged'];
        this.idAdmin = res['idAdmin'];
      },
      err => console.log(err));
    }

  login(){
    this.loginService.login();
  }

  logout(){
    this.loginService.logout();
  }

}
