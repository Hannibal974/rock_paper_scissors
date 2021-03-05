import { Guid } from '../tools/guid';

export class User {
    uid: string;
    name: string;

    constructor(name: string) {
        this.uid = Guid.newGuid();
        this.name = name;
    }
}