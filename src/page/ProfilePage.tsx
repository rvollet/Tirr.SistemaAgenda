import useScheduleNavigation from "@/hook/useNavigation";
import useGlobalContext from "@/store";
import { useForm } from "react-hook-form";

/**
 * =========================================================
 * Página: ProfilePage
 * =========================================================
 *
 * Etapa do fluxo de agendamento responsável por capturar
 * os dados do cliente.
 *
 * Integrações:
 * - React Hook Form (controle de formulário)
 * - Zustand (estado global parcial)
 * - Schedule Navigation (controle do fluxo)
 */
type FormData = {
  name: string;
  email: string;
  phone: string;
};

const ProfilePage = () => {
  const { schedule, updateSchedule } = useGlobalContext();
  const { next, back, isFirstPage, isLastPage } = useScheduleNavigation();

  /**
   * =====================================================
   * FORM
   * =====================================================
   */
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      name: schedule?.name ?? "",
      email: schedule?.email ?? "",
      phone: schedule?.phone ?? "",
    },
  });

  /**
   * =====================================================
   * ON SUBMIT
   * =====================================================
   * Atualiza estado global antes de avançar no fluxo
   */
  const onSubmit = (data: FormData) => {
    updateSchedule({
      name: data.name,
      email: data.email,
      phone: data.phone,
    });

    next();
  };

  return (
    <div className="container py-4">

      {/* ================= HEADER ================= */}
      <div className="mb-4">
        <h2 className="fw-bold">Seus dados</h2>
        <p className="text-muted">
          Informe seus dados para continuar o agendamento
        </p>
      </div>

      {/* ================= FORM ================= */}
      <form
        className="bg-white border rounded-4 p-4"
        onSubmit={handleSubmit(onSubmit)}
      >

        {/* NAME */}
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            className="form-control"
            placeholder="Digite seu nome"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <small className="text-danger">Nome é obrigatório</small>
          )}
        </div>

        {/* EMAIL */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Digite seu email"
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
          />
          {errors.email && (
            <small className="text-danger">Email inválido</small>
          )}
        </div>

        {/* PHONE */}
        <div className="mb-3">
          <label className="form-label">Telefone</label>
          <input
            type="tel"
            className="form-control"
            placeholder="Digite seu telefone"
            {...register("phone", {
              required: true,
              minLength: 10,
            })}
          />
          {errors.phone && (
            <small className="text-danger">
              Telefone inválido (mínimo 10 dígitos)
            </small>
          )}
        </div>

        {/* ================= NAVIGATION ================= */}
        <div className="d-flex justify-content-between mt-4">

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={back}
            disabled={isFirstPage}
          >
            Voltar
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isValid}
          >
            {isLastPage ? "Finalizar" : "Avançar"}
          </button>

        </div>

      </form>
    </div>
  );
};

export default ProfilePage;