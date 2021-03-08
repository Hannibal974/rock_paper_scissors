import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { UserService } from '../services/user.service';
import { formBuilderStub, routerStub, userServiceStub, localStorageServiceStub } from '../tools/unit-test-stub';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: FormBuilder, useValue: formBuilderStub() },
        { provide: UserService, useValue: userServiceStub() },
        { provide: Router, useValue: routerStub() },
        { provide: LocalStorageService, useValue: localStorageServiceStub() }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate on submit playername', () => {
    const routerSpy = spyOn((<any>component).router, 'navigate');
    const userSpy = spyOn((<any>component).userService, 'storeCurrentUser');
    component.onSubmit();
    expect(routerSpy).toHaveBeenCalledWith(['game']);
    expect(userSpy).toHaveBeenCalled();
  });
});
