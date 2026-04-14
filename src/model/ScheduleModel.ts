import { ServiceModel } from "./ServiceModel"

export class ScheduleModel {
  /**
   * Serviço selecionado pelo usuário.
   */
  public chosenService: ServiceModel

  /**
   * Dia selecionado para o agendamento.
   *
   * REGRA:
   * Não pode ser uma data no passado.
   */
  public chosenDay: Date

  /**
   * Hora selecionada para o agendamento.
   *
   * Formato esperado: "HH:mm" (ex: "14:30")
   */
  public chosenHour: string

  /**
   * Nome do cliente.
   */
  public name: string

  /**
   * Email do cliente.
   */
  public email: string

  /**
   * Telefone do cliente.
   */
  public phone: string

  constructor(data: ScheduleModel.Input) {
    this.chosenService = data.chosenService
    this.chosenDay = data.chosenDay
    this.chosenHour = data.chosenHour
    this.name = data.name
    this.email = data.email
    this.phone = data.phone

    this.assertValid()
  }

  /**
   * Validação reativa do model.
   * Pode ser chamada após qualquer alteração.
   */
  public isValid(): boolean {
    return (
      this.hasValidService() &&
      this.hasValidName() &&
      this.hasValidEmail() &&
      this.hasValidPhone() &&
      this.hasValidDateTime()
    )
  }

  /**
   * Garante que o estado atual é válido.
   */
  public assertValid(): void {
    if (!this.isValid()) {
      throw new Error("ScheduleModel inválido")
    }
  }

  // -------------------------
  // VALIDADORES
  // -------------------------

  private hasValidService(): boolean {
    return this.chosenService instanceof ServiceModel && this.chosenService.isValid()
  }

  private hasValidName(): boolean {
    return typeof this.name === "string" && this.name.trim().length > 0
  }

  private hasValidEmail(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)
  }

  private hasValidPhone(): boolean {
    return typeof this.phone === "string" && this.phone.replace(/\D/g, "").length >= 10
  }

  /**
   * REGRA PRINCIPAL:
   * A data + hora escolhida NÃO pode ser menor que a data/hora atual.
   */
  private hasValidDateTime(): boolean {
    if (!(this.chosenDay instanceof Date)) return false

    const [hours, minutes] = this.chosenHour.split(":").map(Number)

    if (isNaN(hours) || isNaN(minutes)) return false

    const selectedDateTime = new Date(this.chosenDay)
    selectedDateTime.setHours(hours, minutes, 0, 0)

    const now = new Date()

    return selectedDateTime >= now
  }
}

export namespace ScheduleModel {
  /**
   * Estrutura de entrada do agendamento.
   */
  export type Input = {
    chosenService: ServiceModel
    chosenDay: Date
    chosenHour: string
    name: string
    email: string
    phone: string
  }
}