import { Component, ViewContainerRef } from "@angular/core";

@Component({
    selector: 'dialog-placeholder',
    template: '<template></template>'
})
export class DialogPlaceHolder {

    constructor(private viewContainerRef: ViewContainerRef) {
        debugger;
    }

    ngAfterViewInit() {
        debugger;
    }
}