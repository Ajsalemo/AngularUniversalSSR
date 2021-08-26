import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
@NgModule({
  imports: [
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatListModule,
    MatProgressBarModule,
    MatButtonModule,
  ],
  exports: [
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatListModule,
    MatProgressBarModule,
    MatButtonModule,
  ],
})
export class MaterialModule {}
