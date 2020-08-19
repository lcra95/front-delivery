import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	constructor(private loginService: LoginService, private router: Router) { }
	user
	password
	ngOnInit() {
		if (sessionStorage.getItem('user')) {
			this.router.navigate(['/producto']);
		}
	}
	login() {
		var params = {
			"user": this.user,
			"password": this.password
		}

		this.loginService.login(params).subscribe(data => {

			if (data["estado"] == 1) {
				var user = data["data"]
				sessionStorage.setItem('user', JSON.stringify(data))
				this.router.navigate(['/producto']);
			} else {
				alert("usuario no existe")
			}
		})
	}
}                                      