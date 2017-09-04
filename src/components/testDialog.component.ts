
import { Component } from '@angular/core';
import { SelfCloseableDialog } from '../dialog/dialog.service';
import { TestDialogData } from './testDialogData';
import { Router, ActivatedRoute } from '@angular/router';


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
        <router-outlet name="dialogOutlet"></router-outlet>
        <a [routerLink]="[{ outlets: { dialogOutlet: ['testDialogPage1'] } }]" routerLinkActive="active">Page1</a>
        <button (click)="gotoPage(2)">Page2</button>
        <button (click)="clearOutlet()">Clear outlet</button>
    </div>`
})
export class TestDialog extends SelfCloseableDialog {

    constructor(private testDialogData: TestDialogData
        , private router: Router, private activatedRoute: ActivatedRoute) {
        super();
        console.log('dialogData received:', testDialogData);
    }

    async closeSelf(): Promise<void> {
        await this.router.navigate([{ outlets: { dialogOutlet: null } }]);
        this.close();
    }

    clearOutlet(): void {
        this.router.navigate([{ outlets: { dialogOutlet: null } }]);
    }

    ngOnDestroy(): void {
        console.log('test-dialog destroyed');
    }

    gotoPage(pageNr: number): void {
        this.router.navigate([{ outlets: { 'dialogOutlet': ['testDialogPage2'] } }]);
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