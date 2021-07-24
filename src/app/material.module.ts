import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
@NgModule({
  imports: [MatSidenavModule, MatIconModule, MatMenuModule],
  exports: [MatSidenavModule, MatIconModule, MatMenuModule],
})
export class MaterialModule {}
