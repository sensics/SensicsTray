/// OSVR-Config
///
/// <copyright>
/// Copyright 2016 Sensics, Inc.
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
/// </copyright>
/// 
module app.main {

    class MainController {
        navbarItems: app.common.INavbarItem[];

        serverRoot: string;

        configSaveAsURL: string;
        configSaveAsBlob: Blob;

        isActive(navBarItem: app.common.INavbarItem): boolean {
            return this.$state.current.name == navBarItem.state;
        }

        serverRootDefined(): boolean {
            return angular.isDefined(this.serverRoot) &&
                angular.isString(this.serverRoot) &&
                this.serverRoot.length > 0;
        }

        static $inject = ["$timeout", "$state", /*"app.common.ConfigService",*/ "app.common.NavigationService"];
        constructor(
            private $timeout: ng.ITimeoutService,
            private $state: ng.ui.IStateService,
            //private configService: app.common.IConfigService,
            private navigationService: app.common.INavigationService) {

            this.navbarItems = navigationService.getNavbarItems();

            //configService.getCurrentServerRoot().then(serverRoot => {
            //    this.serverRoot = serverRoot;
            //    if (!this.serverRootDefined()) {
            //        this.$state.go("serverRootNotDefined");
            //    }
            //});

            //configService.getCurrent().then(config => {
            //    var json = JSON.stringify(config.body, null, 4);
            //    this.configSaveAsBlob = new Blob([json], { type: "application/json" });
            //    this.configSaveAsURL = URL.createObjectURL(this.configSaveAsBlob);
            //});

            //var timeoutFunc = () => {
            //    configService.keepAlive();
            //    $timeout(timeoutFunc, 3000);
            //};

            //$timeout(timeoutFunc, 1000);
        }
    }
    angular.module("app.main", [/*"app.common.ConfigService", */"app.common.NavigationService", "ui.router"])
        .controller("app.main.MainController", MainController);
}
