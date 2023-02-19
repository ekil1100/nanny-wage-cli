import { addDays, differenceInCalendarDays, subMonths } from './deps.ts';

const WAGE_DEFAULT = 7500;
const WAGE_PER_DAY = 288;
const WAGE_DAYS = 26;
const DAY = 17;

function main(month: number, daysOff = 0, holiday = 0) {
    const year = new Date().getFullYear();
    const dayToPay = new Date(year, month - 1, DAY);
    const startDay = subMonths(1)(dayToPay);
    const diff = differenceInCalendarDays(startDay, dayToPay);
    const worked = diff - daysOff;

    const wage = holiday * WAGE_PER_DAY + WAGE_DEFAULT +
        (worked - WAGE_DAYS) * WAGE_PER_DAY;

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };

    const startDate = (addDays(1)(startDay)).toLocaleDateString('zh', options);
    const endDate = dayToPay.toLocaleDateString('zh', options);
    const output =
        `\n${startDate}到${endDate}一共有 ${diff} 天，工作 ${worked} 天, 休息 ${daysOff} 天，节假日 ${holiday} 天, 工资共 ¥${wage}。`;

    console.log(output);

    return wage;
}

let month = new Date().getMonth() + 1;
const monthInput = prompt(`现在是几月？（默认：当前月）：`);

if (monthInput) {
    month = parseInt(monthInput);
    if (month < 1 || month > 12) {
        console.error('Month must be between 1 and 12.');
        Deno.exit(1);
    }
}

const off = parseInt(
    prompt('休息了多少天？（默认：0）：') || '0',
);

const fes = parseInt(
    prompt('总共有多少天节假日？（默认：0）：') || '0',
);

main(month, off, fes);
