import {
    addDays,
    assert,
    differenceInCalendarDays,
    subMonths,
} from './deps.ts';

const WAGE_DEFAULT = 7500;
const WAGE_PER_DAY = 288;
const WAGE_DAYS = 26;
const DAY = 17;

function main(year: number, month: number, off = 0, fes = 0) {
    const today = new Date(year, month - 1, DAY);
    const lastMonth = subMonths(1)(today);
    const diff = differenceInCalendarDays(lastMonth, today);
    const worked = diff - off;
    const fesWage = fes * WAGE_PER_DAY;

    let wage = fesWage;

    if (worked > WAGE_DAYS) {
        const days = worked - WAGE_DAYS;
        wage += WAGE_DEFAULT + days * WAGE_PER_DAY;
    } else {
        const days = WAGE_DAYS - worked;
        wage += days === 0 ? WAGE_DEFAULT : days * WAGE_PER_DAY;
    }

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };

    const startDate = (addDays(1)(lastMonth)).toLocaleDateString('en', options);
    const endDate = today.toLocaleDateString('en', options);
    const days = (day: number) => day > 1 ? 'days' : 'day';
    const holidays = fes > 1 ? 'holidays' : 'holiday';
    const output = `During [${startDate}, ${endDate}] has ${diff} ${
        days(diff)
    }, worked ${worked} ${days(worked)}, ${off} ${
        days(off)
    } off，${fes} ${holidays}, need to pay ¥${wage}。`;

    console.log(output);

    return wage;
}

const year = parseInt(
    prompt('Which year right now? (default: 2022)') || '2022',
);
const month = parseInt(prompt('Which month right now? (default: 1)') || '1');
const off = parseInt(
    prompt('How many days off during this period? (default: 0)') || '0',
);
const fes = parseInt(
    prompt('How many holidays during this period? (default: 0)') || '0',
);
main(year, month, off, fes);

Deno.test('year should be a number', () => {
    assert(typeof year === 'number');
});
