import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  imports: [MatSidenavModule, MatIconModule],
  exports: [MatSidenavModule, MatIconModule],
})
export class MaterialModule {}
