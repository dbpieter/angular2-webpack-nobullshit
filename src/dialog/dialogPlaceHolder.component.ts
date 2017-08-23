import { Component, ViewContainerRef } from "@angular/core";
import { DialogService } from "./dialog.service";

@Component({
    selector: 'dialog-placeholder',
    template: '<template></template>'
})
export class DialogPlaceHolder {
    constructor(viewContainerRef: ViewContainerRef, private dialogService: DialogService) {
        this.dialogService.setViewContainerRef(viewContainerRef);
    }
}