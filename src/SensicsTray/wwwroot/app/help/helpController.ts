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
module app.help {
    class HelpController {

        openDocs() {
            this.$http.post("/api/opendocs", {}).then(
                success => {
                    console.log("opendocs call succeeded.");
                },
                failure => {
                    console.log("opendocs call failed.");
                });
        }

        createSysReport() {
            this.$http.post("/api/createsysreport", {}).then(
                success => {
                    console.log("createsysreport call succeeded.");
                },
                failure => {
                    console.log("createsysreport call failed.");
                });
        }

        openSupportTicket() {
            this.$http.post("/api/openticket", {}).then(
                success => {
                    console.log("openticket call succeeded.");
                },
                failure => {
                    console.log("openticket call failed.");
                });
        }

        static $inject = ["$http"];
        constructor(private $http: ng.IHttpService) { }
    }

    angular.module("app.help", ["ui.router"])
        .config(["$stateProvider", ($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state("help", {
                url: "/help",
                templateUrl: "app/help/help.html",
                controller: "app.help.HelpController as vm"
            });
        }])
        .controller("app.help.HelpController", HelpController);
}