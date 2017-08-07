import {Component, ViewChild} from '@angular/core';

import {EditorComponent} from './uiTool/index';

@Component({
    moduleId: module.id,
    selector: 'uiTool-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent {
    private structures;
   
    @ViewChild(EditorComponent)
    private editor: EditorComponent;

    constructor() {
        this.structures = [];
    }

    private update(structure) {
        this.editor.editorCode = {
            structure: structure,
            action: 'update'
        };
    }

    private add(event) {
        event.preventDefault();

        // Hardcode structure value instead changing itself 
        let structure = {
            type: 'blockType1',
            title: {
                key: '',
                value: ''
            },
            description: {
                key: '',
                value: ''
            }      
        };
        this.editor.editorCode = {
            structure: structure,
            action: 'add'
        };
    }

    private delete(structure) {
        this.editor.editorCode = {
            structure: structure,
            action: 'delete'
        };
    }

    private updateUI(structures) {
        this.structures = structures;
    }
}