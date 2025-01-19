import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Login from "./features/auth/Login"
import Public from "./components/Public"
import PersistLogin from "./features/auth/PersistLogin"
import Prefetch from "./features/auth/Prefetch"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<Login />} />

        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>

            <Route path="public" element={<Public />} />
            
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App