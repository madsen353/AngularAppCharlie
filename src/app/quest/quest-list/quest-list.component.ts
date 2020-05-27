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
  //Quest array til at obevare quests modtaget fra serveren:
  allQuests = [];
  activeQuests = [];

  constructor(private http: HttpClient, private dbservie : DbserviceService) {
    
    this.dbservie.getAllQuests().subscribe(
      (suc) => {this.allQuests = suc},
      (error)=>{console.log(error)},
      ()=>{}  //Kodeblok til OnCompleted
    )
    
    // this.dbservie.getActiveQuests().subscribe(
    //   (suc) => {this.activeQuests = suc; console.log(suc)},
    //   (error)=>{console.log(error)},
    //   ()=>{console.log('Active quests fetched')}  //Kodeblok til OnCompleted
    // )

    this.dbservie.getQuestById(2).subscribe(
      (suc) => {this.activeQuests = suc; console.log(suc)},
      (error)=>{console.log(error)},
      ()=>{console.log('Quest fetched')}  //Kodeblok til OnCompleted
    )

  }

  public ngOnInit(): void {
  } 
}
