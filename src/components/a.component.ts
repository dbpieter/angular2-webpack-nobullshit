import { Component, OnInit, Injectable } from '@angular/core';
import { DialogService } from "../dialog/dialog.service";
import { TestDialog, AnotherDialog } from "./testDialog.component";
import { TestDialogData } from './testDialogData';

@Component({
    selector: 'a-component',
    template: `
     <h2>I am A</h2>
     <button (click)="openDialog()">This should open a dialog</button>
     <button (click)="openAnotherDialog()">This should open another dialog</button>
     <button (click)="closeDialog()">Close dialog</button>
    `
})
export class AComponent implements OnInit {

    constructor(private dialogService: DialogService) { }

    ngOnInit() {
        console.log('a init');
    }

    openDialog(): void {
        this.dialogService.open(TestDialog, [{ provide: TestDialogData, useValue: new TestDialogData('blabla') }]);
    }

    openAnotherDialog(): void {
        this.dialogService.open(AnotherDialog);
    }

    closeDialog(): void {
        this.dialogService.close();
    }

}