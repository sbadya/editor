/**
 * Feature module
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CodemirrorModule} from 'ng2-codemirror';

import {EditorComponent, UIComponent, Validator} from './index';

@NgModule({
    declarations: [EditorComponent, UIComponent],
    imports: [CodemirrorModule, FormsModule, CommonModule],
    exports: [EditorComponent, UIComponent],
    providers: [Validator]
})
export class UiToolModule {}