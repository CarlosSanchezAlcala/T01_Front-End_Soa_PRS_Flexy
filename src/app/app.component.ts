import { Component } from '@angular/core';
import { AuthConfig, NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { MenssageService } from './components/component-funcionality/services/login/menssage.service';
import { LoginService } from './components/component-funcionality/services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Soa';

  isAdmin!: boolean;

  constructor(
    private oauthService: OAuthService,
    private messageService: MenssageService,
    private loginService: LoginService) {
    this.configure();
  }

  authConfig: AuthConfig = {

    issuer: 'http://localhost:9091/realms/SOA',
    redirectUri: window.location.origin,
    clientId: 'SOA',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    showDebugInformation: true,
  };

  configure(): void {
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocument().then(() => this.oauthService.tryLogin())
      .then(() => {
        if (this.oauthService.hasValidIdToken()) {
          this.isAdmin = this.loginService.getIsAdmin();
          const username = this.oauthService.getIdentityClaims()['preferred_username']
          this.messageService.sendMessage(username, this.loginService.getIsLoggerd(), this.isAdmin);
        }
      });

  }

}
