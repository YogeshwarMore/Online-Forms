import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { data } from '../model/formfilleddata';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {

  userdata: data | any =
    {
      user: {
        userid: 0,
        userfirstname: "",
        userlastname: "",
        useremailid: "",
        username: "",
        userpassword: ""
      },
      filldate: "",
      details: [{
        fieldname: "",
        value: ""
      }]
    }

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {

      if (params['data'] == undefined)
        return;
      const serializedData = params['data'];
      const data: data = JSON.parse(serializedData);
      this.userdata = data;
      console.log(data, ",", this.userdata);

    });

  }
}

