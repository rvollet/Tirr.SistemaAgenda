import {
  CalendarIcon,
  CarretLeftIcon,
  CarretRightIcon,
  CheckIcon,
  MailIcon,
  MoonIcon,
  PhoneIcon,
  SunIcon
} from "@/shared/icons.tsx";

const DesignSystemPage = () => {
  return (
    <div className="container py-5">

      {/* ================= HEADER ================= */}
      <div className="mb-5">
        <h1 className="fw-bold">Sistema agenda</h1>
        <p className="text-muted">
          Guia completo de fundamentos visuais, grid, espaçamento e cores da aplicação.
        </p>
      </div>

      <div className="bg-white border rounded-4 shadow-sm p-4 p-md-5">

        {/* ================= CSS ARCHITECTURE ================= */}
        <section className="mb-5">
          <h2 className="fw-semibold mb-2">Arquitetura CSS (Naming Convention)</h2>

          <p className="text-muted mb-4">
            O sistema de estilos segue uma convenção baseada em prefixo próprio <code>tirr__</code>,
            garantindo isolamento, previsibilidade e evitando conflitos com Bootstrap ou bibliotecas externas.
          </p>

          <div className="border rounded-3 p-4 bg-light">

            <h5 className="fw-semibold mb-3">📌 Padrão de nomenclatura</h5>

            <ul className="mb-4">
              <li>
                <code>tirr__component</code> → componente base
              </li>
              <li>
                <code>tirr__component-element</code> → elemento interno
              </li>
              <li>
                <code>tirr__component--modifier</code> → variações/modificadores
              </li>
            </ul>

            <h5 className="fw-semibold mb-3">📦 Exemplo prático</h5>

            <pre className="bg-white border rounded p-3 mb-0">
              {`<div class="tirr__button tirr__button--primary">
  <span class="tirr__button-icon">OK</span>
</div>`}
            </pre>

            <hr />

            <h5 className="fw-semibold mb-3">🧠 Princípios da arquitetura</h5>

            <ul className="mb-0">
              <li>Evitar colisão de classes globais</li>
              <li>Manter consistência entre componentes</li>
              <li>Facilitar manutenção e refatoração</li>
              <li>Escalabilidade sem dependência de CSS global desorganizado</li>
            </ul>

          </div>
        </section>

        {/* ===================================================== */}
        {/* COLORS */}
        {/* ===================================================== */}
        <section className="mb-5">
          <h2 className="fw-semibold mb-2">Cores (Color System)</h2>

          <div className="row g-3">

            <div className="col-6 col-md-3">
              <div className="border rounded-3 overflow-hidden">
                <div className="bg-primary" style={{ height: 70 }} />
                <div className="p-2">
                  <div className="fw-semibold">Primary</div>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="border rounded-3 overflow-hidden">
                <div className="bg-white border-bottom" style={{ height: 70 }} />
                <div className="p-2">
                  <div className="fw-semibold">White</div>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="border rounded-3 overflow-hidden">
                <div className="bg-gray-light" style={{ height: 70 }} />
                <div className="p-2">
                  <div className="fw-semibold">Gray Light</div>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="border rounded-3 overflow-hidden">
                <div className="bg-gray-lighter" style={{ height: 70 }} />
                <div className="p-2">
                  <div className="fw-semibold">Gray Lighter</div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ===================================================== */}
        {/* ICONS */}
        {/* ===================================================== */}
        <section className="mb-5">
          <h2 className="fw-semibold mb-2">Icons</h2>

          <div className="row g-3 text-center">

            {[
              { icon: <MailIcon />, label: "Mail" },
              { icon: <CalendarIcon />, label: "Calendar" },
              { icon: <PhoneIcon />, label: "Phone" },
              { icon: <CheckIcon />, label: "Check" },
              { icon: <MoonIcon />, label: "Moon" },
              { icon: <SunIcon />, label: "Sun" },
              { icon: <CarretLeftIcon />, label: "Left" },
              { icon: <CarretRightIcon />, label: "Right" }
            ].map((item, i) => (
              <div key={i} className="col-6 col-md-3 col-lg-2">
                <div className="border rounded-3 p-3">
                  {item.icon}
                  <div className="mt-2 small text-muted">{item.label}</div>
                </div>
              </div>
            ))}

          </div>
        </section>

        {/* ===================================================== */}
        {/* GRID */}
        {/* ===================================================== */}
        <section className="mb-5">
          <h2 className="fw-semibold mb-2">Grid System</h2>

          <div className="row g-3 text-center">
            <div className="col-12 col-md-4">
              <div className="bg-primary text-white p-3 rounded">col-md-4</div>
            </div>
            <div className="col-12 col-md-4">
              <div className="bg-primary text-white p-3 rounded">col-md-4</div>
            </div>
            <div className="col-12 col-md-4">
              <div className="bg-primary text-white p-3 rounded">col-md-4</div>
            </div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* BREAKPOINTS */}
        {/* ===================================================== */}
        <section className="mb-5">
          <h2 className="fw-semibold mb-2">Breakpoints</h2>

          <ul className="list-group">
            <li className="list-group-item">xs &lt;576px</li>
            <li className="list-group-item">sm ≥576px</li>
            <li className="list-group-item">md ≥768px</li>
            <li className="list-group-item">lg ≥992px</li>
            <li className="list-group-item">xl ≥1200px</li>
            <li className="list-group-item">xxl ≥1400px</li>
          </ul>
        </section>

        {/* ===================================================== */}
        {/* SPACING */}
        {/* ===================================================== */}
        <section className="mb-5">
          <h2 className="fw-semibold mb-2">Spacing</h2>

          <div className="vstack gap-2">
            <div className="bg-primary text-white p-1 rounded">p-1</div>
            <div className="bg-primary text-white p-2 rounded">p-2</div>
            <div className="bg-primary text-white p-3 rounded">p-3</div>
            <div className="bg-primary text-white p-4 rounded">p-4</div>
            <div className="bg-primary text-white p-5 rounded">p-5</div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* DISPLAY */}
        {/* ===================================================== */}
        {/* ================= DISPLAY ================= */}
        <section className="mb-5">
          <h2 className="fw-semibold mb-2">Display</h2>
          <p className="text-muted mb-4">
            Utilitários de display do Bootstrap para controle de layout.
          </p>

          <div className="border rounded p-3 mb-2 d-block bg-light">
            d-block
          </div>

          <div className="border rounded p-3 mb-2 d-inline-block bg-light">
            d-inline-block
          </div>

          <span className="border rounded p-2 mb-2 d-inline bg-light">
            d-inline
          </span>

          <div className="border rounded p-3 mb-2 d-flex bg-light">
            d-flex
          </div>

          <div className="border rounded p-3 mb-2 d-inline-flex bg-light">
            d-inline-flex
          </div>

          <div className="border rounded p-3 mb-2 d-grid bg-light">
            d-grid
          </div>

          <div className="border rounded p-3 mb-2 d-table bg-light">
            d-table
          </div>

          <div className="border rounded p-3 mb-2 d-table-cell bg-light">
            d-table-cell
          </div>

          <div className="border rounded p-3 mb-2 d-table-row bg-light">
            d-table-row
          </div>

          <div className="border rounded p-3 mb-2 d-none bg-light">
            d-none (hidden)
          </div>

          {/* RESPONSIVO */}
          <hr />

          <h5 className="fw-semibold mb-3">Display Responsivo</h5>

          <div className="border rounded p-3 mb-2 d-none d-sm-block bg-light">
            d-none d-sm-block
          </div>

          <div className="border rounded p-3 mb-2 d-none d-md-block bg-light">
            d-none d-md-block
          </div>

          <div className="border rounded p-3 mb-2 d-none d-lg-block bg-light">
            d-none d-lg-block
          </div>

          <div className="border rounded p-3 mb-2 d-none d-xl-block bg-light">
            d-none d-xl-block
          </div>

          <div className="border rounded p-3 mb-2 d-none d-xxl-block bg-light">
            d-none d-xxl-block
          </div>

          <hr />

          <div className="border rounded p-3 mb-2 d-block d-md-none bg-light">
            d-block d-md-none (mobile only)
          </div>
        </section>

        {/* ===================================================== */}
        {/* SHADOWS */}
        {/* ===================================================== */}
        <section className="mb-5">
          <h2 className="fw-semibold mb-2">Shadows</h2>

          <div className="row g-3">

            <div className="col-md-4">
              <div className="border p-4 rounded shadow-sm">
                shadow-sm
              </div>
            </div>

            <div className="col-md-4">
              <div className="border p-4 rounded shadow">
                shadow
              </div>
            </div>

            <div className="col-md-4">
              <div className="border p-4 rounded shadow-lg">
                shadow-lg
              </div>
            </div>

          </div>
        </section>

        {/* ===================================================== */}
        {/* BORDER RADIUS */}
        {/* ===================================================== */}
        <section className="mb-5">
          <h2 className="fw-semibold mb-2">Border Radius</h2>

          <div className="row g-3 text-center">

            {["rounded-0", "rounded-1", "rounded-2", "rounded-3", "rounded-4", "rounded-5", "rounded-pill"].map((r) => (
              <div className="col-6 col-md-3" key={r}>
                <div className={`bg-primary text-white p-3 ${r}`}>
                  {r}
                </div>
              </div>
            ))}

          </div>
        </section>

      </div>
    </div>
  );
};

export default DesignSystemPage;