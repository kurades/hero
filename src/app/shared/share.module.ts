import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShortenPipe } from './pipe/shorten.pipe';
import { CopyDirective } from './directive/copy.directive';



@NgModule({
  declarations: [
    ShortenPipe,
    CopyDirective
  ],
  imports: [
    CommonModule,

    FormsModule,

    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [TitleCasePipe, CopyDirective],
  exports: [
    CommonModule,

    FormsModule,
    
    ReactiveFormsModule,
    NgbModule,
    ShortenPipe,
    CopyDirective
  ]
})
export class ShareModule { }
// commonly used