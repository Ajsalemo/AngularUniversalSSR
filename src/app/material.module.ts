import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
@NgModule({
  imports: [MatSliderModule, MatSidenavModule],
  exports: [MatSliderModule, MatSidenavModule],
})
export class MaterialModule {}
