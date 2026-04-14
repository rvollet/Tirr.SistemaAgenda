/**
 * =========================================================
 * SCHEDULE ROUTES (ENUM)
 * =========================================================
 * @description
 * Centraliza todas as rotas do fluxo de agendamento.
 *
 * Objetivos:
 * - Evitar strings duplicadas no projeto
 * - Garantir consistência entre Router e Navigation Hook
 * - Facilitar manutenção e refatoração de rotas
 * - Servir como fonte única de verdade do fluxo
 */
export enum ScheduleRoutes {
  /**
   * =====================================================
   * ETAPA 1 - SERVIÇO
   * =====================================================
   * @description
   * Página responsável pela seleção do serviço desejado.
   */
  SERVICE = "/agenda-servico",

  /**
   * =====================================================
   * ETAPA 2 - DATA E HORÁRIO
   * =====================================================
   * @description
   * Página responsável pela escolha de data e horário do agendamento.
   */
  DATE_TIME = "/agenda-dia-e-hora",

  /**
   * =====================================================
   * ETAPA 3 - PERFIL DO USUÁRIO
   * =====================================================
   * @description
   * Coleta de dados do cliente (nome, email, telefone).
   */
  PROFILE = "/agenda-perfil",

  /**
   * =====================================================
   * ETAPA 4 - CONFIRMAÇÃO
   * =====================================================
   * @description
   * Tela final de revisão e confirmação do agendamento.
   */
  CONFIRMATION = "/agenda-confirmacao",
}

/**
 * =========================================================
 * SCHEDULE FLOW (ORDEM DO FLUXO)
 * =========================================================
 * @description
 * Define a ordem sequencial das etapas do fluxo de agendamento.
 *
 * Utilizado principalmente para:
 * - navegação next/back
 * - validação de progresso
 * - controle de wizard steps
 */
export const ScheduleFlow = [
  ScheduleRoutes.SERVICE,
  ScheduleRoutes.DATE_TIME,
  ScheduleRoutes.PROFILE,
  ScheduleRoutes.CONFIRMATION,
] as const;

/**
 * =========================================================
 * SCHEDULE ROUTE TYPE
 * =========================================================
 * @description
 * Tipo derivado do fluxo de rotas.
 *
 * Garante que qualquer uso de rota no sistema esteja limitado
 * às rotas válidas do fluxo de agendamento.
 */
export type ScheduleRoute = (typeof ScheduleFlow)[number];