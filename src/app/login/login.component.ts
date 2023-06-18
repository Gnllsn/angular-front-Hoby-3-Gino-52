import { Component } from '@angular/core';
import { FormControl,FormBuilder,Validators} from '@angular/forms';
import { LoginService } from '../shared/login.service';
import { StorageService } from '../shared/storage.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	
})
export class LoginComponent {
	hide = true;
	formulaire_Control : any ; 
	user : any = {} ;
	error : any = {} ; 
	loading !: boolean ;
	
	constructor(
		private router : Router ,
		private loginService : LoginService ,
		private storageService : StorageService ,
		private formBuilder: FormBuilder) { 
			this.formulaire_Control = formBuilder.group({
				name : ['',[Validators.required]],
				password: ['',[Validators.required]]
			});
		}
		
		ngOnInit(): void {
			this.user.name = "" ;
			this.user.password = "" ;
			this.error.css = {} ; 
			this.error.bool = {} ; 
			this.error.texte = {} ; 
		}	
		
		Control_Valeur(){
			this.check_valeur_name();
			if(this.error.bool.name)return ;
			this.check_valeur_password();
			if(this.error.bool.password) return ;
			if(this.formulaire_Control.valid){
				this.user.name = this.formulaire_Control.get("name").value;
				this.user.password = this.formulaire_Control.get("password").value;
				this.login();
			}
		}
		
		check_valeur_name(){
			if(this.formulaire_Control.controls.name.errors?.required){
				this.error.css.name = "is-invalid" ;
				this.error.bool.name = true ; 
				this.error.texte.name = "Champ requis" ; 
			}
			else{
				this.error.bool.name = false ; 
				this.error.texte.name = "" ; 
				this.error.css.name = "is-valid" ;
			}
		}
		
		check_valeur_password(){
			if(this.formulaire_Control.controls.password.errors?.required){
				this.error.css.password = "is-invalid" ;
				this.error.bool.password = true ; 
				this.error.texte.password = "Champ requis" ;
			}
			else{
				this.error.bool.password = false ; 
				this.error.css.password = "is-valid" ; 
			}
		}
		
		login(){
			this.loading = true ; 
			const success = (response:any)=>{
				if (response.status == 200) {    
					this.loading = false ;      
					this.storageService.storeActiveUser(response.data);
					this.router.navigate(['/'])
				}else{
					this.loading = false ;    
					if(response.message.toString().toLowerCase().includes('user')){
					    this.error.css.name = "is-invalid" ;
					    this.error.bool.name = true ; 
					    this.error.texte.name = response.message ;                      
					}else if(response.message.toString().toLowerCase().includes('passe')){
						this.error.css.password = "is-invalid" ;
					    this.error.bool.password = true ; 
					    this.error.texte.password = response.message ;                
					} else {
					console.log(response.message);
					}
				}
			}
			const error = (response:any)=>{
				console.log(response.message);
				this.loading = false ;    
			}
			this.loginService.login(this.user).subscribe(success,error);
		}
		
	}
	