import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatNativeDateModule, MatOptionModule, MatRippleModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

import {MainSearchComponent} from './main-search/main-search.component';
import {NavbarComponent} from './navbar/navbar.component';

import {AngularSvgIconModule} from 'angular-svg-icon';
import {TranslateModule} from '@ngx-translate/core';

import {PluralPipe} from '../pipes/plural.pipe';
import {PhonePipe} from '../pipes/phone.pipe';
import {SafePipe} from '../pipes/safe.pipe';
import {navBarDialogs} from './navbar/dialogs/dialogs.components';
import {MatDialogModule} from '@angular/material/dialog';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [NavbarComponent, MainSearchComponent, PhonePipe, SafePipe, PluralPipe, navBarDialogs],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        RouterModule,
        AngularSvgIconModule.forRoot(),
        FontAwesomeModule,

        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatRippleModule,
        MatCheckboxModule,
        MatSelectModule,
        MatOptionModule,
        MatMenuModule,
        MatIconModule,
        MatDialogModule,
    ],
    exports: [
        TranslateModule,
        NavbarComponent,
        FormsModule,
        FontAwesomeModule,
        MainSearchComponent,
        MatRippleModule,
        MatSelectModule,
        MatOptionModule,
        PluralPipe,
        PhonePipe,
        SafePipe
    ]
})
export class SharedModule {

}
