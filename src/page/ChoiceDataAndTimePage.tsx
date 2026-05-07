import { DAY_WEEK, MONTHS } from "@/constants/calendar";
import { HOURS_PERIOD } from "@/constants/hours";
import useScheduleNavigation from "@/hook/useNavigation";
import { CarretLeftIcon, CarretRightIcon, MoonIcon, SunIcon } from "@/shared/icons";
import useGlobalContext from "@/store";
import { calendarGenerate } from "@/utils/calendarGenerate";
import { isValidDate } from "@/utils/date";
import { useState } from "react";

/**
 * =========================================================
 * PAGE: ChoiceDataAndTimePage
 * =========================================================
 * @description
 * Página responsável por permitir ao usuário escolher
 * a data e hora para agendamento de um serviço.
 *
 * Esta etapa faz parte do fluxo de criação de agendamento.
 *
 * Responsabilidades:
 * - Exibir seleção de data
 * - Exibir seleção de horário
 * - Validar regras básicas (data futura)
 * - Persistir dados incrementalmente na store
 * - Avançar no fluxo
 */
const ChoiceDataAndTimePage = () => {
  const { schedule, updateSchedule } = useGlobalContext();
  const { next, back } = useScheduleNavigation();

  const dateSelectedSaveSchedule = schedule.chosenDay && schedule.chosenMonth 
    ? new Date(new Date().getFullYear(), MONTHS.indexOf(schedule.chosenMonth as typeof MONTHS[number]), schedule.chosenDay)
    : null;

  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(dateSelectedSaveSchedule);

  const [selectedPeriod, setSelectedPeriod] = useState<number>(HOURS_PERIOD.PERIOD_DAY)
  const [hour, setHour] = useState<string>(schedule.chosenHour || ""); 

  const month = viewDate.getMonth();
  const year = viewDate.getFullYear();
  const day = viewDate.getDay();

  const days = calendarGenerate(month, year);

  //FUNÇÃO PARA EVOLUIR OU REGREDIR MESES
  const prevMonth = () => setViewDate(new Date(year, month - 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1));

  const disabledButton = year < new Date().getFullYear() || 
      (year === new Date().getFullYear() && month <= new Date().getMonth())
      
  /**
   * =====================================================
   * HORÁRIOS MOCK (pode vir de API depois)
   * =====================================================
   */
  const hoursDay = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00"
  ]
  const hoursNight = [
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ]

  /**
   * =====================================================
   * CONTINUAR FLUXO
   * =====================================================
   */
  const handleContinue = () => {
    if (!selectedDate || !hour) return;

    updateSchedule({
      chosenDay: selectedDate.getDate(),
      chosenMonth: MONTHS[selectedDate.getMonth()],
      chosenHour: hour,
    });

    next();
  };

  return (
    <div className="container py-5 px-3 d-flex gap-5 flex-column justify-content-center align-items-center tirr__calendar-time-page__calendar-container">
      <div>
        {/* HEADER */}
        <div className="mb-2 w-100">
          <h6 className="fs-6 text-muted">
            Vamos encontrar o dia ideal para você
          </h6>
        </div>

        {/* DATA */}
        <div className=" bg-white rounded-3 py-2">
          <div className="d-flex justify-content-between align-items-center mb-3 px-3">
            <h6 className="text-uppercase ">{MONTHS[month]} {year}</h6>
            <div className="d-flex gap-1">
              <button className="btn" disabled={disabledButton} onClick={prevMonth}><CarretLeftIcon /></button>
              <button className="btn" onClick={nextMonth}><CarretRightIcon /></button>
            </div>
          </div>

          <div className="d-flex mb-2 text-center">
            {DAY_WEEK.map(d => (
              <div key={d} className="flex-fill fw-semi text-muted small">{d}</div>
            ))}
          </div>

          <div className="d-flex flex-wrap text-center">
            {days.map((day, index) => {
              if (!day) return <div key={index} style={{ width: '14.28%' }} />;

              const dateIsValid = isValidDate(day, month, year);

              return (
                <div key={index} style={{ width: '14.28%' }} className="mb-1 d-flex justify-content-center">
                  {day && (
                    <button
                      disabled={!dateIsValid}
                      className={`btn fw-bold btn-sm rounded-circle border-dark tirr__calendar-time-page__calendar-item ${
                        selectedDate?.getDate() === day ?  'btn-primary border-0' : 'bg-white'
                      }`}
                      onClick={() => setSelectedDate(new Date(year, month, day))}
                    >
                      {day}
                    </button>
                  )}
              </div>
              )
            })}
          </div>
        </div>
      </div>
      
      <div>
        {/* HORÁRIOS */}
        <div className="mb-4">
          <div className="mb-2 w-100">
            <p className="fs-6 text-muted">
              Escolha o horário que combina com você
            </p>
          </div>
          <div className=" bg-white rounded-3 py-2 p-3">
            <div className="d-flex align-items-center p-2">
              <h6 className="text-uppercase ">{day} {MONTHS[month]} {year}</h6>
            </div>
            
            <div className="d-flex flex-inline w-100 p-1 bg-light rounded-4 gap-1 my-3">
              <button 
                onClick={() => {setSelectedPeriod(HOURS_PERIOD.PERIOD_DAY)}} 
                className={`btn w-50 rounded-4 border-0 d-flex gap-1 align-items-center justify-content-center text-center ${selectedPeriod === HOURS_PERIOD.PERIOD_DAY ? "btn-primary" : "btn-outline-primary"}`}
              >
                <SunIcon />Dia
              </button>
              <button 
                onClick={() => {setSelectedPeriod(HOURS_PERIOD.PERIOD_NIGHT)}}
                className={`btn w-50 rounded-4 border-0 d-flex gap-1 align-items-center justify-content-center text-center ${selectedPeriod === HOURS_PERIOD.PERIOD_NIGHT ? "btn-primary" : "btn-outline-primary"}`}
              >
                <MoonIcon />Noite
              </button>
            </div>

            <div className="d-flex flex-wrap gap-2 my-4">
              {(selectedPeriod === HOURS_PERIOD.PERIOD_DAY ? hoursDay : hoursNight).map((h) => {
                const isSelected = hour === h;

                return (
                  <button
                    key={h}
                    className={`btn border-dark ${
                      isSelected ? 'btn-primary border-0' : 'bg-white'
                    }`}
                    onClick={() => setHour(h)}
                  >
                    {h}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="d-flex w-100 justify-content-between">
        <button className="btn btn-outline-secondary" onClick={back}>
          Voltar
        </button>

        <button
          className="btn btn-primary"
          disabled={!selectedDate || !hour}
          onClick={handleContinue}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default ChoiceDataAndTimePage;