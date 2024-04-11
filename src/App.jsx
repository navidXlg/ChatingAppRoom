import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import ContextProvider from "./Context/AuthContext";
import PrivateRoutes from "./Componants/PrivrcyComponant";
import Room from "./pages/Room";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
