import React, { useState, useEffect, useCallback } from 'react';
import {
  createComment,
  getCommentsForDocument,
  // getRepliesForComment, // Para más adelante
  // updateComment,        // Para más adelante
  // deleteComment         // Para más adelante
} from '../../services/commentService'; // Ajusta la ruta a tu servicio

// Asumimos que tienes una forma de obtener el usuario actual, por ejemplo, desde un contexto de autenticación
// import { useAuth } from '../../contexts/AuthContext'; // Ejemplo

// Función para formatear fechas (puedes usar una librería como date-fns si prefieres)
const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

function getInitials(name) {
  if (!name || typeof name !== 'string') return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

// Componente para un solo comentario (ayuda a organizar y manejar respuestas después)
function CommentItem({ comment, onReply }) {
  // const { currentUser } = useAuth(); // Ejemplo para obtener el usuario actual

  // Lógica para determinar si el usuario actual puede editar/eliminar este comentario
  // const canEdit = currentUser && currentUser.id === comment.user_id;
  // const canDelete = currentUser && (currentUser.id === comment.user_id || currentUser.role === 'administrador');

  return (
    <div
      key={comment.id}
      className="flex items-start space-x-3 bg-white dark:bg-darkSecondary border border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow-sm"
    >
      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-orange-200 dark:bg-orange-600 text-white font-bold text-sm">
        {getInitials(comment.user?.nombre)} {/* Accede al nombre desde comment.user.nombre */}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="font-medium text-gray-800 dark:text-white">
            {comment.user?.nombre || 'Usuario desconocido'}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatDate(comment.created_at)} {/* Usa la fecha del backend */}
          </span>
        </div>
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{comment.content}</p> {/* Usa comment.content */}
        {/* Aquí podrías añadir botones para Responder, Editar, Eliminar */}
        {/* <div className="mt-2 space-x-2">
          <button onClick={() => onReply(comment.id)} className="text-xs text-blue-500 hover:underline">Responder</button>
          {canEdit && <button className="text-xs text-green-500 hover:underline">Editar</button>}
          {canDelete && <button className="text-xs text-red-500 hover:underline">Eliminar</button>}
        </div> */}
      </div>
    </div>
  );
}


function CommentSection({ documentId }) { // Recibe documentId como prop
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState(""); // Renombrado para claridad
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  // const { currentUser, isAuthenticated } = useAuth(); // Ejemplo para obtener el usuario actual

  const fetchComments = useCallback(async () => {
    if (!documentId) return;
    setLoading(true);
    setError(null);
    try {
      const fetchedComments = await getCommentsForDocument(documentId, { limit: 100, skip: 0 }); // Ajusta limit/skip si es necesario
      setComments(fetchedComments || []);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError("No se pudieron cargar los comentarios.");
      setComments([]);
    } finally {
      setLoading(false);
    }
  }, [documentId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) {
      setSubmitError("El comentario no puede estar vacío.");
      return;
    }
    // if (!isAuthenticated) { // Verifica si el usuario está autenticado
    //   setSubmitError("Debes iniciar sesión para comentar.");
    //   return;
    // }

    setSubmitError(null); // Limpia errores anteriores

    try {
      const commentData = {
        document_id: documentId,
        text_content: newCommentText,
        parent_comment_id: null,
      };

      const created = await createComment(commentData);
      setComments(prevComments => [created, ...prevComments]);
      setNewCommentText("");

    } catch (err) {
      console.error("Error submitting comment:", err); // Log completo del error

      let friendlyErrorMessage = "Error al enviar el comentario."; // Mensaje por defecto

      if (err.response && err.response.data) {
        const responseData = err.response.data;

        if (responseData.detail) {
          if (Array.isArray(responseData.detail)) {
            // Es un array de errores de validación de Pydantic
            // Tomamos el mensaje del primer error o los unimos
            if (responseData.detail.length > 0) {
              friendlyErrorMessage = responseData.detail.map(d => {
                // Intenta dar un mensaje más específico si es posible
                const field = d.loc && d.loc.length > 1 ? d.loc[d.loc.length -1] : "Campo";
                                return `${field}: ${d.msg}`;
              }).join('; ');
              // O simplemente el primer mensaje:
              // friendlyErrorMessage = responseData.detail[0].msg || "Error de validación.";
            } else {
              friendlyErrorMessage = "Error de validación desconocido.";
            }
          } else if (typeof responseData.detail === 'string') {
            // Es un string simple (probablemente de una HTTPException manual)
            friendlyErrorMessage = responseData.detail;
          }
        } else if (responseData.message) { // Algunos errores pueden usar 'message'
           friendlyErrorMessage = responseData.message;
        }
      }
      // else if (err.request) { // Error de red, no hubo respuesta
      // friendlyErrorMessage = "No se pudo conectar al servidor.";
      // }

      setSubmitError(friendlyErrorMessage);
    }
  };

  return (
    <div className="mt-10 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Comentarios ({comments.length})</h2>

      {/* Área para nuevo comentario - idealmente solo si el usuario está logueado */}
      {/* {isAuthenticated ? ( */}
      <form onSubmit={handleSubmitComment} className="space-y-3">
        <textarea
          rows="3"
          placeholder="Escribe tu comentario..."
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          required
        />
        {submitError && <p className="text-sm text-red-500">{submitError}</p>}
        <button
          type="submit"
          className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded transition disabled:opacity-50"
          // disabled={!newCommentText.trim()} // Opcional: deshabilitar si no hay texto
        >
          Enviar comentario
        </button>
      </form>
      {/* ) : (
        <p className="text-gray-600 dark:text-gray-400">
          <Link to="/login" className="text-blue-500 hover:underline">Inicia sesión</Link> para dejar un comentario.
        </p>
      )} */}


      {loading && <p className="text-gray-500 dark:text-gray-400">Cargando comentarios...</p>}
      {error && <p className="text-red-500 dark:text-red-400">{error}</p>}

      {!loading && !error && comments.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">No hay comentarios aún. ¡Sé el primero!</p>
      )}

      {!loading && !error && comments.length > 0 && (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              // onReply={(commentIdToReply) => console.log("Replying to:", commentIdToReply)} // Placeholder
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentSection;