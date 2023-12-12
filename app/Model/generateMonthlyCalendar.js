function getWeekday(year, month, day)
{
    let result = new Date(year, month, day).getDay();
    if (result === 0)
        return 7;
    return result;
}

export function generateMonthlyCalendar(year, month)
{
    let result = [];
    let indexOfFirstDay = 2 - getWeekday(year, month, 1);
    let indexOfLastDay = indexOfFirstDay + 41;
    for (let i = indexOfFirstDay; i <= indexOfLastDay; i++)
        result.push(new Date(year, month, i));
    return result;
}

