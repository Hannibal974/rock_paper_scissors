import { Guid } from '../tools/guid';
import { Choice } from './choice';
import { GameResult } from './gameResult';
import { User } from './user';

export class Game {
    uid: string;
    player: User;
    userChoice: Choice;
    iAChoice: Choice;
    result: GameResult;
    timestamp: number;

    /**
     * Constructor
     * 
     * @param player 
     */
    constructor(player: User) {
        this.uid = Guid.newGuid();
        this.player = player;
        this.timestamp = Date.now();
    }
}
