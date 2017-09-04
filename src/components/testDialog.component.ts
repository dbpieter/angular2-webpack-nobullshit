
import { Component } from '@angular/core';
import { SelfCloseableDialog } from '../dialog/dialog.service';
import { TestDialogData } from './testDialogData';
import { Router } from '@angular/router';


@Component({
    selector: 'test-dialog',
    template: `
    <div class="dialog">
        <div class="dialog-header">
            <div class="dialog-header-right">
                <button (click)="closeSelf()">X</button>
            </div>    
        </div>
        <h1>I am a test "dialog"</h1>
        <h2>Tze page:</h2>
        <router-outlet></router-outlet>
        <button (click)="gotoPage(1)">Page1</button>
        <button (click)="gotoPage(2)">Page2</button>
    </div>`
})
export class TestDialog extends SelfCloseableDialog {

    constructor(private testDialogData: TestDialogData
        , private router: Router) {
        super();
        console.log('dialogData received:', testDialogData);
    }

    closeSelf(): void {
        this.close();
    }

    ngOnDestroy(): void {
        console.log('test-dialog destroyed');
    }

    gotoPage(pageNr: number): void {
    }
}

@Component({
    selector: 'another-dialog',
    template: `
        <div class="dialog">
            <div class="dialog-header">
            </div>
            <h1>Another dialog</h1>
        </div>`
})
export class AnotherDialog {

    ngOnDestroy(): void {
        console.log('another-dialog destroyed');
    }
}