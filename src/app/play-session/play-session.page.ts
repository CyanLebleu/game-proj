import { Answer } from './../model/answer.model';
import { ApiService } from './../service/api.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { Series } from '../model/series.model';
import { addIcons } from 'ionicons';
import { bulb, exit, playSkipForward } from 'ionicons/icons'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-play-session',
  templateUrl: './play-session.page.html',
  styleUrls: ['./play-session.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class PlaySessionPage implements OnInit {

  private series: any;

  public currentQuestion = 0;
  public statement = '';
  public coins = 0;
  public xp = 0;
  public hints = 4;
  public skips = 5;
  public options = new Array<Answer>();
  public hintTaken = false;

 
  constructor(private api: ApiService, private router: Router) {
    addIcons({ bulb, exit, playSkipForward });
   }

  ngOnInit() {
    this.api.getToken();
    this.api.getQuestionsWithTracking().subscribe((series) => {
      this.series = series
      this.buildOptions();
    })
  }

  private buildOptions = () => {
    this.statement = this.series?.results[this.currentQuestion].question;
    this.series?.results[this.currentQuestion].incorrect_answers.forEach((answer: string) => {
      this.options.push({text: answer, correct: false, enabled: true})
    });
    this.options.push({text: this.series?.results[this.currentQuestion].correct_answer, correct: true, enabled: true});
    this.options = this.shuffle(this.options);
    console.log(this.series?.results[this.currentQuestion].correct_answer);
  }

  private shuffle = (array: Array<any>) => { 
    for (let i = 3; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  }

  private reset = () => {
    this.options = [];
    this.hintTaken = false;
    this.buildOptions();
  }

  private exit() {
    this.currentQuestion = 0;
    this.statement = '';
    this.coins = 0;
    this.xp = 0;
    this.hints = 4;
    this.skips = 5;
    this.options = new Array<Answer>();
    this.hintTaken = false;
    this.router.navigate(['/'])
  }

  public hint = () => {
    if (this.hints <= 0 || this.hintTaken) {
      return
    }
    
    this.hints -= 1;
    var indexes = [0, 1, 2, 3];
    indexes = this.shuffle(indexes);
    this.options[indexes[0]].enabled = this.options[indexes[0]].correct
    this.options[indexes[1]].enabled = this.options[indexes[1]].correct

    this.hintTaken = true;
  }

  public skip = () => {
    if (this.currentQuestion < 8 && this.skips > 0) {
      this.currentQuestion += 1;
      this.skips -= 1;
      this.reset();
    }
  }

  public chooseAnswer = (answer: Answer) => {
    if (answer.correct) {
      if (this.currentQuestion == 9) {
        this.exit();
        return;
      }

      this.currentQuestion +=1;
      this.coins += 5;
      this.xp += 1;
      this.reset();
      return;
    }

    this.reset();
    this.exit();
  }

}
