import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from '@components/app-root/app.component';
import { AvatarComponent } from '@components/avatar/avatar.component';
import { ContentEntrypointComponent } from '@components/content-entrypoint/content-entrypoint.component';
import { LeftSidenavOptionsComponent } from '@components/left-sidenav-options/left-sidenav-options.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { RightSidenavTitleComponent } from './components/right-sidenav-title/right-sidenav-title.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MainTaskFormComponent } from './components/main-task-form/main-task-form.component';
import { TaskHeadingComponent } from './components/task-heading/task-heading.component';
import { MobileBottomMainNavComponent } from './components/mobile-bottom-main-nav/mobile-bottom-main-nav.component';
import { MobileBottomSuggestionsComponent } from './components/mobile-bottom-suggestions/mobile-bottom-suggestions.component';
@NgModule({
  declarations: [
    AppComponent,
    ContentEntrypointComponent,
    AvatarComponent,
    LeftSidenavOptionsComponent,
    RightSidenavTitleComponent,
    MainTaskFormComponent,
    TaskHeadingComponent,
    MobileBottomMainNavComponent,
    MobileBottomSuggestionsComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
