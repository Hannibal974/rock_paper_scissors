import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { LoginComponent } from './login/login.component';
import { GameGuardService } from './services/game-guard.service';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'game', component: GameComponent, canActivate: [GameGuardService] },
    { path: '**', component: LoginComponent }
];
