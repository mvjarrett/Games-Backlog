import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
  }
  onFormSubmit(): void {
    const userData = {
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value
    };
    this.http.post('http://localhost:8080/users/login', userData).subscribe((res: any) => {
      console.log(res);
      if (res['token']) {
        localStorage.setItem('token', res['token']); //token here is stored in a local storage
        console.log(localStorage)
  
        return this.http.get('/backlog', {headers: {'jwt': localStorage['token']}} )
      } console.log('you blew it')
      return null
    },
    (err) => {
      console.log(err);
    }
  );    
}
//       // if (newUser.registered = 0) {
//       //   console.log('toast: ', newUser.message);
//       // } else {
//       //   this.route.navigate(['/backlog']);
//       // }
//       if (res['jwt']) {
//         localStorage.setItem('token', res['jwt']);
//     });
// }
    // if(newUser){
    //   this.route.navigate(['/page']);
    // }
}




//------------------------NOTES-----------------------

// CURRENTLY not working. i think i need to run an HTTP_INTERCEPTOR or something to take the token from local storage and 
// pass it as a Header, and then check that header against my backend JWT token. if my thinking is correct, that should
// intercept all HTTP traffic, unless router.navigate isn't technically HTTP traffic. 
// otherwise, find another solution. currently, backent generates a token and returns it to the front end, and it is in fact
// stored in local storage. not sure how to proceed yet but will continue pressing forward until issue is resolved.
// 