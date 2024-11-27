import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Alquileres.css";

const Alquileres = () => {
  const [clientes, setClientes] = useState([]);
  const [libros, setLibros] = useState([]);
  const [alquileres, setAlquileres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    cliente_nombre: "",
    libro_titulo: "",
    fecha_alquiler: "",
    fecha_devolucion: "",
  });

  // Obtener la lista de clientes desde la API
  const fetchClientes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/clientes/");
      setClientes(response.data);
    } catch (err) {
      setError("Error al cargar los clientes.");
    }
  };

  // Obtener la lista de libros desde la API
  const fetchLibros = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/libros/");
      setLibros(response.data);
    } catch (err) {
      setError("Error al cargar los libros.");
    }
  };

  // Obtener los alquileres existentes
  const fetchAlquileres = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/alquileres/");
      setAlquileres(response.data);
      setError(null);
    } catch (err) {
      setError("Error al cargar los alquileres.");
    } finally {
      setLoading(false);
    }
  };

  // Manejar el envío del formulario para agregar un alquiler
  const handleSubmit = async (e) => {
    try {
      const response = await axios.post("http://localhost:8000/api/alquileres/", formData);
      setAlquileres([...alquileres, response.data]); // Actualizar la lista con el nuevo alquiler
      setFormData({ cliente_nombre: "", libro_titulo: "", fecha_alquiler: "", fecha_devolucion: "" }); // Limpiar el formulario
      setError(null);
    } catch (err) {
      setError("Error al agregar el alquiler.");
    }
  };

  // Manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchClientes();
    fetchLibros();
    fetchAlquileres();
  }, []);

  return (
    <div className="alquileres-container">
      <h1>Gestión de Alquileres de Libros</h1>

      {/* Mostrar error si ocurre */}
      {error && <p className="error">{error}</p>}

      {/* Formulario para agregar un alquiler */}
      <form className="alquiler-form" onSubmit={handleSubmit}>
        <h2>Agregar Alquiler</h2>
        <div className="form-group">
          <label htmlFor="cliente_nombre">Cliente:</label>
          <select
            id="cliente_nombre"
            name="cliente_nombre"
            value={formData.cliente_nombre}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar Cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.nombre}>
                {cliente.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="libro_titulo">Libro:</label>
          <select
            id="libro_titulo"
            name="libro_titulo"
            value={formData.libro_titulo}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar Libro</option>
            {libros.map((libro) => (
              <option key={libro.id} value={libro.titulo}>
                {libro.titulo}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="fecha_alquiler">Fecha de Alquiler:</label>
          <input
            type="date"
            id="fecha_alquiler"
            name="fecha_alquiler"
            value={formData.fecha_alquiler}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fecha_devolucion">Fecha de Devolución:</label>
          <input
            type="date"
            id="fecha_devolucion"
            name="fecha_devolucion"
            value={formData.fecha_devolucion}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Agregar Alquiler</button>
      </form>

      {/* Lista de alquileres */}
      <h2>Lista de Alquileres</h2>
      {loading ? (
        <p className="loading">Cargando alquileres...</p>
      ) : (
        <div className="alquileres-list">
          {alquileres.map((alquiler) => (
            <div className="alquiler-card" key={alquiler.id}>
              <h3>{alquiler.libro} - {alquiler.cliente}</h3>
              <p><strong>Fecha de Alquiler:</strong> {alquiler.fecha_alquiler}</p>
              <p><strong>Fecha de Devolución:</strong> {alquiler.fecha_devolucion}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Alquileres;
