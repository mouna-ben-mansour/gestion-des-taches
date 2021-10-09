import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'user.edit',
  templateUrl: '../views/user.edit.component.html',
})
export class UserEditComponent implements OnInit {

  public title: string;
	public user;
	public status;
	public token;
	public loading;
	public Choice;



	constructor(
		private _userService: UserService,
		private _route: ActivatedRoute,
		private _router: Router
	){
		this.title = 'Edit Profile';
		this.token = this._userService.getToken();
	}

	ngOnInit(){
this.getUser();
		
	}

	
	getUser(){
		this.loading = 'show';
		this._route.params.forEach((params: Params) => {
			let id = +params['id'];

			this._userService.getUser(this.token, id).subscribe(
				response => {
					console.log(response);
					if(response.status == 'success'){
						    this.user = response.data;
							this.loading = 'hide';
							this.Choice=this.user.role;


					}else{
						this._router.navigate(['/login']);
					}
				},
				error => {
					console.log(<any>error);
				}
			);
		});
	}

	onSubmit(){
		this.user.role = this.Choice;

		this._userService.update_user(this.user).subscribe(
			
			response=>{

				console.log(response.status);
				
				this.status = response.status;
				if(this.status != 'success'){
					this.status = 'error';
				}else{
					this._router.navigate(['/user-list']);
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}

}
