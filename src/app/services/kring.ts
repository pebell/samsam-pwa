export interface KringBase {
  id: number;
  name: string;
  kring_type: string;
  masterkring_id: number;
  bestuur_id: number;
  organisatie_id: number;
  label: string;
}

export interface Kring extends KringBase{
  region: string;
  schenkkring_name: string;
  start_date: string;
  end_date: string;
  max_payment: number;
  kring_type: string;
  statutaire_location: string;
  min_payment: number;
  max_leden: number;
  payment_options: string;
  saving_percentage: number;
  max_buffer: number;
  return_payment_period: number;
  waiting_period: number;
  max_schenk_duration: number;
  same_casus_interval: number;
  notice_period: number;
  total_buffer: number;
  contribution: number;
  email_union: string;
  phone_union: string;
  IBAN_union: string;
  IBAN_contribution: string;
  referral_program: boolean;
  street: string;
  home_number: string;
  postal_code: string;
  place: string;
}

export interface KringOverzicht extends KringBase{

  actieve_leden: number;
  aanwas_volgende_maand: number;
  aanwas_na_volgende_maand: number;
  aantal_zieken_vandaag: number;
  aantal_schenkingen_deze_maand: number;
  schenkbuffer: number;
  donations_alltime: number;
  donated_alltime: number;
  percentage_aanwas_volgende_maand: number;
  percentage_aanwas_na_volgende_maand: number;
  percentage_ziek_vandaag: number;
  percentage_schenkingen_deze_maand: number;
}


export function getConfig(kring: Kring) {
  return  { ownRiskPeriod: kring.waiting_period,
            maxSchenkDuration: kring.max_schenk_duration,
            sameCasusInterval: kring.same_casus_interval,
          };
}
