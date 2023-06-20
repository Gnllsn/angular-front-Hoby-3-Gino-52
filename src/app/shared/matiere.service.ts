import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, forkJoin, map, of, tap } from 'rxjs';
import { Matiere } from '../models/matiere.model';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  constructor(private http:HttpClient) { }

  // uri_api = 'http://localhost:8010/api/matieres';
    uri_api = 'https://back-api-nfim.onrender.com/api/matieres';

  getMatieres():Observable<any> {
    return this.http.get<Matiere[]>(this.uri_api);
  }

}
