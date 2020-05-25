import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestStoreService } from '../quest-store.service';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-quest-details',
  templateUrl: './quest-details.component.html',
  styleUrls: ['./quest-details.component.scss']
})
export class QuestDetailsComponent implements OnInit {

  /* Vores quest detail skal have en Quest. Normalt ville den komme fra en DB, men til at starte med hardcoder vi denne */
  quest = {
    id : 1,
    title : "den første quest",
    description : "...",
    date : "",
    lat: 56,
    long: 9,
    challenges : [{
      title : "Første post",
      description :"Beskrivelse af første post",
      lat : 56,
      long : 9,
      question : "..."
    }]
  }

  constructor(
    /* For at kunne benytte ActivatedRoute injecter vi denne i klassen */
    private route: ActivatedRoute,
    private questStore : QuestStoreService
  ) {
    setTimeout(() => {
      this.questStore.addQuest("title", 10, 10);
    }, 5000);
  }

  isZooming(data: string){
    console.log(data)
  }

  ngOnInit(): void {
    /*  ActivatedRoute har en snapshot funktion der tager paramteret fra uri. 
        Alternativt til Snapshot er anvendelsen af Observables.
    */
    let id = this.route.snapshot.paramMap.get('id');
  }
}
