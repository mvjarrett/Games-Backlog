import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  onFormSubmit(): void {
    const userData = {
      user_id: 'testUser',
      password: 'testpass'
    };
    this.http.post('http://localhost:8080/signup', userData).subscribe((newUser) => {
      console.log('user should be created, check pgADMIN')
    });
  }
}
