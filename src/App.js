import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/layout/navbar";
import Dashboard from "./components/layout/dashboard";
import backgroundImage from "./pattern.jpg";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Pokemon from "./components/pokemon/pokedex";
function App() {
  return (
    <BrowserRouter>
      <div className="App" style={{ background: `url(${backgroundImage})` }}>
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/pokedex/:pokemonIndex" component={Pokemon} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
