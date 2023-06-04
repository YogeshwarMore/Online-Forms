import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { userdata } from '../model/userdata';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: any;
  loggedIn: any;
  userdata: userdata = {
    useremailid: '',
    username: '',
    userpassword: '',
    jwttoken: ''
  };

  constructor(private authService: SocialAuthService, private router: Router, private service: ServicesService) { }

  ngOnInit() {
    this.service.clear();
    this.authService.authState.subscribe((user) => {

      this.user = user;
      this.loggedIn = (user != null);

      this.userdata.useremailid = user.email;
      this.userdata.username = user.email;
      this.userdata.userpassword = "";
      this.userdata.jwttoken = user.idToken;

      this.service.check(this.userdata).subscribe(re => {

        this.service.setRoles(re.role);
        this.service.setToken(re.jwtToken);
        localStorage.setItem("userid", re.userid);
        if (re.role == 'admin') {
          this.router.navigate(['/home']);
        }

      });

    });

  }
}
