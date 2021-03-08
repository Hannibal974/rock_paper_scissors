import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Choice } from '../models/choice';
import { GameResult } from '../models/gameResult';
import { UserService } from '../services/user.service';
import { userServiceStub } from '../tools/unit-test-stub';

import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponent],
      providers: [
        { provide: UserService, useValue: userServiceStub() }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select new Choice from user input', () => {
    component.selectChoice('CHOICE_1');
    expect(component.selectedChoice).toEqual(Choice.CHOICE_1);
  });

  it('should called increaseHistory on battle vs IA', () => {
    component.selectedChoice = Choice.CHOICE_1;
    const spy = spyOn<any>(component, 'increaseHistory');
    component.battleIA();
    expect(spy).toHaveBeenCalled();
  });

  it('should increase user wins count', () => {
    component.result = GameResult.WIN;
    (<any>component).increaseHistory();
    expect(component.winCount).toEqual(1);
    expect(component.winRate).toEqual(100);
  });

  it('should increase IA wins count', () => {
    component.result = GameResult.LOST;
    (<any>component).increaseHistory();
    expect(component.winCount).toEqual(0);
    expect(component.iAWinCount).toEqual(1);
    expect(component.winRate).toEqual(0);
  });

  it('should NOT increase win count', () => {
    component.result = GameResult.EQUALITY;
    (<any>component).increaseHistory();
    expect(component.winCount).toEqual(0);
    expect(component.iAWinCount).toEqual(0);
    expect(component.winRate).toEqual(0);
  });

  it('should toggle stats displayed', () => {
    component.toggleDisplay('ranking');
    expect(component.display).toEqual('ranking');
  });
});
