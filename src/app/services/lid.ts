import {Kring, KringOverzicht} from './kring';
export interface PortalUser {
  id: number;
  surname: string;
  first_name: string;
  company_name: string;
  email: string;
  password: string;
  enabled: boolean;
  telephone: string;
  zip_code: string;
  IBAN_in: string;
  IBAN_out: string;
  overschot_IBAN: string;
  overschot_kenmerk: string;
  start_date: string;
  end_date: string;
  board_member: boolean;
  payment: number;
  street: string;
  home_number: string;
  place: string;
  payed: boolean;
  check_1: string;
  check_2: string;
  check_3: string;
  check_4: string;
  check_5: string;
  saldo_oke: boolean;
  birth_date: string;
  social_media_link: string;
  bestuur_id: number;
  received: number;
  lid_id_maatwerk: string;
  saldo_donations: number;
  referral_code: string;
  used_referral_code: string;
  contribution_discount: number;
  kring: Kring;
  kringenOverzicht: KringOverzicht[];
  totalen: SaldoTotalen;
}

export interface SaldoTotalen {

  id: number;
  saldo: number;
  saldo_storneerbaar: number;
  schenkbuffer: number;
  schenkbuffer_storneerbaar: number;
  saldo_unconfirmed: number;
  schenkbuffer_calc: number;
  donated_total: number;
  saldo_donations: number;
  saldo_niet_storneerbaar: number;
  arbodienst_total: number;

}

export interface Verklaringen {
  verklaringtitel: string;
  verklaring1: string;
  verklaring2: string;
  verklaring3: string;
  verklaring4: string;
  verklaring5: string;
  verklaringnb: string;
}
