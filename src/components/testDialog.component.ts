
import { Component } from '@angular/core';
import { SelfCloseableDialog } from '../dialog/dialog.service';
import { TestDialogData } from './testDialogData';


@Component({
    selector: 'test-dialog',
    template: `<div><h1>I am a test "dialog"</h1><button (click)="closeSelf()">SelfClose</button></div>`
})
export class TestDialog extends SelfCloseableDialog {

    constructor(private testDialogData: TestDialogData) {
        super();
        console.log('dialogData received:', testDialogData);
    }

    closeSelf(): void {
        this.close();
    }

    ngOnDestroy(): void {
        console.log('test-dialog destroyed');
    }
}

@Component({
    selector: 'another-dialog',
    template: `<div><h1>Another dialog fo shizzle</h1></div>`
})
export class AnotherDialog {

    ngOnDestroy(): void {
        console.log('another-dialog destroyed');
    }
}