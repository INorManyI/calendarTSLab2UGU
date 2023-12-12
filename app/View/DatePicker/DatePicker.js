import {createViewModel} from "~/View/DatePicker/DatePicker-view-model";

export function onNavigatingTo(args)
{
    const page = args.object;
    page.bindingContext = createViewModel(page);
}
