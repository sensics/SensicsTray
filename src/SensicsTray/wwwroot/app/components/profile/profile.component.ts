import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { OSVRConfigService } from '../../services/osvr-config.service';
import { IOSVRUserProfile, IOSVRConfig } from '../../models/osvr-config.model';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog.component';

@Component({
    moduleId: module.id,
    selector: 'ts-profile',
    templateUrl: 'profile.html'
})
export class ProfileComponent {
    userProfiles: IOSVRUserProfile[] = [];
    currentProfileName: string = null;
    currentProfile: IOSVRUserProfile = null;
    configRoot: IOSVRConfig = null;

    constructor(private osvrConfig: OSVRConfigService, private dialog: MdDialog) {
        this.refreshAvailableProfiles();
        this.osvrConfig.getCurrent().subscribe(config => {
            this.configRoot = config;
            this.currentProfileName = this.configRoot.body.userProfileName;
        });
    }

    refreshAvailableProfiles() {
        this.osvrConfig.getAvailableUserProfiles().subscribe(userProfiles => {
            this.userProfiles = userProfiles;
        });
    }

    showEditProfile() {
        return typeof this.currentProfile !== "undefined" && this.currentProfile !== null;
    }

    canSave() {
        return this.showEditProfile() &&
            typeof this.currentProfile.name === "string" && this.currentProfile.name.length > 0 &&
            this.currentProfile.ipd > 0 &&
            this.currentProfile.seatedEyeHeight > 0 &&
            this.currentProfile.standingEyeHeight > 0;
    }

    createNewProfile() {
        this.currentProfile = {
            name: "",
            filePath: "",
            ipd: 0.0635,
            standingEyeHeight: 1.62052,
            seatedEyeHeight: 1.62052 / 2.0
        };
    }

    copyProfile(profile: IOSVRUserProfile): IOSVRUserProfile {
        return {
            ipd: profile.ipd,
            name: profile.name,
            standingEyeHeight: profile.standingEyeHeight,
            seatedEyeHeight: profile.seatedEyeHeight,
            filePath: profile.filePath
        };
    }

    editProfile(userProfile: IOSVRUserProfile) {
        this.currentProfile = this.copyProfile(userProfile);
    }

    clickUserProfile(userProfile: IOSVRUserProfile) {
        this.configRoot.body.userProfileName = userProfile.name;
        this.currentProfileName = userProfile.name;
        this.osvrConfig.setCurrent(this.configRoot).subscribe();
    }

    useButtonText(userProfile: IOSVRUserProfile) {
        return this.isCurrentProfile(userProfile) ? "Current" : "Use";
    }

    isCurrentProfile(userProfile: IOSVRUserProfile) {
        return typeof this.currentProfileName !== "undefined" &&
            this.currentProfileName !== null &&
            typeof userProfile !== 'undefined' &&
            userProfile !== null &&
            userProfile.name === this.currentProfileName;
    }

    saveProfile() {
        if (typeof this.currentProfile === "undefined" || this.currentProfile === null) {
            console.error("Shouldn't be able to save the profile if it's null or undefined.");
        } else {
            this.osvrConfig.saveProfile(this.currentProfile).subscribe(_ => {
                this.currentProfile = null;
                this.refreshAvailableProfiles();
            });
        }
    }

    cancelProfile() {
        this.currentProfile = null;
    }

    deleteProfile(userProfile: IOSVRUserProfile) {
        let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
                title: "Delete Profile",
                description: "Are you sure you want to delete this user profile?",
                okButtonText: "Delete",
                cancelButtonText: "Cancel"
            },
            height: "600",
            width: "600"
        });
        let closedSub = dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.osvrConfig.deleteProfile(userProfile).subscribe(_ => {
                    this.refreshAvailableProfiles();
                });
            }
            closedSub.unsubscribe();
        });
    }
}
