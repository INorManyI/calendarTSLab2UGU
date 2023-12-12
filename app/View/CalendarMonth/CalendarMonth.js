import { createViewModel } from './CalendarMonth-view-model';

export function onNavigatingTo(args)
{
    const page = args.object;
    page.bindingContext = createViewModel(page);
}
