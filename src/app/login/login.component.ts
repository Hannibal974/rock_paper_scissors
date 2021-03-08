import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { LocalStorageService } from '../services/local-storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: User;

  public loginForm: FormGroup;

  private users: User[] = [];

  /**
   * Constructor
   *
   * @param formBuilder
   * @param userService
   * @param router
   */
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  /**
   * OnInit
   */
  ngOnInit(): void {
    const ranking = this.localStorageService.getItem('ranking');
    if (!!ranking) {
      this.users = ranking.map((rank) => rank.user);
    }
    this.loginForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50), this.noWhitespaceValidator, this.noExistingName.bind(this)])
    });
  }

  /**
   * Method called by form submit
   */
  onSubmit() {
    this.user = new User(this.name.value);
    this.userService.storeCurrentUser(this.user);
    this.router.navigate(['game']);
  }

  /**
   * Getter on user input 'name' on form
   */
  get name() { return this.loginForm.get('name'); }

  /**
   * FormControl to check if name is only fill by whitespaces
   *
   * @param control
   */
  private noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ? { whitespace: true } : null;
  }

  /**
   * FormControl to check if user is already taken
   * 
   * @param control 
   */
  private noExistingName(control: FormControl) {
    if (this.users.length > 0) {
      const alreadyExist = this.users.filter((user) => user.name === control.value).length > 0;
      return alreadyExist ? { alreadyExist: true } : null;
    }
    return null;
  }
}
