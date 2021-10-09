import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'user-new',
  templateUrl: '../views/user.new.html',
  providers: [UserService]
})
export class UserNewComponent implements OnInit {
  public title: string;
	public user: User;
	public status;
	public identity;
	public token;
	public Choice = 'user';


  constructor(
    private _userService: UserService,
    private _router : Router
  ) { 
    this.title = 'Add Account';
    this.identity = _userService.getIdentity();
  
  }

  ngOnInit(){
		if(this.identity == null){
			this._router.navigate(['/login']);
			this.Choice = 'user';
			
		}
    else{
      this.user = new User(1,'','','','','');

    }
	}
  onSubmit(){
	  this.user.role = this.Choice;
	console.log(this.user);

		
		this._userService.register(this.user).subscribe(
			
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
