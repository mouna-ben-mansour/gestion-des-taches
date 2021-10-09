import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../services/user.service';
import {User} from '../models/user';

@Component({
	selector: 'profile-edit',
	templateUrl: '../views/profile.edit.html',
	providers: [UserService]
})

export class ProfileEditComponent implements OnInit {
	public title: string;
	public user: User;
	public status;
	public identity;
	public token;
	public loading;



	constructor(
		private _userService: UserService,
		private _route: ActivatedRoute,
		private _router: Router
	){
		this.title = 'Edit Profile';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
	}

	ngOnInit(){

		if(this.identity == null){
			this._router.navigate(['/login']);
		}else{
			
			this.user = new User(
				this.identity.sub,
				this.identity.role,
				this.identity.name,
				this.identity.surname,
				this.identity.email,
				this.identity.password
			);
		}
	}


	onSubmit(){

		
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