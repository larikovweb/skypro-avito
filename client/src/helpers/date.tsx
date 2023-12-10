type FormatDateFunction = (dateString: string) => string;

export const formatDateMonthAge: FormatDateFunction = (dateString) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
  const formatter = new Intl.DateTimeFormat('ru-RU', options);
  return formatter.format(date);
};

export const formatDateMonth: FormatDateFunction = (dateString) => {
  const eventDate = new Date(dateString);

  const dateOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
  const dateStringRes = eventDate.toLocaleDateString([], dateOptions);
  return dateStringRes;
};
