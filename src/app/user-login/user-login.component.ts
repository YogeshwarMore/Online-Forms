import { Component } from '@angular/core';
import { userdata } from '../model/userdata';
import { Router } from '@angular/router';
import { ServicesService } from '../services/services.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {

  user: any;
  loggedIn: any;
  userdata: userdata = {
    useremailid: '',
    username: '',
    userpassword: '',
    jwttoken: ''
  };

  constructor(private authService: SocialAuthService,
    private router: Router,
    private service: ServicesService) { }

  ngOnInit() {
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

        if (re.role === 'admin' || re.role === 'user') {
          const versionid = localStorage.getItem('versionid');
          console.log(versionid);
          const formid = localStorage.getItem('formid');
          console.log(formid);
          if (versionid) {
            localStorage.removeItem('versionid');
            this.router.navigate(['/fillform'], { queryParams: { i: formid, j: versionid } });
          }
        }

      });

    });

  }

}
