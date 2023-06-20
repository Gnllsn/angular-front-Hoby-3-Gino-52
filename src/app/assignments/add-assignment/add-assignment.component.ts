import { Component } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { MatiereService } from 'src/app/shared/matiere.service';
import { StorageService } from 'src/app/shared/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent {

  // champs du formulaire
  nomDevoir = "";
  dateDeRendu!: Date;
  matiere : any ;
  matieres = [];
  user : any;

  constructor(private assignmentsService: AssignmentsService, 
              private matiereService: MatiereService,
              private storageService: StorageService,
              private router:Router) { }

  ngOnInit(): void {
    this.getMatieres();    
    this.setUser();
  }

  onSubmit(event: any) {
    // On vérifie que les champs ne sont pas vides
    if (this.nomDevoir === "") return;
    if (this.dateDeRendu === undefined) return;

    let nouvelAssignment = new Assignment();
    // génération d'id, plus tard ce sera fait dans la BD
    nouvelAssignment.id = Math.abs(Math.random() * 1000000000000000);
    nouvelAssignment.auteur = this.user;
    nouvelAssignment.nom = this.nomDevoir;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;
    nouvelAssignment.matiere = this.matiere._id;
    nouvelAssignment.prof = this.matiere.profId;
    // nouvelAssignment.matiere = "6490fcfe89e6dbac5e6ff983";
    console.log(this.matiere);

    // on demande au service d'ajouter l'assignment
    this.assignmentsService.addAssignment(nouvelAssignment)
      .subscribe(message => {
        console.log(message);
        console.log(nouvelAssignment);
        // On va naviguer vers la page d'accueil pour afficher la liste
        // des assignments
        this.router.navigate(["/home"]);

      });
  }

  getMatieres(){
    this.matiereService.getMatieres()
    .subscribe(data => {
      this.matieres = data;
      console.log("Matières reçues");
      console.log(this.matieres);
      for (let i = 0; i < this.matieres.length ; i++) {
        console.log(this.matieres[i]['id']);
      }
    });
  }

  setUser(){
    var data = this.storageService.getStorage();
    this.user = data.user;
  }
}
