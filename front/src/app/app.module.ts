import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {AppRoutingComponents, AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {SharedModule} from './mdl-shared/shared.module';
import {AuthGuard} from './auth/auth.guard';
import {AuthInterceptorService} from './auth/auth-interceptor.service';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './store/effects/auth.effects';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './store/reducers/auth.reducers';
import {ToastrModule} from 'ngx-toastr';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faUsers, faBedAlt, faCalendarAlt, faChevronDown } from '@fortawesome/pro-light-svg-icons';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        AppRoutingComponents,
    ],
    imports: [
        SharedModule,
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({ auth: authReducer }),
        EffectsModule.forRoot([AuthEffects]),
        TranslateModule.forRoot({ loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient]} }),
        ToastrModule.forRoot(),
        FontAwesomeModule,
    ],
    providers: [
        AuthGuard,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(faUsers, faBedAlt, faCalendarAlt, faChevronDown);
    }
}
