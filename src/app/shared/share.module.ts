import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShortenPipe } from './pipe/shorten.pipe';
import { CopyDirective } from './directive/copy.directive';
import { ColorizeDirective } from './directive/colorize.directive';

@NgModule({
  declarations: [
    ShortenPipe,
    CopyDirective,
    ColorizeDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ShortenPipe,
    CopyDirective,
    ColorizeDirective
  ]
})
export class ShareModule { }
// commonly used