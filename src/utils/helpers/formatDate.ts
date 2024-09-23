//# Third-party Imports

import { format, isSameDay, isYesterday, parseISO } from 'date-fns';

function isLastWeek(currentDate: number, lastWeek: number, today: number) {
    return currentDate >= lastWeek && currentDate <= today;
}

function isValidDate(currentDate: number, firstValidDate: number) {
    return currentDate > firstValidDate;
}

export const formatDate = (date: string, hour: boolean, complet?: boolean): string => {
    let formatedDate: string = '';

    let firstValidDate = new Date('01/01/2022').getTime();

    let today = new Date().getTime();
    let currentDate = parseISO(date).getTime();
    let lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).getTime();

    if (isValidDate(currentDate, firstValidDate)) {
        if (isSameDay(today, currentDate) === false) {

            if (isYesterday(currentDate)) {
                formatedDate = 'Ontem';
            }

            else if (isLastWeek(currentDate, lastWeek, today)) {

                let weekDay = parseISO(date).getDay();

                switch (weekDay) {
                    case 0:
                        formatedDate = 'Domingo';
                        break;
                    case 1:
                        formatedDate = 'Segunda';
                        break;
                    case 2:
                        formatedDate = 'Terça';
                        break;
                    case 3:
                        formatedDate = 'Quarta';
                        break;
                    case 4:
                        formatedDate = 'Quinta';
                        break;
                    case 5:
                        formatedDate = 'Sexta';
                        break;
                    case 6:
                        formatedDate = 'Sábado';
                        break;
                }
            }

            else {
                formatedDate = format(parseISO(date), 'dd/MM/yyyy');
            }

        } else {
            if (hour) {
                formatedDate = format(parseISO(date), 'HH:mm');
            } else {
                formatedDate = 'Hoje';
            }
        }

        if (complet) {
            formatedDate = formatedDate.toLowerCase() + ' às ' + format(parseISO(date), 'HH:mm')
        }
    }

    return formatedDate;
};
