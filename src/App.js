import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import './App.css';
import Header from './componentes/Header'
import Footer from './componentes/Footer'
// import Home from './paginas/Home'
import Ingreso from './paginas/Ingreso'
import { ProveedorContextoIngresos } from './contextos/ingresos';

function App() {
  return (
    <ProveedorContextoIngresos>
      <Router>
          <div className="App">
            <Header />
            <Route exact path="/">
                <Ingreso />
            </Route>
            <Route exact path="/ingreso/:dni">
                <Ingreso />
            </Route>
            <Footer />
          </div>
      </Router>
    </ProveedorContextoIngresos>
  );
}

export default App;
