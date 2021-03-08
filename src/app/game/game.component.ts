import { Component, OnInit } from '@angular/core';
import { Choice } from '../models/choice';
import { Game } from '../models/game';
import { GameResult } from '../models/gameResult';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  public game: Game;
  public user: User;
  public choices = Object.keys(Choice);
  public ChoiceInstance = Choice;
  public selectedChoice: Choice;
  public iAChoice: Choice;
  public result: GameResult;
  public history: Game[];
  public winRate: number;
  public winCount: number;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.currentUser;
    this.history = [];
    this.winRate = 0;
    this.winCount = 0;
  }

  public selectChoice(choice: string) {
    this.selectedChoice = Choice[choice];
  }

  public battleIA() {
    this.iAChoice = Choice[Object.keys(Choice)[Math.floor(Math.random() * Object.keys(Choice).length)]];
    if (this.selectedChoice === this.iAChoice) {
      this.result = GameResult.EQUALITY;
      this.increaseHistory();
      return;
    }
    if (this.selectedChoice === Choice.CHOICE_1 && this.iAChoice === Choice.CHOICE_3 ||
      this.selectedChoice === Choice.CHOICE_2 && this.iAChoice === Choice.CHOICE_1 ||
      this.selectedChoice === Choice.CHOICE_3 && this.iAChoice === Choice.CHOICE_2) {
      this.result = GameResult.WIN;
      this.increaseHistory();
      return;
    }
    this.result = GameResult.LOST;
    this.increaseHistory();
  }

  private increaseHistory() {
    if (this.result === GameResult.WIN) {
      this.winCount++;
    }
    this.game = new Game(this.user);
    this.game.userChoice = this.selectedChoice;
    this.game.iAChoice = this.iAChoice;
    this.game.result = this.result;
    this.history.push(this.game);
    this.winRate = Number((this.winCount * 100 / this.history.length).toFixed(2));
  }

}
