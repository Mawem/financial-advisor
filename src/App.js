import "./App.css";
import { Route, Switch } from "react-router-dom";
import Calculator from "./components/calculator/Calculator";
import Home from "./components/home/Home";
import Header from "./components/common/Header";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/calculator" component={Calculator} />
      </Switch>
    </div>
  );
}

export default App;
