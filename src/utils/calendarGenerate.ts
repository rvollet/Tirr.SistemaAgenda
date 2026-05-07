export const calendarGenerate = (month: number, year: number) => {

  const firstDay = new Date(year, month, 1).getDay(); 
  const daysInMonth = new Date(year, month + 1, 0).getDate(); 
  
  const days = [];
  
  //Preencher espaços vazios (dias do mês anterior)
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  //Preencher os dias reais do mês
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  return days;
};