import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { patternValidator } from 'app/shared/pattern-validator';
import { LoadingComponent } from '../loading/loading.component'
import { CookieService } from 'ngx-cookie';

// import service
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loading: boolean;
  constructor(private userService: UserService,
              private cookieService: CookieService) {
    this.loading = false;
  }

  loginForm: FormGroup;

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.loginForm = new FormGroup({
      // validate login form
      email: new FormControl('', [Validators.required, patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      password: new FormControl('', Validators.required),
      remember: new FormControl(),
    });
  }

  public login() {
    this.loading = true;
    console.log(this.loading)
    console.log("logining");
    this.userService.login(this.loginForm.value).subscribe(
      data => {
        console.log(data);
        console.log("login");
        let auth_token = data.headers.get('authorization');
        localStorage.setItem('auth-token', auth_token)
        localStorage.setItem('current-user', JSON.stringify(data.json()));
      },
      error => {
        console.log("invalid");
      }
    );
    console.log(this.loginForm.value);
  }
}
