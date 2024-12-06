// api zwraca nazwy z małych liter, stąd utils, który nam zwraca stringi z wielkich liter

export const capitalizeString = (str: string) => {
    return `${str[0].toUpperCase()}${str.slice(1)}`;
};
