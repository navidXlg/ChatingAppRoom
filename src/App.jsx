import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import ContextProvider from "./assets/Context/AuthContext";
import PrivateRoutes from "./assets/Componants/PrivrcyComponant";
import Room from "./assets/pages/Room";
import Login from "./assets/pages/Login";
import Register from "./assets/pages/Register";

function App() {

  return (
    <Router>
      <ContextProvider>
        <Routes>
          <Route path="/" element = {<Login/>}/>
          <Route path="/register" element = {<Register/>}/>
          <Route element = {<PrivateRoutes/>}>
            <Route path="/room" element = {<Room/>}/>
          </Route>
        </Routes>
      </ContextProvider>
    </Router>
  )
}

export default App;
