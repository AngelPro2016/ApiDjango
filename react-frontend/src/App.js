import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

import Home from "./components/Home";
import Clientes from "./components/Clientes";
import Libros from "./components/Libros";
import Alquileres from "./components/Alquileres";

function App() {
  return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <Router>
          {/* Navegación */}
          <header className="App-header">
            <nav>
              <ul className="nav-links">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/clientes">Clientes</Link>
                </li>
                <li>
                  <Link to="/libros">Libros</Link>
                </li>
                <li>
                  <Link to="/alquileres">Alquileres</Link>
                </li>
              </ul>
            </nav>
          </header>

          {/* Definición de Rutas */}
          <main className="App-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/libros" element={<Libros />} />
              <Route path="/alquileres" element={<Alquileres />} />
            </Routes>
          </main>
        </Router>
      </div>
  );
}

export default App;
