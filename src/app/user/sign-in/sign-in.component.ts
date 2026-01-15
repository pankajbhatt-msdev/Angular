import { Component } from '@angular/core';
import { IUserCredentials } from '../user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bot-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  credentials: IUserCredentials = { email: '', password: ''};
  signInError: boolean = false;
  signInErrorMessage = '';
  constructor(private userService : UserService, private router : Router) { }

  signIn(){
    this.signInError = false;
    this.signInErrorMessage = '';
    this.userService.signIn(this.credentials).subscribe({
      next: ()=> this.router.navigate(['/catalog']),
      //error: ()=> (this.signInError = true)
      error: (errorMessage: string) => {
      this.signInError = true;
      this.signInErrorMessage = errorMessage;
    }
    });
  }
}
