import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
// In app components and modules imports -------------------------------------------------------------------------------
import {SharedModule} from './mdl-shared/shared.module';
import {AppComponent} from './app.component';
import {AppRoutingComponents, AppRoutingModule} from './app-routing.module';
import {HomeDialogsComponents} from './home/dialogs/dialogs.components';
// translate modules imports -------------------------------------------------------------------------------------------
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
// Auth services and modules imports -----------------------------------------------------------------------------------
import {AuthGuard} from './auth/auth.guard';
import {AuthInterceptorService} from './auth/auth-interceptor.service';
import {AuthEffects} from './store/effects/auth.effects';
// NgRx store and Effects imports --------------------------------------------------------------------------------------
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './store/reducers/auth.reducers';
import {ToastrModule} from 'ngx-toastr';
// font awesome imports ------------------------------------------------------------------------------------------------
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {
    faBath,
    faBedAlt,
    faBookmark as falBookmark,
    faCalendarAlt,
    faChevronDown,
    faConciergeBell,
    faEdit,
    faEnvelopeOpenText,
    faGifts,
    faHatChef,
    faLampDesk,
    faShower,
    faShuttleVan,
    faSmokingBan,
    faSwimmer,
    faUsers,
    faUserTie,
    faVectorSquare,
    faWifi,
    faWindowFrameOpen,
    faBuilding,
    faHotel,
    faCaravan,
    faHomeLg,
    faStar as falStar,
    faCommentAltDots,
    faBoxCheck,
    faMoneyCheck,
    faMapSigns,
    faMapMarkedAlt,
    faDirections,
    faPhoneRotary,
    faPlus,
    faTrashAlt,
    faImages,
    faBell,
    faFileInvoice,
    faChevronRight,
    faChevronLeft,
    faSnowflake,
    faIdCard,
    faExclamationCircle,
    faCheckCircle,
    faMapMarkerAlt,
    faStarHalfAlt,
    faUserCircle,
    faParking,
    faUtensilsAlt,
    faCroissant, faTvAlt
} from '@fortawesome/pro-light-svg-icons';
import {faBadgeCheck, faShieldCheck} from '@fortawesome/pro-solid-svg-icons';
import {
    faBookmark as fasBookmark,
    faMale,
    faPlusCircle,
    faStar as fasStar,
    faThumbsUp
} from '@fortawesome/free-solid-svg-icons';
import { SurveyComponent } from './temporary/survey/survey.component';



export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [AppComponent, AppRoutingComponents, HomeDialogsComponents, SurveyComponent],
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
        FontAwesomeModule
    ],
    providers: [AuthGuard, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(
            faUsers, faBedAlt, faCalendarAlt, faChevronDown, faChevronRight, faChevronLeft, faEdit, faWifi, faShuttleVan,
            faSmokingBan, faBath, faSwimmer, faHatChef, faEnvelopeOpenText, faConciergeBell, faVectorSquare, faWindowFrameOpen,
            faShower, faLampDesk, faUserTie, faGifts, faPlusCircle, falBookmark, fasBookmark, faBadgeCheck, faMale, falStar,
            fasStar, faThumbsUp, faCommentAltDots, faBoxCheck, faMoneyCheck, faPlus, faTrashAlt, faImages, faSnowflake,
            faIdCard, faExclamationCircle, faCheckCircle, faMapMarkerAlt, faStarHalfAlt, faUserCircle,
            faParking, faUtensilsAlt, faCroissant, faTvAlt
        );
        library.addIcons(faMapSigns, faMapMarkedAlt, faDirections, faPhoneRotary, faShieldCheck, faBell, faFileInvoice);
        library.addIcons(faBuilding, faHotel, faCaravan, faHomeLg);
    }
}

// <div style="font-size: 1.2rem">
//     <fa-icon class="mx-2" [icon]="['fal', '']" size="1x" style="color: #5B636D"></fa-icon>
// </div>

// <fa-icon class="absolute right-0 mx-3 mt-1 pointer-events-none cursor-pointer"
// (click)="arrow_down_clicked()"
//     [icon]="['fal', 'chevron-down']" size="1x" style="color: #5B636D"></fa-icon>
