import {Component, Output, EventEmitter} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'ui-component',
    templateUrl: 'uiComponent.component.html',
    styleUrls: ['uiComponent.component.css'],
    inputs: ['structure']
})
export class UIComponent {
    private structure;
    
    @Output()
    onChangeModel: EventEmitter<any> = new EventEmitter();
    
    @Output()
    onDelete: EventEmitter<any> = new EventEmitter();

    private changeModel() {
        this.onChangeModel.emit(this.structure);
    }

    private delete(event) {
        event.preventDefault();
        this.onDelete.emit(this.structure);
    }
}
