import { Component } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogTitle, MdDialogContent, MdDialogActions } from '@angular/material';

@Component({
    moduleId: module.id,
    selector: 'ts-confirmation-dialog',
    templateUrl: 'confirmation-dialog.html'
})
export class ConfirmationDialogComponent {
    public title = "";
    public description = "";
    public okButtonText = "OK";
    public cancelButtonText = "Cancel";

    constructor(public dialogRef: MdDialogRef<ConfirmationDialogComponent>) {
        this.title = dialogRef.config.data.title;
        this.description = dialogRef.config.data.description;
        this.okButtonText = dialogRef.config.data.okButtonText;
        this.cancelButtonText = dialogRef.config.data.cancelButtonText;
    }

    clickOK() {
        this.dialogRef.close(true);
    }

    clickCancel() {
        this.dialogRef.close(false);
    }
}
