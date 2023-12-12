import {generateMonthlyCalendar} from "~/Model/generateMonthlyCalendar";
import {Frame, GridLayout, Label, Observable} from '@nativescript/core'
import { SelectedCalendarDateDecrementMonth, SelectedCalendarDateGetMonth, SelectedCalendarDateGetYear, SelectedCalendarDateIncrementMonth, SelectedCalendarDateSetDay, SelectedCalendarDateSetMonth, SelectedCalendarDateSetYear } from "~/Model/SelectedCalendarDate";
import {monthNameGet} from "~/Model/MonthNameGet";

const viewModel = new Observable();
let calendar = undefined;

function isOutOfMonth(date)
{
    return (SelectedCalendarDateGetYear() !== date.getFullYear()) ||
           (SelectedCalendarDateGetMonth() !== date.getMonth());
}

function isToday(date)
{
    let currDate = new Date();
    return currDate.getFullYear() === date.getFullYear() &&
           currDate.getMonth() === date.getMonth() &&
           currDate.getDate() === date.getDate();
}

function createCSSclassNameForDate(calendarDay, column)
{
    let cssClasses = '';
    if (column >= 5)
        cssClasses += 'weekend ';
    if (isToday(calendarDay))
        cssClasses += 'today ';
    if (isOutOfMonth(calendarDay))
        cssClasses += 'out-of-month ';
    else
        cssClasses += 'default ';
    return cssClasses;
}

function refreshCalendarItems()
{
    let dates = generateMonthlyCalendar(SelectedCalendarDateGetYear(), SelectedCalendarDateGetMonth());
    let column = 0;
    for (let i = 0; i < dates.length; i++)
    {
        let cell = calendar.getChildAt(i + 7);
        cell.className = createCSSclassNameForDate(dates[i], column);
        cell.text = dates[i].getDate();
        column = (column + 1) % 7;
    }
}

function updateNameOfSelectedDate()
{
    viewModel.set('dateSwitcherName', monthNameGet(SelectedCalendarDateGetMonth()) + ' ' + SelectedCalendarDateGetYear());
}

function refreshCalendarContent()
{
    updateNameOfSelectedDate();
    refreshCalendarItems();
}

function createCalendarItem(text, isWeekend = false, isToday = false, isOutOfMonth = false)
{
    let calCell = new Label();
    calCell.text = text;
    if (isWeekend)
        calCell.cssClasses.add('weekend');
    if (isToday)
        calCell.cssClasses.add('today');
    if (isOutOfMonth)
        calCell.cssClasses.add('out-of-month');
    if ((!isToday) && (!isWeekend) && (!isOutOfMonth))
        calCell.cssClasses.add('default');
    return calCell;
}

function getCalendarWeekdaysItems()
{
    return [
        createCalendarItem('Пн'),
        createCalendarItem('Вт'),
        createCalendarItem('Ср'),
        createCalendarItem('Чт'),
        createCalendarItem('Пт'),
        createCalendarItem('Сб', true),
        createCalendarItem('Вс', true),
    ]
}

function initCalendarWeekdays()
{
    let items = getCalendarWeekdaysItems();
    for (let i = 0; i < 7; i++)
    {
        calendar.addChild(items[i]);
        GridLayout.setRow(items[i], 0);
        GridLayout.setColumn(items[i], i);
    }
}

function initCalendarItems()
{
    initCalendarWeekdays();
    for (let row = 1; row < 7; row++)
    {
        for (let column = 0; column < 7; column++)
        {
            let cell = new Label()
            calendar.addChild(cell);
            GridLayout.setRow(cell, row);
            GridLayout.setColumn(cell, column);
        }
    }
}

function incrementMonth()
{
    SelectedCalendarDateIncrementMonth();
    refreshCalendarContent();
}

function decrementCalendarMonth()
{
    SelectedCalendarDateDecrementMonth();
    refreshCalendarContent();
}

function calendarGoToCurrentDate()
{
    let currTime = new Date();
    SelectedCalendarDateSetYear(currTime.getFullYear());
    SelectedCalendarDateSetMonth(currTime.getMonth());
    SelectedCalendarDateSetDay(currTime.getDate());
    refreshCalendarContent();
}

function PickCalendarDate()
{
    Frame.topmost().navigate({
        moduleName: '/View/DatePicker/DatePicker',
        clearHistory: false
    });
}

export function createViewModel(args)
{
    viewModel.incrementMonth = incrementMonth;
    viewModel.calendarGoToCurrentDate = calendarGoToCurrentDate;
    viewModel.decrementMonth = decrementCalendarMonth;
    viewModel.pickCalendarDate = PickCalendarDate;
    calendar = args.getViewById('calendar');
    if (calendar.getChildrenCount() === 0)
        initCalendarItems();
    refreshCalendarContent();
    return viewModel;
}
