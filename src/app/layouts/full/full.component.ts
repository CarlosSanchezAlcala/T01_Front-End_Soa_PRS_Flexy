import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {LoginService} from 'src/app/components/component-funcionality/services/login/login.service';
import {MenssageService} from "../../components/component-funcionality/services/login/menssage.service";

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {

  isLoggedIn: boolean = false;

  showBarInfo = true;

  isLogged!: boolean;
  idAdmin!: boolean;
  username!: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

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

  routerActive: string = "activelink";

  sidebarMenu: sidebarMenu[] = [
    {
      link: "/home",
      icon: "home",
      menu: "Dashboard",
    },
    {
      link: "/teen",
      icon: "user",
      menu: "Adolescentes",
    },
    {
      link: "/funcionary",
      icon: "users",
      menu: "Funcionarios",
    },
    {
      link: "/asignation",
      icon: "disc",
      menu: "Asignación",
    },
    {
      link: "/entities",
      icon: "layers",
      menu: "Entidades Cooperantes",
    },
    {
      link: "/asignationProgram",
      icon: "book",
      menu: "Asig. Programa a actividad",
    },
    {
      link: "/notifications",
      icon: "layers",
      menu: "Notificación de informes",
    },
    {
      link: "/activities",
      icon: "book",
      menu: "Actividades",
    },
    {
      link: "/record",
      icon: "book-open",
      menu: "Historial",
    },

    {
      link: "/asignationActTeen",
      icon: "briefcase",
      menu: "Asignacion de Actividad",
    },
    {
      link: "/operativeUnit",
      icon: "grid",
      menu: "Unidades Operativas",
    },
    {
      link: "/programsAsist",
      icon: "grid",
      menu: "Programas",
    },
    {
      link: "/unitOperativeProgram",
      icon: "grid",
      menu: "Asig. Programas a Unidad Operativa",
    },
    {
      link: "/digitalExpedient",
      icon: "disc",
      menu: "Expediente Digital",
    },
    {
      link: "/programs",
      icon: "disc",
      menu: "Listado de Programas",
    },
    {
      link: "/asignationMasiv",
      icon: "divide-circle",
      menu: "Asignación Masiva",
    },
    {
      link: "/attendance",
      icon: "award",
      menu: "Asistencia",
    },
    {
      link: "/viewAttendance",
      icon: "menu",
      menu: "Vista de Asistencia",
    },
  ]

  showSideBard() {
    this.showBarInfo = true;
  }

  hideSideBard() {
    this.showBarInfo = !this.showBarInfo;
  }

  login() {
    this.loginService.login();
  }

  logout() {
    this.loginService.logout();
  }

}
