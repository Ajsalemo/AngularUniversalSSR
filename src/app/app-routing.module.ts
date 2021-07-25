import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentEntrypointComponent } from "@components/content-entrypoint/content-entrypoint.component"

const routes: Routes = [
  { path: '', component: ContentEntrypointComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
