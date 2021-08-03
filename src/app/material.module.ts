import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
@NgModule({
  imports: [
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatListModule,
  ],
  exports: [
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatListModule,
  ],
})
export class MaterialModule {}
