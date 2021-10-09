import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from '@auth0/auth0-angular';
import { AppComponent } from '@components/app-root/app.component';
import { AvatarComponent } from '@components/avatar/avatar.component';
import { ContentEntrypointComponent } from '@components/content-entrypoint/content-entrypoint.component';
import { LeftSidenavOptionsComponent } from '@components/left-sidenav-options/left-sidenav-options.component';
import { MainTaskFormComponent } from '@components/main-task-form/main-task-form.component';
import { MobileBottomSuggestionsComponent } from '@components/mobile-bottom-suggestions/mobile-bottom-suggestions.component';
import { RightSidenavTitleComponent } from '@components/right-sidenav-title/right-sidenav-title.component';
import { TaskHeadingComponent } from '@components/task-heading/task-heading.component';
import { environment } from 'src/environments/environment.prod';
import { AppRoutingModule } from './app-routing.module';
import { LandingComponent } from './components/landing/landing.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    ContentEntrypointComponent,
    AvatarComponent,
    LeftSidenavOptionsComponent,
    RightSidenavTitleComponent,
    MainTaskFormComponent,
    TaskHeadingComponent,
    MobileBottomSuggestionsComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: environment.AUTH0_DOMAIN,
      clientId: environment.AUTH0_CLIENT_ID,
    }),
  ],
  providers: [MatNativeDateModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
