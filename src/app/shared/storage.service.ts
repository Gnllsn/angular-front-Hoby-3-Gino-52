import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class StorageService {
	
	constructor() { }
	
	formOptionJSON (use_authorization = false,token : any) {
		const options:any = {
			headers: {
				'Content-Type' : 'application/json'
			}
		};
		if (use_authorization) {
			options['headers']['authorization'] ="Bearer " + token;
		}
		return options;
	}

	storeActiveUser (data:any) {
		localStorage.setItem('data',btoa(escape(JSON.stringify(data))));
	}

	getStorage(){
		const data = localStorage.getItem('data') ; 
		if (data) {
			try{
				return JSON.parse(unescape(atob(data)));
			}catch(err){
				return null ; 
			}
		}else{
			return null;
		}
	}
}
