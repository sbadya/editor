/**
 * Root module
 */
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {UiToolModule} from './uiTool/uiTool.module';

import {AppComponent} from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, UiToolModule],
    bootstrap: [AppComponent]
})
export class AppModule {}