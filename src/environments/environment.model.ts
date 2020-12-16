export type EnvironmentName = 'development' | 'production';
export interface Environment {

    production: boolean;
    gatewayURL: string;
    gatewaySecretTimeout?: string;
    backendURL: string;

}

export type Environments = Record<EnvironmentName, Environment>;

