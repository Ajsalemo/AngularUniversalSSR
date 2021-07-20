import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '@components/app-root/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ContentEntrypointComponent } from '@components/content-entrypoint/content-entrypoint.component';
import { AvatarComponent } from '@components/avatar/avatar.component';
import { SidenavOptionsComponent } from '@components/sidenav-options/sidenav-options.component';

@NgModule({
  declarations: [AppComponent, ContentEntrypointComponent, AvatarComponent, SidenavOptionsComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
