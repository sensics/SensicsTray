import { Component } from '@angular/core';
import { HelpService } from '../../services/help.service';

@Component({
    moduleId: module.id,
    selector: 'ts-help',
    templateUrl: 'help.html'
})
export class HelpComponent {
    constructor(private help: HelpService) { }

    openDocs() {
        this.help.openDocs();
    }

    createSysReport() {
        this.help.createSysReport();
    }

    openSupportTicket() {
        this.help.openSupportTicket();
    }
}
