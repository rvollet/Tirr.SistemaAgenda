import type { CategoryModel } from "@/model/CategoryModel";
import { ServiceModel } from "@/model/ServiceModel";
import { FAKE_API_CONNECTOR } from "@/service/fakeApi";
import type { GetCategoryResponseDto } from "@/service/fakeApi/types";

/**
 * =========================================================
 * LOAD SERVICES USE CASE
 * =========================================================
 * @description Caso de uso responsável por buscar as categorias 
 * de serviços na API e converter a estrutura hierárquica para 
 * Models de domínio (CategoryModel e ServiceModel).
 *
 * Responsabilidades:
 * - Orquestrar chamada à API de categorias
 * - Mapear DTOs de categorias para CategoryModels
 * - Instanciar ServiceModels para cada serviço dentro das categorias
 * - Garantir a validação e consistência da árvore de dados
 *
 * Camada:
 * - Application Layer (Use Case)
 */
const loadServiceUseCase = async (): Promise<CategoryModel[]> => {
  /**
   * =====================================================
   * FETCH RAW DATA
   * =====================================================
   * @description Busca os dados "brutos" da API (DTO).
   */
  const bruteCategories: GetCategoryResponseDto[] =
    await FAKE_API_CONNECTOR.getServices();

  /**
   * =====================================================
   * MAPPING DTO -> DOMAIN MODEL
   * =====================================================
   * @description Converte os dados da API para o modelo de domínio
   * (ServiceModel), garantindo validação interna.
   */
  const categories: CategoryModel[] = bruteCategories.map((cat: any) => {
    return {
      title: cat.title,
      services: cat.services.map((service: any) => {
        return new ServiceModel({
          id: service.id,
          image: service.image,
          name: service.name,
          description: service.description,
          price: service.price,
        });
      })
    };
  });

  return categories;

  /**
   * =====================================================
   * RETURN DOMAIN DATA
   * =====================================================
   * @description Retorna lista de models já validados e consistentes.
   */
  return categories;
};

export default loadServiceUseCase;