import {Component, Output, EventEmitter, ViewChild} from '@angular/core';

import {config} from './config';
import {Validator} from '../../providers/validator.provider';

@Component({
    moduleId: module.id,
    selector: 'editor',
    templateUrl: 'editor.component.html',
    styleUrls: ['editor.component.css']
})
export class EditorComponent {
    private config;
    private validationMessage;

    @ViewChild('cm')
    private cm;

    @Output()
    onUpdateUI: EventEmitter<any> = new EventEmitter();

    constructor(private validator: Validator) {
        this.config = config;
    }

    set editorCode(config) {
        let structures = [];
        let str = JSON.stringify(config.structure, (key, value) => {
            if (key === 'to' || key === 'from') {
                return; 
            }
            return value;
        }, '\t');

       
        switch (config.action) {
            case 'delete':
                this.cm.instance.replaceRange('', config.structure.from, config.structure.to);
                this.validateData();
                break;
            case 'add':
                this.cm.instance.replaceRange(str, {ch: 0, line: this.cm.instance.lineCount()});
                this.validateData();
                break;
            default:
                this.cm.instance.replaceRange(str, config.structure.from, config.structure.to);
        }
    }
    
    private parseStructure() {
        let reg = /{[\s\S]*?}(?=\s*{|\s*$)/gi;
        let code = this.cm.instance.getValue();
        let from = {line: 0, ch: 0};
        let arr = code.match(reg) || [];
        debugger;
        return arr.map((jsonItem) => {
            let searchCursor = this.cm.instance.getSearchCursor(jsonItem, from);
            searchCursor.findNext();

            from = searchCursor.to();

            return {
                jsonItem: jsonItem,
                from: searchCursor.from(),
                to: searchCursor.to()
            };
        });
    }
    private validateData() {
        let structures = [];
        let arr = this.parseStructure();
        this.validationMessage = '';
        
        arr.forEach((obj) => {
            let result = this.validator.validate(obj.jsonItem);

            if (result instanceof Error) {
                !this.validationMessage && (this.validationMessage = result.message);
            
            } else {
                result.from = obj.from;
                result.to = obj.to;
                structures.push(result);
            }
        });
        this.onUpdateUI.emit(structures);
    }
}