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
      link: "/activities",
      icon: "book",
      menu: "Actividades",
    },
    {
      link: "/historial",
      icon: "info",
      menu: "Historial",
    },
    /*
    {
      link: "/alerts",
      icon: "info",
      menu: "Alerts",
    },
    {
      link: "/grid-list",
      icon: "file-text",
      menu: "Grid List",
    },
    {
      link: "/menu",
      icon: "menu",
      menu: "Menus",
    },
    {
      link: "/expansion",
      icon: "divide-circle",
      menu: "Expansion Panel",
    },
    {
      link: "/chips",
      icon: "award",
      menu: "Chips",
    },
    {
      link: "/tabs",
      icon: "list",
      menu: "Tabs",
    },
    {
      link: "/progress",
      icon: "bar-chart-2",
      menu: "Progress Bar",
    },
    {
      link: "/toolbar",
      icon: "voicemail",
      menu: "Toolbar",
    },
    {
      link: "/progress-snipper",
      icon: "loader",
      menu: "Progress Snipper",
    },
    {
      link: "/tooltip",
      icon: "bell",
      menu: "Tooltip",
    },
    {
      link: "/snackbar",
      icon: "slack",
      menu: "Snackbar",
    },
    {
      link: "/slider",
      icon: "sliders",
      menu: "Slider",
    },
    {
      link: "/slide-toggle",
      icon: "layers",
      menu: "Slide Toggle",
    },*/
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
