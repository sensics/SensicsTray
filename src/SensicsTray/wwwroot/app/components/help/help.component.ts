import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'ts-help',
    templateUrl: 'help.html'
})
export class HelpComponent {
    openDocs() {
        // "/api/opendocs"
        console.log("[STUB] HelpComponent.openDocs()");
    }

    createSysReport() {
        // "/api/createsysreport"
        console.log("[STUB] HelpComponent.createSysReport()");
    }

    openSupportTicket() {
        // "/api/openticket"
        console.log("[STUB] HelpComponent.openSupportTicket()");
    }
}
