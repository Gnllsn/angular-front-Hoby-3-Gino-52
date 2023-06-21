import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';
import { StorageService } from './shared/storage.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'Gestion de devoirs à rendre';
	nom:string = "";
	currentRoute:string = "";
	user : any;
	loggedIn:boolean = false;
	type = 1;

	
	constructor(
		public authService:AuthService, 
		private router:Router,
		private assigmmentsService:AssignmentsService,
    private storageService:StorageService
		) {		
			router.events.subscribe(event => {
				if(event instanceof NavigationEnd) {
					this.currentRoute = event.url;
				}
			});
		}
		
		ngOnInit() {
      this.setUser();
		}
		
		login() {
			// utilise l'authService pour se connecter
			if(this.authService.isActive()) {
				this.authService.logout();
			} else {
				this.router.navigate(["/"]);
			}
		}
		
		isLogged() {
			if(this.authService.loggedIn) {
				this.nom = "Michel Buffa";
			}
			return this.authService.loggedIn;
		}
		
		creerDonneesDeTest() {
			this.assigmmentsService.peuplerBDavecForkJoin()
			.subscribe(() => {
				console.log("Opération terminée, les 1000 données ont été insérées")
				
				// on refresh la page pour que la liste apparaisse
				// plusieurs manières de faire....
				window.location.reload();
			});
		}

    setUser(){
      var data = this.storageService.getStorage();
      this.user = data.user;
      this.loggedIn = true;
	  this.type = this.user.type;
    }
}
	