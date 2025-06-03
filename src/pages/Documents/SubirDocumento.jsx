import React, { useState } from "react";
import { subirDocumento } from "../../services/documentService";
import AuthWrapper from "../../components/AuthWrapper";
import Button from "../../components/Button";
import memoriaAntiqua from "../../assets/MomoriaAntiqua.jpg";

function SubirDocumento() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    short_description: "",
    publisher: "",
    isbn: "",
    page_count: "",
    is_scanned: false,
    edition_details: "",
    document_level: 1,
    category_ids: "",
    tag_ids: "",
    historical_event_ids: "",
  });

  const [documentFile, setDocumentFile] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (["category_ids", "tag_ids", "historical_event_ids"].includes(key)) {
        if (value.trim()) {
          value.split(",").forEach((id) => data.append(key, parseInt(id.trim())));
        }
      } else {
        data.append(key, value);
      }
    });

    if (documentFile) data.append("document_file", documentFile);
    if (coverImageFile) data.append("cover_image_file", coverImageFile);

    console.log("📦 FormData enviado:");
    for (let pair of data.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    console.log("🪪 TOKEN:", localStorage.getItem("authToken"));

    try {
      const res = await subirDocumento(data);
      setMensaje("📄 Documento subido correctamente.");
      console.log("✅ Documento creado:", res.data);
    } catch (error) {
      console.error("❌ Error al subir documento", error);
      setMensaje("❌ Hubo un error al subir el documento.");
    }
  };

  return (
    <AuthWrapper>
      <div className="flex flex-col md:flex-row w-full max-w-4xl mx-auto bg-white dark:bg-base rounded-xl shadow-lg overflow-hidden animate-fadeIn">
        <div className="hidden md:block md:w-1/2 bg-gray-100 dark:bg-dark p-0">
          <img
            src={memoriaAntiqua}
            alt="Memoria Antiqua"
            className="h-full w-full object-contain p-4"
          />
        </div>
        <div className="w-full md:w-1/2 p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-primary dark:text-accent mb-6">
            Subir Documento 📄
          </h2>

          {mensaje && <p className="mb-4 text-sm text-center">{mensaje}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="title" placeholder="Título *" onChange={handleChange} className="input" required />
            <input type="text" name="author" placeholder="Autor" onChange={handleChange} className="input" />
            <textarea name="short_description" placeholder="Descripción corta" onChange={handleChange} className="input" />
            <input type="text" name="publisher" placeholder="Editorial" onChange={handleChange} className="input" />
            <input type="text" name="isbn" placeholder="ISBN" onChange={handleChange} className="input" />
            <input type="number" name="page_count" placeholder="Nº de páginas" onChange={handleChange} className="input" />
            <input type="text" name="edition_details" placeholder="Edición" onChange={handleChange} className="input" />
            <input type="number" name="document_level" placeholder="Nivel documental (1)" onChange={handleChange} className="input" />

            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              <input type="checkbox" name="is_scanned" onChange={handleChange} className="mr-2" /> Escaneado
            </label>

            <input type="text" name="category_ids" placeholder="IDs de categoría (1,2)" onChange={handleChange} className="input" />
            <input type="text" name="tag_ids" placeholder="IDs de etiquetas (1,2)" onChange={handleChange} className="input" />
            <input type="text" name="historical_event_ids" placeholder="IDs de eventos (1,2)" onChange={handleChange} className="input" />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Archivo PDF:
                <input type="file" accept=".pdf" onChange={(e) => setDocumentFile(e.target.files[0])} required className="mt-1" />
              </label>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Imagen de portada:
                <input type="file" accept="image/*" onChange={(e) => setCoverImageFile(e.target.files[0])} className="mt-1" />
              </label>
            </div>

            <Button type="submit" variant="neutral" className="w-full py-3 text-base">
              Subir Documento
            </Button>
          </form>
        </div>
      </div>
    </AuthWrapper>
  );
}

export default SubirDocumento;