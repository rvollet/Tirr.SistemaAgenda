import { Route, Routes } from "react-router"
import { ScheduleRoutes } from "./config"
import ChoiceDataAndTimePage from "./page/ChoiceDataAndTimePage"
import ChoiceServicePage from "./page/ChoiceServicePage"
import DesignSystemPage from "./page/DesignSystemPage"
import ProfilePage from "./page/ProfilePage"
import ValidationPage from "./page/ValidationPage"
import Header from "./shared/Header"

const Routing = () => {

  return <>
    <Header />
    <main>
      <Routes>
        <Route index element={<DesignSystemPage />} />
        <Route path={ScheduleRoutes.SERVICE} element={<ChoiceServicePage />} />
        <Route path={ScheduleRoutes.DATE_TIME} element={<ChoiceDataAndTimePage />} />
        <Route path={ScheduleRoutes.PROFILE} element={<ProfilePage />} />
        <Route path={ScheduleRoutes.CONFIRMATION} element={<ValidationPage />} />
      </Routes>
    </main>
  </>

}

export default Routing
