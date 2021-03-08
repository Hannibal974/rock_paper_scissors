import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../models/user';

export const routerStub = () => ({
    navigate() { }
});

export const formBuilderStub = () => ({
    group() { return new FormGroup({ name: new FormControl() }); }
});

export const userServiceStub = () => ({
    currentuser: new User('test'),
    storeCurrentUser() { }
});

export const localStorageServiceStub = () => ({
    getItem(key: string) {
        if (key === 'ranking') {
            return [{
                user: new User('Test'),
                wins: 1,
                matchCount: 10
            }];
        }
    }
});