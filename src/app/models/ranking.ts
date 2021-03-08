import { User } from './user';

export class Ranking {
    user: User;
    wins: number;
    matchCount: number;

    constructor(user: User) {
        this.user = user;
    }
}