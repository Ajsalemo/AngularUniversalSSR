import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentEntrypointComponent } from '@components/content-entrypoint/content-entrypoint.component';
import { LandingComponent } from '@components/landing/landing.component';

const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  {
    path: 'tasks',
    component: ContentEntrypointComponent,
    pathMatch: 'full',
    runGuardsAndResolvers: 'always',
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
