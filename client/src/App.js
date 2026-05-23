import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Login from "./features/auth/Login"
import Signup from "./features/auth/Signup"
import Public from "./components/Public"
import PersistLogin from "./features/auth/PersistLogin"
import Prefetch from "./features/auth/Prefetch"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<Login />} />

        <Route path="signup" element={<Signup />} />

        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>

            <Route path="public">
              <Route index element={<Public />} />
            </Route>
        
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App