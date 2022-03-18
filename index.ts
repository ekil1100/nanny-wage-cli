import { assert, differenceInCalendarDays, subMonths } from './deps.ts';

const WAGE_DEFAULT = 7500;
const WAGE_PER_DAY = 288;
const WAGE_DAYS = 26;
const DAY = 17;

function main(year: number, month: number, off = 0, fes = 0) {
    const today = new Date(year, month - 1, DAY);
    const lastMonth = subMonths(1)(today);
    const diff = differenceInCalendarDays(lastMonth, today) - off;
    const fesWage = fes * WAGE_PER_DAY;
    let wage = fesWage;
    if (diff > WAGE_DAYS) {
        const dayLeft = diff - WAGE_DAYS;
        wage += WAGE_DEFAULT + dayLeft * WAGE_PER_DAY;
    } else {
        const days = WAGE_DAYS - diff;
        wage += days === 0 ? WAGE_DEFAULT : days * WAGE_PER_DAY;
    }

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };

    console.log(
        `从${lastMonth.toLocaleDateString('zh', options)}到${
            today.toLocaleDateString('zh', options)
        }，共计 ${diff} 天，休息 ${off} 天，节假日 ${fes} 天，总计工资 ¥${wage}。`,
    );
    return wage;
}

const year = parseInt(prompt('What year? (default: 2022)') || '2022');
const month = parseInt(prompt('What month? (default: 1)') || '1');
const off = parseInt(prompt('How many days off? (default: 0)') || '0');
const fes = parseInt(prompt('How many holidays? (default: 0)') || '0');
main(year, month, off, fes);

Deno.test('year should be a number', () => {
    assert(typeof year === 'number');
});
