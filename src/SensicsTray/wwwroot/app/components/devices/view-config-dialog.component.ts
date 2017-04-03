import { Component } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogTitle, MdDialogContent, MdDialogActions } from '@angular/material';

@Component({
    moduleId: module.id,
    selector: 'ts-devices-config-dialog',
    templateUrl: 'view-config-dialog.html'
})
export class ViewConfigDialogComponent {
    public data: any;
    constructor(public dialogRef: MdDialogRef<ViewConfigDialogComponent>) {
        this.data = dialogRef.config.data;
    }

    clickOK() {
        this.dialogRef.close();
    }
}
