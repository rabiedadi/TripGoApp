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
import {
    faUsers, faBedAlt, faCalendarAlt, faChevronDown, faWifi, faShuttleVan, faSmokingBan, faBath, faSwimmer,
    faHatChef, faEnvelopeOpenText, faConciergeBell, faVectorSquare, faWindowFrameOpen, faShower, faLampDesk,
    faUserTie, faGifts, faPlus, faBookmark as falBookmark } from '@fortawesome/pro-light-svg-icons';
import { faBadgeCheck } from '@fortawesome/pro-solid-svg-icons';
import { faMale, faBookmark as fasBookmark, faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import {AllDialogsComponents} from './home/dialogs/dialogs.components';
import {MatCheckboxModule} from "@angular/material/checkbox";


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        AppRoutingComponents,
        AllDialogsComponents
    ],
    imports: [
        SharedModule,
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({auth: authReducer}),
        EffectsModule.forRoot([AuthEffects]),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        ToastrModule.forRoot(),
        FontAwesomeModule,
        MatCheckboxModule,
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
