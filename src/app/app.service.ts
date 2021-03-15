import { Injectable } from '@angular/core';
import { atom } from '@politie/sherlock';
import moment from 'moment-mini';

@Injectable({
    providedIn: 'root',
})
export class AppService {
    constructor() {
        moment.locale('nl', {
            months: 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_'),
            monthsShort: 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_'),
            monthsParseExact: true,
            weekdays: 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
            weekdaysShort: 'zo_ma_di._wo_do_vr_za'.split('_'),
            weekdaysMin: 'zo_ma_di._wo_do_vr_za'.split('_'),
            weekdaysParseExact: true,
            longDateFormat: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD-MM-YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd D MMMM YYYY HH:mm',
            },
            calendar: {
                sameDay: '[vandaag om] LT',
                nextDay: '[morgen om] LT',
                nextWeek: 'dddd [om] LT',
                lastDay: '[gisteren om] LT',
                lastWeek: '[afgelopen] dddd [om] LT',
                sameElse: 'L',
            },
            relativeTime: {
                future: 'over %s',
                past: '%s geleden',
                s: 'een paar seconden',
                ss: '%d seconden',
                m: 'één minuut',
                mm: '%d minuten',
                h: 'één uur',
                hh: '%d uur',
                d: 'één dag',
                dd: '%d dagen',
                M: 'één maand',
                MM: '%d maanden',
                y: 'één jaar',
                yy: '%d jaar',
            },
            dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
            ordinal: n => {
                return n + (n === 1 ? 'er' : 'e');
            },
            meridiemParse: /AM|PM/,
            isPM: input => {
                return input.charAt(0) === 'P';
            },
            // In case the meridiem units are not separated around 12, then implement
            // this function (look at locale/id.js for an example).
            // meridiemHour : function (hour, meridiem) {
            //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
            // },
            meridiem: (hours, minutes, isLower) => {
                return hours < 12 ? 'AM' : 'PM';
            },
            week: {
                dow: 1, // Monday is the first day of the week.
                doy: 4, // Used to determine first week of the year.
            },
        });
    }

    showHeader$ = atom(false);
    showFooter$ = atom(false);

    showHeader(show: boolean) {
        // setTimeout(() => this.showHeader$.set(show), 1);
        this.showHeader$.set(show);
    }

    showFooter(show: boolean) {
        // setTimeout(() => this.showFooter$.set(show), 1);
        this.showFooter$.set(show);
    }
}
