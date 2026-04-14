import useScheduleNavigation from "@/hook/useNavigation";
import usePromise from "@/hook/usePromise";
import type { ServiceModel } from "@/model/ServiceModel";
import useGlobalContext from "@/store";
import loadServiceUseCase from "@/useCases/loadServiceUseCase";
import { useEffect, useState } from "react";

/**
 * =========================================================
 * PAGE: ChoiceServicePage
 * =========================================================
 * @description
 * Página responsável por permitir ao usuário selecionar
 * o serviço que deseja agendar.
 *
 * Esta é uma etapa inicial do fluxo de agendamento.
 *
 * Responsabilidades:
 * - Listar serviços disponíveis
 * - Exibir informações básicas (nome, descrição, preço, imagem)
 * - Permitir seleção de um serviço
 * - Persistir seleção no store global
 * - Avançar para próxima etapa do fluxo
 */
const ChoiceServicePage = () => {
  const { updateSchedule } = useGlobalContext();
  const { next } = useScheduleNavigation();

  const {
    result: services,
    execute: loadServices,
    isLoading: serviceIsLoading,
  } = usePromise(loadServiceUseCase, []);

  const [selectedService, setSelectedService] =
    useState<ServiceModel | null>(null);

  /**
   * Carrega serviços ao montar a página
   */
  useEffect(() => {
    loadServices();
  }, []);

  /**
   * Seleciona um serviço
   */
  const handleSelectService = (service: ServiceModel) => {
    setSelectedService(service);
  };

  /**
   * Confirma seleção e avança no fluxo
   */
  const handleContinue = () => {
    if (!selectedService) return;

    updateSchedule({chosenService:selectedService})

    next();
  };

  return (
    <div className="container py-5">
      {/* HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold">Escolha o serviço</h2>
        <p className="text-muted">
          Selecione o tipo de serviço que deseja agendar.
        </p>
      </div>

      {/* LOADING */}
      {serviceIsLoading && (
        <div className="alert alert-info">Carregando serviços...</div>
      )}

      {/* LISTA DE SERVIÇOS */}
      <div className="row g-3">
        {services?.map((service) => {
          const isSelected = selectedService?.id === service.id;

          return (
            <div className="col-12 col-md-4" key={service.id}>
              <div
                onClick={() => handleSelectService(service)}
                className={`border rounded-4 p-3 h-100 cursor-pointer transition ${
                  isSelected ? "border-primary shadow-sm" : ""
                }`}
                style={{ cursor: "pointer" }}
              >
                {/* IMAGEM */}
                <img
                  src={service.image}
                  alt={service.name}
                  className="img-fluid rounded mb-3"
                />

                {/* INFO */}
                <h5 className="fw-semibold">{service.name}</h5>
                <p className="text-muted small">{service.description}</p>

                <div className="fw-bold text-primary">
                  {service.priceFormatted}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FOOTER ACTION */}
      <div className="mt-4 d-flex justify-content-end">
        <button
          className="btn btn-primary"
          disabled={!selectedService}
          onClick={handleContinue}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default ChoiceServicePage;