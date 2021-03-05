import { Component, OnInit } from '@angular/core';
import { Choice } from '../models/choice';
import { Game } from '../models/game';
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
  public selectedChoice: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.currentUser;
    this.game = new Game(this.user);
  }

  public selectChoice(choice: string) {
    this.selectedChoice = choice;
  }

}
