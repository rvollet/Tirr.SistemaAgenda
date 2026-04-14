import { create } from "zustand";
import { ScheduleModel } from "./model/ScheduleModel";

/**
 * =========================================================
 * STORE GLOBAL - SCHEDULE
 * =========================================================
 * @description
 * Armazena apenas os dados primitivos do agendamento.
 *
 * O ScheduleModel só deve ser instanciado na camada de useCase
 * ou quando necessário consumir o domínio validado.
 */
type ScheduleState = Partial<ScheduleModel.Input>;

type Store = {
  /**
   * Estado bruto do agendamento (parcial e incremental)
   */
  schedule: ScheduleState;

  /**
   * Atualiza parcialmente o estado do agendamento
   *
   * Regra:
   * - nunca sobrescreve tudo
   * - apenas complementa os dados existentes
   */
  updateSchedule: (props: Partial<ScheduleModel.Input>) => void;

  /**
   * Limpa todo o estado do agendamento
   */
  clearSchedule: () => void;
};

const useGlobalContext = create<Store>((set, get) => ({
  schedule: {},

  updateSchedule: (props) => {
    const current = get().schedule;

    set({
      schedule: {
        ...current,
        ...props,
      },
    });
  },

  clearSchedule: () => {
    set({ schedule: {} });
  },
}));

export default useGlobalContext;