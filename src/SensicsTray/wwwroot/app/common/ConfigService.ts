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

module app.common {
    export interface IOSVRInclude {
        relativePath: string;
        body: any;
    }

    export interface IOSVRConfig {
        body: any;
        includes: IOSVRInclude[];
    }

    export interface IOSVRPlugin {
        name: string;
        enabled?: boolean;
    }

    export interface IOSVRDisplay {
        fileName: string;
        relativePath: string;
        body: any;
        showDetail?: boolean;
    }

    export interface ISetCurrentConfigResponse { }

    export interface IConfigService {
        getCurrent(): ng.IPromise<IOSVRConfig>;
        setCurrent(newConfig: IOSVRConfig): ng.IPromise<ISetCurrentConfigResponse>;
        getAvailableManualLoadPlugins(): ng.IPromise<IOSVRPlugin[]>
        getAvailableDisplays(): ng.IPromise<IOSVRDisplay[]>;
        getCurrentServerRoot(): ng.IPromise<string>;
        keepAlive(): ng.IPromise<any>;
    }

    class ConfigService implements IConfigService {
        static $inject = ["$http"];
        constructor(private $http: ng.IHttpService) { }

        getCurrent(): ng.IPromise<IOSVRConfig> {
            return this.$http.get("/api/currentconfig").then(result => { return result.data });
        }

        setCurrent(newConfig: IOSVRConfig): ng.IPromise<ISetCurrentConfigResponse> {
            return this.$http.post("/api/currentconfig", newConfig);
        }

        getAvailableManualLoadPlugins(): ng.IPromise<IOSVRPlugin[]> {
            return this.$http.get("/api/availablemanualloadplugins").then(result => { return result.data });
        }

        getAvailableDisplays(): ng.IPromise<IOSVRDisplay[]> {
            return this.$http.get("/api/availabledisplays").then(result => { return result.data; });
        }

        getCurrentServerRoot(): ng.IPromise<string> {
            return this.$http.get("/api/serverroot").then(result => { return result.data; });
        }

        keepAlive(): ng.IPromise<any> {
            return this.$http.post("/api/keepAlive", {});
        }
    }

    angular.module("app.common.ConfigService", []).service("app.common.ConfigService", ConfigService);
}
