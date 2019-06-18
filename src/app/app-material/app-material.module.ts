import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatInputModule,
  MatButtonModule,
  MatIconModule
} from "@angular/material";

@NgModule({
  declarations: [],
  imports: [CommonModule, MatInputModule, MatButtonModule, MatIconModule],
  exports: [MatInputModule, MatButtonModule, MatIconModule]
})
export class AppMaterialModule {}
