///// OSVR-Config
/////
///// <copyright>
///// Copyright 2016 Sensics, Inc.
/////
///// Licensed under the Apache License, Version 2.0 (the "License");
///// you may not use this file except in compliance with the License.
///// You may obtain a copy of the License at
/////
/////     http://www.apache.org/licenses/LICENSE-2.0
/////
///// Unless required by applicable law or agreed to in writing, software
///// distributed under the License is distributed on an "AS IS" BASIS,
///// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
///// See the License for the specific language governing permissions and
///// limitations under the License.
///// </copyright>
///// 

//import {Http} from "@angular/http"
//import {Observable} from "rxjs"

//export interface IOSVRInclude {
//    relativePath: string;
//    body: any;
//}

//export interface IOSVRConfig {
//    body: any;
//    includes: IOSVRInclude[];
//}

//export interface IOSVRPlugin {
//    name: string;
//    enabled?: boolean;
//}

//export interface IOSVRDisplay {
//    fileName: string;
//    relativePath: string;
//    body: any;
//    showDetail?: boolean;
//}

//export interface ISetCurrentConfigResponse { }

//export interface IConfigService {
//    getCurrent(): Observable<IOSVRConfig>;
//    setCurrent(newConfig: IOSVRConfig): Observable<ISetCurrentConfigResponse>;
//    getAvailableManualLoadPlugins(): Observable<IOSVRPlugin[]>
//    getAvailableDisplays(): Observable<IOSVRDisplay[]>;
//    getCurrentServerRoot(): Observable<string>;
//    keepAlive(): Observable<any>;
//}

//export class ConfigService implements IConfigService {
//    static $inject = ["$http"];
//    constructor(private $http: Http) { }

//    getCurrent(): Observable<IOSVRConfig> {
//        return this.$http.get("/api/currentconfig");
//    }

//    setCurrent(newConfig: IOSVRConfig): Observable<ISetCurrentConfigResponse> {
//        return this.$http.post("/api/currentconfig", newConfig);
//    }

//    getAvailableManualLoadPlugins(): Observable<IOSVRPlugin[]> {
//        return this.$http.get("/api/availablemanualloadplugins");
//    }

//    getAvailableDisplays(): Observable<IOSVRDisplay[]> {
//        return this.$http.get("/api/availabledisplays");
//    }

//    getCurrentServerRoot(): Observable<string> {
//        return this.$http.get("/api/serverroot");
//    }

//    keepAlive(): Observable<any> {
//        return this.$http.post("/api/keepAlive", {});
//    }
//}
