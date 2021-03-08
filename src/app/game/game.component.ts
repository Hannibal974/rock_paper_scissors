import { Component, OnInit } from '@angular/core';
import { Choice } from '../models/choice';
import { Game } from '../models/game';
import { GameResult } from '../models/gameResult';
import { Ranking } from '../models/ranking';
import { User } from '../models/user';
import { LocalStorageService } from '../services/local-storage.service';
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
  public choiceInstance = Choice;
  public selectedChoice: Choice;
  public iAChoice: Choice;
  public result: GameResult;
  public history: Game[];
  public winRate: number;
  public iAWinCount: number;
  public winCount: number;
  public display = 'statistiques';
  public ranking: Ranking[];

  constructor(private userService: UserService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.user = this.userService.currentUser;
    this.history = [];
    this.winRate = 0;
    this.winCount = 0;
    this.iAWinCount = 0;
    this.ranking = this.localStorageService.getItem('ranking') || [];
    this.ranking = this.ranking.sort((a, b) => Number((a.wins * 100 / a.matchCount) > Number((b.wins * 100 / b.matchCount)) ? -1 : 1));
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

  public toggleDisplay(display: string) {
    this.display = display;
  }

  private increaseHistory() {
    if (this.result === GameResult.WIN) {
      this.winCount++;
    } else if (this.result === GameResult.LOST) {
      this.iAWinCount++;
    }
    this.game = new Game(this.user);
    this.game.userChoice = this.selectedChoice;
    this.game.iAChoice = this.iAChoice;
    this.game.result = this.result;
    this.history.push(this.game);
    this.winRate = Number((this.winCount * 100 / this.history.length).toFixed(2));
    const rank = this.ranking.filter((_rank) => _rank.user && _rank.user.uid === this.user.uid);
    if (!!rank[0]) {
      rank[0].matchCount++;
      rank[0].wins += this.result === GameResult.WIN ? 1 : 0;
    } else {
      const rankedPlayer = new Ranking(this.user);
      rankedPlayer.matchCount = 1;
      rankedPlayer.wins = this.result === GameResult.WIN ? 1 : 0;
      this.ranking.push(rankedPlayer);
    }
    this.localStorageService.setItem('ranking', JSON.stringify(this.ranking));
    this.ranking = this.ranking.sort((a, b) => Number((a.wins * 100 / a.matchCount) > Number((b.wins * 100 / b.matchCount)) ? -1 : 1));
  }
}
