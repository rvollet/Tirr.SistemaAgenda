import { ScheduleRoutes } from "@/config";
import useScheduleNavigation from "@/hook/useNavigation";
import usePromise from "@/hook/usePromise";
import useGlobalContext from "@/store";
import toScheduleUseCase, { type ToScheduleUseCaseArgs } from "@/useCases/toScheduleUseCase";

/**
 * =========================================================
 * Página: ValidationPage
 * =========================================================
 *
 * Etapa final do fluxo de agendamento.
 *
 * Responsável por:
 * - Exibir resumo completo do agendamento
 * - Confirmar envio do agendamento
 * - Voltar para edição caso necessário
 */
const ValidationPage = () => {
  const { schedule, clearSchedule } = useGlobalContext();
  const { back, goTo } = useScheduleNavigation();

  const {
    execute: toSchedule,
    isLoading: isScheduling,
  } = usePromise(toScheduleUseCase, false);

  /**
   * =====================================================
   * HANDLE CONFIRM SCHEDULE
   * =====================================================
   */
  const handleConfirm = async () => {

    if (!schedule || isScheduling) return;

    /**
     * =====================================================
     * VALIDAÇÃO DEFENSIVA (UI LAYER)
     * =====================================================
     */
    const hasService = !!schedule.chosenService?.id;
    const hasDate = schedule.chosenDay instanceof Date;
    const hasHour = typeof schedule.chosenHour === "string" && schedule.chosenHour.trim().length > 0;
    const hasName = typeof schedule.name === "string" && schedule.name.trim().length > 0;
    const hasEmail = typeof schedule.email === "string" && schedule.email.trim().length > 0;
    const hasPhone = typeof schedule.phone === "string" && schedule.phone.trim().length >= 10;

    if (!hasService || !hasDate || !hasHour || !hasName || !hasEmail || !hasPhone) {
      alert("Preencha todos os campos corretamente antes de agendar.");
      return;
    }

    /**
     * DTO montado a partir do ScheduleModel
     */
    const data: ToScheduleUseCaseArgs = {
      chosenDay: schedule.chosenDay!,
      chosenHour: schedule.chosenHour!,
      chosenService: schedule.chosenService!,
      email: schedule.email!,
      name: schedule.name!,
      phone: schedule.phone!,
    };

    try {
      console.log("Payload agendamento:", data);

      await toSchedule(data);

      clearSchedule();

      goTo(ScheduleRoutes.SERVICE);

      alert("Agendamento realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao agendar:", error);
      alert("Erro ao realizar agendamento.");
    }
  };

  if (!schedule) {
    return (
      <div className="container py-5">
        <p className="text-muted">Nenhum agendamento encontrado.</p>
      </div>
    );
  }

  return (
    <div className="container py-4">

      {/* ================= HEADER ================= */}
      <div className="mb-4">
        <h2 className="fw-bold">Confirmar agendamento</h2>
        <p className="text-muted">
          Revise os dados antes de finalizar
        </p>
      </div>

      {/* ================= SUMMARY ================= */}
      <div className="bg-white border rounded-4 p-4 mb-4">

        {/* SERVICE */}
        <div className="mb-3">
          <h6 className="fw-bold">Serviço</h6>
          <p className="mb-0">{schedule?.chosenService?.name}</p>
          <small className="text-muted">
            {schedule.chosenService?.description}
          </small>
        </div>

        {/* DATE & TIME */}
        <div className="mb-3">
          <h6 className="fw-bold">Data e horário</h6>
          <p className="mb-0">
            {schedule.chosenDay?.toLocaleDateString()} às {schedule.chosenHour}
          </p>
        </div>

        {/* CLIENT */}
        <div className="mb-3">
          <h6 className="fw-bold">Cliente</h6>
          <p className="mb-0">{schedule.name}</p>
          <small className="text-muted">{schedule.email}</small>
          <br />
          <small className="text-muted">{schedule.phone}</small>
        </div>

        {/* PRICE */}
        <div>
          <h6 className="fw-bold">Valor</h6>
          <p className="mb-0">
            {schedule?.chosenService?.priceFormatted}
          </p>
        </div>

      </div>

      {/* ================= ACTIONS ================= */}
      <div className="d-flex justify-content-between">

        <button
          className="btn btn-outline-secondary"
          onClick={back}
          disabled={isScheduling}
        >
          Voltar
        </button>

        <button
          className="btn btn-success"
          onClick={handleConfirm}
          disabled={isScheduling}
        >
          {isScheduling ? "Agendando..." : "Agendar"}
        </button>

      </div>

    </div>
  );
};

export default ValidationPage;