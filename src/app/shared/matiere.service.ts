import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, forkJoin, map, of, tap } from 'rxjs';
import { Matiere } from '../models/matiere.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  constructor(private http:HttpClient , private storageService : StorageService ) { }

  // uri_api = 'http://localhost:8010/api/matieres';
    uri_api = 'https://back-api-nfim.onrender.com/api/matieres';

  getMatieres():Observable<any> {
    const options = this.storageService.formOptionJSON(true,this.storageService.getStorage().token) ;
    return this.http.get<Matiere[]>(this.uri_api,options);
  }

}
