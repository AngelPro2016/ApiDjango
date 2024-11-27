import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Libros.css";

const Libros = () => {
  const [libros, setLibros] = useState([]);
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    categoria: "",
    stock: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Obtener la lista de libros
  const fetchLibros = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/libros/");
      setLibros(response.data);
      setError(null);
    } catch (err) {
      setError("Error al cargar los libros.");
    } finally {
      setLoading(false);
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    try {
      const response = await axios.post("http://localhost:8000/api/libros/", formData);
      setLibros([...libros, response.data]); // Agregar el nuevo libro a la lista
      setFormData({ titulo: "", autor: "", categoria: "", stock: "" }); // Limpiar el formulario
      setError(null);
    } catch (err) {
      setError("Error al agregar el libro.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchLibros();
  }, []);

  return (
    <div className="libros-container">
      <h1>Gestión de Libros</h1>

      {error && <p className="error">{error}</p>}

      {/* Formulario para agregar libro */}
      <form className="libro-form" onSubmit={handleSubmit}>
        <h2>Agregar Libro</h2>
        <div className="form-group">
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="autor">Autor:</label>
          <input
            type="text"
            id="autor"
            name="autor"
            value={formData.autor}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="categoria">Categoría:</label>
          <input
            type="text"
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Agregar Libro</button>
      </form>

      {/* Lista de libros */}
      <h2>Lista de Libros</h2>
      {loading ? (
        <p className="loading">Cargando libros...</p>
      ) : (
        <div className="libros-list">
          {libros.map((libro) => (
            <div className="libro-card" key={libro.id}>
              <h3>{libro.titulo}</h3>
              <p><strong>Autor:</strong> {libro.autor}</p>
              <p><strong>Categoría:</strong> {libro.categoria}</p>
              <p><strong>Stock:</strong> {libro.stock}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Libros;
