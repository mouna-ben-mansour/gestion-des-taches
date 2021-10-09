import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'user.list',
  templateUrl: '../views/user.list.component.html'
})
export class UserListComponent implements OnInit {

  public title: string;
	public identity;
	public token;
	public users: Array<User>;
	public pages;
	public pagePrev;
	public pageNext;
	public loading;
	public isAdmin;
	public TU;
	public user:User;
	public status;

	constructor(
		private _route	: ActivatedRoute,
		private _router	: Router,
		private _userService: UserService,
	){
		this.title = 'GESTION DES UTILISATEURS';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.isAdmin = _userService.isAdmin();
		this.TU = true;
	}

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(){
		this._route.params.forEach((params: Params) => {
			let page = +params['page'];

			if(!page){
				page=1;
			}

			this.loading = 'show';
			this._userService.getUsers(this.token, page).subscribe(
				response => {
					if(response.status == 'success'){
						this.users = response.data;	
						this.loading = 'hide';
					
						console.log('***',this.users);
						//total pages
						this.pages = [];
						for(let i=0; i < response.total_pages; i++){
							this.pages.push(i);
						}
						//previous page
						if(page>=2){
							this.pagePrev = (page - 1);
						}else{
							this.pagePrev = page;
						}
						//next page
						if(page < response.total_pages){
							this.pageNext = (page+1);
						}else{
							this.pageNext = page;
						}

					}
				},
				error => {
					console.log(<any>error);
				}
			);
		});
	}

	deleteUser(id){
		this._userService.deleteUser(this.token, id).subscribe(
			response => {
				if(response.status == 'success'){
					window.location.reload();
				}else{
					alert('User was not deleted');
				}
			},
			error =>{
				console.log(<any>error);
			}
		);
	}
	



	public filter = 0;
	public order = 0;
	public searchString;

}
