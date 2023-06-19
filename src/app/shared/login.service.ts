import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { ReplaySubject } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class LoginService {
	
	base_url :string = 'https://back-api-nfim.onrender.com/auth/' ; 
	// base_url :string = ' http://localhost:8010/auth/' ; 
	
	constructor(private http:HttpClient,private storageService: StorageService) { }
	
	login(data:any){
		return this.http.post(this.base_url+'login',data);        
	}
	
	async verify(){
		const result = await this.checkToken() ; 
		return result ; 
	}
	
	async checkToken(){
		const data = this.storageService.getStorage() ;
		if(!data || data===null || data==null) {
			return false;
		}
		const success = (response:any)=>{
			if (response.status == 200) {    
				return true;
			}else{	
				console.log(response.message);
				return false
			}
		}
		
		const error = (response:any)=>{
			console.log(response.message);
			return false;
		}
		
		const options = this.storageService.formOptionJSON(true,data.token) ; 
		return this.http.post(this.base_url+'check',null,options).subscribe(success,error);
	}
	
}
