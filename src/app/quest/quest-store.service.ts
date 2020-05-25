import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class QuestStoreService {
  
  /** A simple state management service, that handle the active quest, the challenges, etc.
    https://dev.to/avatsaev/simple-state-management-in-angular-with-only-services-and-rxjs-41p8 

    This service will keep the information of an activated and ongoing quest and all its challenges.
    We should 'flush' the store when a new quest is activated.
    */

  // https://www.learnrxjs.io/learn-rxjs/subjects/behaviorsubject

  // 1. ny subject bliver lavet _quest. Denne skal være private.
  private readonly _quest = new BehaviorSubject<any>({});

  // 2. Vores Oberservable som subscribers kan lytte på.
  readonly quest$ = this._quest;

  // 3. setter
  private set quest(val: any) {
    this._quest.next(val);
  }

  // 4. public addQuest der kan anvendes til at aktivere en quest.
  addQuest(title: string, lat : number, long : number) {
    // we assaign a new copy of todos by adding a new todo to it 
    // with automatically assigned ID ( don't do this at home, use uuid() )
    this.quest = {title, lat, long};
  }
}