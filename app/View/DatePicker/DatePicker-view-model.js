import {Frame, Observable} from "@nativescript/core";
import {SelectedCalendarDateGetDay, SelectedCalendarDateGetMonth, SelectedCalendarDateGetYear, SelectedCalendarDateSetDay, SelectedCalendarDateSetMonth, SelectedCalendarDateSetYear } from "~/Model/SelectedCalendarDate";

let datePicker;
const viewModel = new Observable();

function saveChanges()
{
    SelectedCalendarDateSetYear(datePicker.year);
    SelectedCalendarDateSetMonth(datePicker.month - 1);
    SelectedCalendarDateSetDay(datePicker.day);
    gotoMainPage();
}

function gotoMainPage()
{
    Frame.topmost().navigate({
        moduleName: '~/View/CalendarMonth/CalendarMonth',
        clearHistory: true
    });
}

export function createViewModel(page)
{
    viewModel.gotoPreviousPage = gotoMainPage;
    viewModel.saveSelectedDate = saveChanges;
    viewModel.year = SelectedCalendarDateGetYear();
    viewModel.month = SelectedCalendarDateGetMonth() + 1;
    viewModel.day = SelectedCalendarDateGetDay();
    datePicker = page.getViewById('datePicker');
    return viewModel;
}
