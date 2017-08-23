
import { Component } from '@angular/core';
import { SelfCloseableDialog } from '../dialog/dialog.service';


@Component({
    selector: 'test-dialog',
    template: `<div><h1>I am a test "dialog"</h1><button (click)="closeSelf()"></button></div>`
})
export class TestDialog extends SelfCloseableDialog {

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