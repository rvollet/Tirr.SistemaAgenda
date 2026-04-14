import { ServiceModel } from "@/model/ServiceModel";
import { FAKE_API_CONNECTOR } from "@/service/fakeApi";
import type { GetServiceResponseDto } from "@/service/fakeApi/types";

/**
 * =========================================================
 * LOAD SERVICES USE CASE
 * =========================================================
 * @description Caso de uso responsável por buscar serviços
 * na API e convertê-los para o ServiceModel (domínio da aplicação).
 *
 * Responsabilidades:
 * - Orquestrar chamada à API
 * - Converter DTOs em Models de domínio
 * - Garantir consistência dos dados antes de retornar
 *
 * Camada:
 * - Application Layer (Use Case)
 */
const loadServiceUseCase = async (): Promise<ServiceModel[]> => {
  /**
   * =====================================================
   * FETCH RAW DATA
   * =====================================================
   * @description Busca os dados "brutos" da API (DTO).
   */
  const bruteServices: GetServiceResponseDto[] =
    await FAKE_API_CONNECTOR.getServices();

  /**
   * =====================================================
   * MAPPING DTO -> DOMAIN MODEL
   * =====================================================
   * @description Converte os dados da API para o modelo de domínio
   * (ServiceModel), garantindo validação interna.
   */
  const services = bruteServices.map((service) => {
    return new ServiceModel({
      id: service.id,
      image: service.image,
      name: service.name,
      description: service.description,
      price: service.price,
    });
  });

  /**
   * =====================================================
   * RETURN DOMAIN DATA
   * =====================================================
   * @description Retorna lista de models já validados e consistentes.
   */
  return services;
};

export default loadServiceUseCase;