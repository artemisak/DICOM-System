import dayjs from "dayjs";

export const concatNameAndDate = (name, date) => {
    const formattedDate = date && dayjs(date).isValid() ? dayjs(date).format('DD.MM.YY HH:mm') : null;
    if (name && formattedDate) return `${name}, ${formattedDate}`;
    if (!name && !formattedDate) return '-';
    if (!name) return formattedDate;
    if (!formattedDate) return name;

}