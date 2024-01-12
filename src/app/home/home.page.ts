import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonContent, IonButton, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, RouterModule, IonGrid, IonRow, IonCol],
})
export class HomePage {
  constructor() {}
}
