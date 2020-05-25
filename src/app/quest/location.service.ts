import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LocationService {

  /**
   * Denne klasse skal tage fat i denne nuværende position. 
   * Hver eneste location bliver gemt som et element i subject (behaviorsubject multicasting).
  */

  /* BehaviorSubject er en Observable. En special Observable som multicaster til flere subscribers.
    (til forskel fra unicasting)
  */
  private readonly _pos = new BehaviorSubject<any>({});

  /* En eksponeret Obsevable som subscribers kan lytte på */
  public readonly position$ = this._pos;

  /* setter. Next metoden smider et nyt element i subject.  */
  private set pos(val: any) {
    this._pos.next(val);
  }

  /* Så snart locationsservice instantieres, begynder vi at lytte på positionen. */
  constructor() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((suc)=>{
        this.pos = suc;
      },(err)=>{
        console.log(err);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
}
