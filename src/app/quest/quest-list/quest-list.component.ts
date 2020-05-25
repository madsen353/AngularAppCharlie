import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Injectable } from '@angular/core';


import { LocationService } from '../location.service';
import { HttpClient } from '@angular/common/http';
import { DbserviceService } from 'src/app/dbservice.service';


@Component({
  selector: 'app-quest-list',
  templateUrl: './quest-list.component.html',
  styleUrls: ['./quest-list.component.scss']
})

export class QuestListComponent implements OnInit {
  //Quest collection
  // quests : any;
  questServer = [];

  quests = [{
    id: 1,
    title: "den første quest"
  }, {
    id: 2,
    title: "den anden quest"
  }, {
    id: 3,
    title: "den tredje quest"
  }];




  questCtrl = new FormControl();
  filteredQuests: Observable<any[]>;

  constructor(private http: HttpClient, private dbservie : DbserviceService) {
    this.dbservie.getAllQuests().subscribe(
      (suc) =>{console.log(suc)},
      (error)=>{console.log(error)},
      ()=>{console.log("done")})
    
  }
  /* Vores app skal have en liste af objekter som kan vises i brugergrænsefladen */

  // getPossibleQuests(){
  //   this.dbservie.getAllQuests().subscribe(
  //     (result)=>{console.log(result)}
  //   );
  // }
  public ngOnInit(): void {
  } 
}
