const names = new Map();
names.set(0, 'Январь');
names.set(1, 'Февраль');
names.set(2, 'Март');
names.set(3, 'Апрель');
names.set(4, 'Май');
names.set(5, 'Июнь');
names.set(6, 'Июль');
names.set(7, 'Август');
names.set(8, 'Сентябрь');
names.set(9, 'Октябрь');
names.set(10, 'Ноябрь');
names.set(11, 'Декабрь');

export function monthNameGet(month)
{
    return names.get(month);
}
