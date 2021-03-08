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