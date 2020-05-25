import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestListComponent } from './quest/quest-list/quest-list.component';
import { QuestDetailsComponent } from './quest/quest-details/quest-details.component';

/**
 * Reklarer alle dine routes her. 
 * Er der dynamiske routes fx når en bruger vælger et element fra en liste, 
 * og viewet er afhængig af input fra en click event på listen, skal du benytte dig af :id.
 */

const routes: Routes = [
  {
    path : 'quests',
    component : QuestListComponent
  },
  {
    path : 'quests/details/:id',
    component : QuestDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
