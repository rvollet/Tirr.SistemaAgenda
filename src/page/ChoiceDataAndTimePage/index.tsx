import useScheduleNavigation from "@/hook/useNavigation";
import useGlobalContext from "@/store";
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
  const { updateSchedule } = useGlobalContext();
  const { next, back } = useScheduleNavigation();

  const [date, setDate] = useState<string>("");
  const [hour, setHour] = useState<string>("");

  /**
   * =====================================================
   * HORÁRIOS MOCK (pode vir de API depois)
   * =====================================================
   */
  const availableHours = [
    "09:00",
    "10:00",
    "11:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  /**
   * =====================================================
   * VALIDAÇÃO SIMPLES DE DATA
   * =====================================================
   */
  const isValidDate = (value: string) => {
    const selected = new Date(value);
    const now = new Date();

    // remove horário da comparação
    selected.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    return selected >= now;
  };

  /**
   * =====================================================
   * CONTINUAR FLUXO
   * =====================================================
   */
  const handleContinue = () => {
    if (!date || !hour) return;
    if (!isValidDate(date)) return;

    updateSchedule({
      chosenDay: new Date(date),
      chosenHour: hour,
    });

    next();
  };

  return (
    <div className="container py-5">
      {/* HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold">Escolha data e hora</h2>
        <p className="text-muted">
          Selecione quando deseja realizar o serviço.
        </p>
      </div>

      {/* DATA */}
      <div className="mb-4">
        <label className="form-label fw-semibold">Data</label>

        <input
          type="date"
          className="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
        />

        {date && !isValidDate(date) && (
          <small className="text-danger">
            Não é possível selecionar datas passadas
          </small>
        )}
      </div>

      {/* HORÁRIOS */}
      <div className="mb-4">
        <label className="form-label fw-semibold">Horários disponíveis</label>

        <div className="d-flex flex-wrap gap-2 mt-2">
          {availableHours.map((h) => {
            const isSelected = hour === h;

            return (
              <button
                key={h}
                type="button"
                className={`btn ${
                  isSelected ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setHour(h)}
              >
                {h}
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="d-flex justify-content-between">
        <button className="btn btn-outline-secondary" onClick={back}>
          Voltar
        </button>

        <button
          className="btn btn-primary"
          disabled={!date || !hour || !isValidDate(date)}
          onClick={handleContinue}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default ChoiceDataAndTimePage;