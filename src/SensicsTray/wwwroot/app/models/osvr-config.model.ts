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

export interface IOSVRSampleConfig {
    fileName: string;
    body: IOSVRConfig;
    showDetail?: boolean;
}

export interface IOSVRUserProfile {
    name: string;
    ipd: number;
    standingEyeHeight: number;
    seatedEyeHeight: number;
    filePath: string;
}
