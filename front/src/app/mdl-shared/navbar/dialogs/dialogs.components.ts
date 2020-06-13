import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Subject} from 'rxjs';
import {AUTH_ACTIONS, AuthActionTypes, LogIn, LogOut, ResetMessages, SignUp} from '../../../store/actions/auth.actions';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Action, Store} from '@ngrx/store';
import {AppState} from '../../../store/app.states';
import {Actions, ofType} from '@ngrx/effects';
import {takeUntil, tap} from 'rxjs/operators';

// Dialog1 ==========================================================================
@Component({
    selector: 'app-establishment-select',
    templateUrl: 'templates/establishment_select.html',
    styleUrls: ['./dialog-components.css']
})
export class EstablishmentSelectComponent implements OnDestroy {
    constructor(
        private dialogRef: MatDialogRef<EstablishmentSelectComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {}
    ) {
    }

    destroyed$ = new Subject<boolean>();

    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    closeDialog() {
        this.dialogRef.close();
    }

}

// Dialog2 ==========================================================================
@Component({
    selector: 'app-establishment-select',
    templateUrl: 'templates/signup.html',
    styleUrls: ['./dialog-components.css']
})
export class SignUpComponent implements OnInit, OnDestroy {
    destroyed$ = new Subject<boolean>();
    submitted = false;
    registerForm: FormGroup;
    errorCode: string;

    onRegisterSubmit() {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }
        const info = {
            fullName: this.registerForm.value.fullName,
            password: this.registerForm.value.password,
            email: this.registerForm.value.email
        };
        this.store.dispatch(new SignUp(info));
    }

    closeDialog() {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            conditions: [false, Validators.required],
            fullName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    constructor(
        private dialogRef: MatDialogRef<SignUpComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {},
        private formBuilder: FormBuilder,
        private store: Store<AppState>,
        private updates$: Actions,
    ) {
        updates$.pipe(
            ofType(AuthActionTypes.SUCCESS, AuthActionTypes.FAILURE),
            takeUntil(this.destroyed$),
            tap((action: AUTH_ACTIONS) => {
                if (action.type === '[USER AUTH] failure') {
                    this.errorCode = 'code' + action.payload.error.error.code;
                    this.store.dispatch(new ResetMessages('FailureMessage'));
                } else {
                    this.closeDialog();
                }
            })
        ).subscribe();
    }
}

// Dialog3 ==========================================================================
@Component({
    selector: 'app-establishment-select',
    templateUrl: 'templates/login.html',
    styleUrls: ['./dialog-components.css']
})
export class LoginComponent implements OnInit, OnDestroy {

    destroyed$ = new Subject<boolean>();
    submitted = false;
    loginForm: FormGroup;
    errorCode: string;

    onLoginSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        const info = {
            password: this.loginForm.value.password,
            login: this.loginForm.value.email
        };
        this.store.dispatch(new LogIn(info));
    }

    closeDialog() {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    constructor(
        private dialogRef: MatDialogRef<SignUpComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {},
        private formBuilder: FormBuilder,
        private store: Store<AppState>,
        private updates$: Actions,
    ) {
        updates$.pipe(
            ofType(AuthActionTypes.SUCCESS, AuthActionTypes.FAILURE),
            takeUntil(this.destroyed$),
            tap((action: AUTH_ACTIONS) => {
                if (action.type === '[USER AUTH] failure') {
                    this.errorCode = 'code' + action.payload.error.error.code;
                    this.store.dispatch(new ResetMessages('FailureMessage'));
                } else {
                    this.closeDialog();
                }
            })
        ).subscribe();
    }

}

export const navBarDialogs = [EstablishmentSelectComponent, SignUpComponent, LoginComponent];
