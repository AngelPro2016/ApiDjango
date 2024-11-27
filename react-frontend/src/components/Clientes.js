import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Clientes.css";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });

  // Obtener la lista de clientes desde la API
  const fetchClientes = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/clientes/");
      setClientes(response.data); // Guardar los datos en el estado
      setError(null);
    } catch (err) {
      setError("Error al cargar los clientes.");
    } finally {
      setLoading(false);
    }
  };

  // Formulario para guardar clientes
  const handleSubmit = async (e) => {
    console.log("Datos enviados:", formData); // Depuración: muestra los datos que se enviarán
    try {
      const response = await axios.post("http://localhost:8000/api/clientes/", formData);
      setClientes([...clientes, response.data]); // Actualizar la lista con el nuevo cliente
      setFormData({ nombre: "", email: "", telefono: "" }); // Limpiar el formulario
      setError(null);
    } catch (err) {
      setError("Error al agregar el cliente.");
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
  }, []);

  return (
    <div className="clientes-container">
      <h1>Gestión de Clientes</h1>

      {error && <p className="error">{error}</p>}

      {/* Formulario para agregar cliente */}
      <form className="cliente-form" onSubmit={handleSubmit}>
        <h2>Agregar Cliente</h2>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Agregar Cliente</button>
      </form>

      {/* Lista de clientes */}
      <h2>Lista de Clientes</h2>
      {loading ? (
        <p className="loading">Cargando clientes...</p>
      ) : (
        <div className="clientes-list">
          {clientes.map((cliente) => (
            <div className="cliente-card" key={cliente.id}>
              <h3>{cliente.nombre}</h3>
              <p><strong>Email:</strong> {cliente.email}</p>
              <p><strong>Teléfono:</strong> {cliente.telefono}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Clientes;
