import { Component, ViewContainerRef, ViewChild } from "@angular/core";
import { DialogService } from "./dialog.service";

@Component({
    selector: 'dialog-placeholder',
    template: '<template #target></template>'
})
export class DialogPlaceHolder {
    // we need a target inside the dialog-placeholder
    // using the viewContainerRef of dialog-placeholder would create siblings instead of children
    @ViewChild('target', { read: ViewContainerRef }) target: ViewContainerRef;

    constructor(private dialogService: DialogService) { }

    ngAfterViewInit() {
        this.dialogService.setViewContainerRef(this.target);
    }
}