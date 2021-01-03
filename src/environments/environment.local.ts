import { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  gatewayURL: 'http://localhost:8443', // NOTE: hiervoor moet application.yaml van gateway aangepast worden om zonder HTTPS te draaien
  backendURL: '/api',
};
