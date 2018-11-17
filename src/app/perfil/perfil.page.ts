import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  //items son todas las materias
  items:any
  creditosAprobados: number;
  //18 en lista 1
  cuantasPorAprobar: number;
  //materiasAprobadas se sacaran de local storage para asignarlas a una lista
  //mostrando asi en el perfil del usuario todas las materias que ha aprobado
  materiasAprobadas: any;
  materiasPorAprobar: any;
  mostrarAprobadas: Boolean;
  mostrarPorAprobar: Boolean;
  lista: any;

  constructor(public http: Http, public storage: Storage) { 
    this.getMaterias(storage);   
    storage.get("lista").then(lista =>{
      if(lista == undefined){
        this.lista = "lista1";
      }
      else{
        this.lista = lista;
      }
    })
  }

  getMaterias(storage) {
    return new Promise(resolve => {
      this.http.get('http://localhost:3000/materias')
      .pipe(map(res => res.json())).subscribe(items => {
        //get de la base de datos para asignar a items todas las materias
        this.items = items;
        this.cuantasPorAprobar = 61;
        this.creditosAprobados = 0;
        items.forEach(materia => {
          this.storage.set(materia.name, this.storage.get(materia.name));
        });
        this.getAprobadas();
        resolve(this.items);
      });
    });
  }


  getAprobadas(){
    this.materiasAprobadas = [];
    this.materiasPorAprobar = [];
    this.creditosAprobados = 0;
    let cuantas = 0;
    let cuantasPA = 61;
    return this.storage.forEach((aprobada,name) =>{
      if (name != "undefined"){
        if(aprobada === true){
        this.materiasAprobadas.push(name);
        cuantas = cuantas+1;
        cuantasPA = cuantasPA-1;
        this.creditosAprobados = cuantas*3;
        this.cuantasPorAprobar = cuantasPA;
        }
        else{
          this.materiasPorAprobar.push(name);
        }
      }
    }).then(()=> this.materiasAprobadas);
  }

  Seleccionada(){
    this.storage.set("lista", this.lista);
  }
  

  GoBack(){ //metodo que vuelve a la pagina anterior como un navegador comun
    window.history.back();
    location.reload();     
  }

  ngOnInit() {
    this.mostrarAprobadas = true;
    this.mostrarPorAprobar = false;
  }

}
