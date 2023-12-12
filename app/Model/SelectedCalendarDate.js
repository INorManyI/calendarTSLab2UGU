let selectedCalendarDate = new Date();

export function SelectedCalendarDateSetYear(year)
{
    selectedCalendarDate.setFullYear(year);
}

export function SelectedCalendarDateSetMonth(month)
{
    selectedCalendarDate.setMonth(month);
}

export function SelectedCalendarDateSetDay(day)
{
    selectedCalendarDate.setDate(day);
}

export function SelectedCalendarDateGetYear()
{
    return selectedCalendarDate.getFullYear();
}

export function SelectedCalendarDateGetMonth()
{
    return selectedCalendarDate.getMonth();
}

export function SelectedCalendarDateGetDay()
{
    return selectedCalendarDate.getDate();
}

export function SelectedCalendarDateIncrementMonth()
{
    selectedCalendarDate.setMonth(selectedCalendarDate.getMonth() + 1);
}

export function SelectedCalendarDateDecrementMonth()
{
    selectedCalendarDate.setMonth(selectedCalendarDate.getMonth() - 1);
}
