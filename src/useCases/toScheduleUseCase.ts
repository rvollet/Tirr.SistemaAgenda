import { ScheduleModel } from "@/model/ScheduleModel";
import type { ServiceModel } from "@/model/ServiceModel";
import { FAKE_API_CONNECTOR } from "@/service/fakeApi";

export interface ToScheduleUseCaseArgs {
  
  /**
   * Serviço selecionado pelo usuário.
   *
   * REGRA:
   * Deve ser uma instância válida de ServiceModel.
   */
  chosenService: ServiceModel;

  /**
   * Dia selecionado para o agendamento.
   *
   * REGRA:
   * Não pode ser uma data no passado.
   */
  chosenDay: Date;

  /**
   * Hora selecionada para o agendamento.
   *
   * FORMATO:
   * "HH:mm" (ex: "14:30")
   *
   * OBS:
   * Validação de formato deve ocorrer no Use Case ou Model.
   */
  chosenHour: string;

  /**
   * Nome do cliente.
   *
   * REGRA:
   * String não vazia.
   */
  name: string;

  /**
   * Email do cliente.
   *
   * REGRA:
   * Deve ser um email válido.
   */
  email: string;

  /**
   * Telefone do cliente.
   *
   * REGRA:
   * Deve conter no mínimo 10 dígitos numéricos.
   */
  phone: string;

}

/**
 * =========================================================
 * Use Case: toScheduleUseCase
 * =========================================================
 * @description
 * Responsável por:
 * - Receber dados brutos do formulário (DTO)
 * - Converter para ScheduleModel (camada de domínio)
 * - Validar regras de negócio automaticamente via Model
 * - Persistir o agendamento via API
 *
 * Fluxo:
 * DTO → Model (validação forte) → API
 *
 * Retorno:
 * true em caso de sucesso
 */
const toScheduleUseCase = async (
  input: ToScheduleUseCaseArgs
): Promise<boolean> => {
  try {
    /**
     * =====================================================
     * 1. Conversão DTO → Domain Model
     * =====================================================
     * O Model já executa validações no constructor
     */
    const schedule = new ScheduleModel({
      chosenService: input.chosenService,
      chosenDay: input.chosenDay,
      chosenHour: input.chosenHour,
      name: input.name,
      email: input.email,
      phone: input.phone,
    });

    /**
     * =====================================================
     * 2. Validação explícita (defesa adicional)
     * =====================================================
     */
    schedule.assertValid();

    /**
     * =====================================================
     * 3. Persistência via Service Layer
     * =====================================================
     */
    await FAKE_API_CONNECTOR.postAppointment({
      chosenServiceId: schedule.chosenService.id,
      chosenDay: schedule.chosenDay,
      chosenHour: schedule.chosenHour,
      name: schedule.name,
      email: schedule.email,
      phone: schedule.phone,
    });

    return true;
  } catch (error) {
    console.error("Erro no use case de agendamento:", error);
    return false;
  }
};

export default toScheduleUseCase;