import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';

import * as olProj from 'ol/proj';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

import { QuestStoreService } from '../../quest-store.service';
import { LoggerService } from '../../../shared/logger.service';
import { LocationService } from '../../location.service';

import { fromEvent } from 'rxjs';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  
  @ViewChild('zoominn') button : MatButton;
  
  buttonStream$: any;
  
  /* @Input() fortæller at en property er et input fra en Parent komponent. */
  @Input() lat : number = 1;
  @Input() long : number = 1;

  quest : any;

  title : string = "";


  /* @Output() giver os mulighed for at emitte events til parent */
  @Output() outData = new EventEmitter<string>();

  /* Property der holder på et Map objekt */
  map : Map;

  /* Vores map-komponent er interesseret i vores QuestStore, 
  fordi den holder på vores aktive quest. 
  Fordi vi har angivet quest$ som en observable, kan vi subscribe på den og få
  data når der sker ændringer. subscribe() tager tre argumenter - success, error og finally.
  Nå vi har success objektet tilrådighed, har vi et quest-objekt, som vi kan benytte
  til at opdatere vores kort.
  */
  constructor(
    private logger : LoggerService,
    private questStore : QuestStoreService,
    private locationService : LocationService
    ) {
      this.locationService.position$.subscribe(
        (suc)=>{console.log(suc);},
        (err)=>{console.log(err);},
        ()=>{} // Kodeblok til OnCompleted
      );
  }
  /* NgOninit kan benyttes til at initere kortet.  */
  ngOnInit(): void {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        })
      ],
      view: new View({
        center : olProj.fromLonLat([1, 1]), //https://openlayers.org/en/latest/apidoc/module-ol_proj.html
        zoom : 5
      })
    });

  }

  ngAfterViewInit(){
    this.questStore.quest$.subscribe(
      (suc)=>{
        //sette nye værdier for kortet med de data som kommer fra objektet
        this.map.getView().setCenter(olProj.fromLonLat([suc.long, suc.lat]))
      },
      (err)=>{console.log(err)},
      ()=>{} // Kodeblok til OnCompleted
    )
    


    //VI ved faktisk ikke hvad denne gør, hvis det ikke virker når vi har map data på quests, så lad det være live igen
   // Vi definerer her en nye Observable ved hjælp af fromEvent.
    //this.buttonStream$ = fromEvent(this.button._elementRef.nativeElement, 'click')
    // .subscribe(
    //   (suc)=>{
    //     res => console.log(res)
    //   },
    //   (err)=>{console.log(err)},
    //   ()=>{} // Kodeblok til OnCompleted
    // )
    //;
        
    this.buttonStream$.map((element)=>
    {element + 1 }).filter()
      .subscribe(()=>{
        this.map.getView().setZoom(<number>(this.map.getView().getZoom() + 1));
      })
  }

  /* Vi benytter os af OpenLayers API til at manipulere med kortet */
  zoomIn(){
    this.map.getView().setZoom(<number>(this.map.getView().getZoom() + 1));
    this.outData.emit("ZoomIn");
  }

  zoomOut(){
    this.map.getView().setZoom(<number>(this.map.getView().getZoom() - 1))
    this.outData.emit("ZoomOut");
  }
}