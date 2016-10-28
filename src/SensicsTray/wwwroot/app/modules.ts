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
module modules {
    angular.module("app",
        [
            "ui.router",
            "app.main",
            "app.landingPage",
            "app.demo",
            "app.devices",
            "app.plugins",
            "app.settings",
            "app.help",
            "app.serverRootNotDefined",
            "pascalprecht.translate"
        ])
        .config(["$stateProvider", "$urlRouterProvider", "$translateProvider", "$compileProvider",
            (
                $stateProvider: ng.ui.IStateProvider,
                $urlRouterProvider: ng.ui.IUrlRouterProvider,
                $translateProvider: ng.translate.ITranslateProvider,
                $compileProvider: ng.ICompileProvider) => {

                $urlRouterProvider.otherwise("/");
                $translateProvider.useStaticFilesLoader({
                    prefix: "localization/locale-",
                    suffix: ".json"
                });
                $translateProvider.useSanitizeValueStrategy('escape');
                $translateProvider.preferredLanguage("en");

                $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|blob):/);
            }]);

}
