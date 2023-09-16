import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MessagesComponent } from './messages/messages.component'
import { CoreModule } from './core/core.module'
import { ShareModule } from './shared/share.module'
import { TagManagerComponent } from './tag-manager/tag-manager.component'
import { HttpClientModule } from '@angular/common/http'
@NgModule({
  declarations: [AppComponent, MessagesComponent, TagManagerComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ShareModule,
    CoreModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
