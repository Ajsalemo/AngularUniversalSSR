import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
@NgModule({
  imports: [MatSidenavModule, MatIconModule, MatMenuModule],
  exports: [MatSidenavModule, MatIconModule, MatMenuModule],
})
export class MaterialModule {}
