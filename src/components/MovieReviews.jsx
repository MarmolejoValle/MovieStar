import { useState, useEffect } from "react";

export default function MovieReviews({ movieId }) {
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState("");
  const [reviews, setReviews] = useState([]); // Estado para almacenar las reseñas existentes
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://192.168.1.234:2003/api/review/viewForMovie", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idMovie: movieId }),
        });

        if (response.ok) {
          const data = await response.json();
          setReviews(data); // Almacena las reseñas en el estado
        } else {
          console.error("Error al obtener las reseñas");
        }
      } catch (err) {
        console.error("Error de conexión:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  const handleRatingChange = (e) => {
    setUserRating(parseFloat(e.target.value));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Debes iniciar sesión para enviar una reseña.");
      return;
    }

    if (!userRating || userReview.trim() === "") {
      alert("Por favor, completa todos los campos antes de enviar.");
      return;
    }

    const payload = {
      idMovie: movieId, // Se recibe como prop
      comment: userReview,
      rating: userRating,
      idUser: userId,
    };

    try {
      const response = await fetch("http://192.168.1.234:2003/api/review/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("¡Gracias por enviar tu reseña!");
        setUserRating(0);
        setUserReview("");

        // Recargar las reseñas después de enviar
        const updatedReviews = await fetch("http://192.168.1.234:2003/api/review/viewForMovie", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idMovie: movieId }),
        });

        if (updatedReviews.ok) {
          const newReviews = await updatedReviews.json();
          setReviews(newReviews);
        }
      } else {
        const error = await response.json();
        console.error("Error al enviar la reseña:", error);
        alert("Hubo un problema al enviar tu reseña. Inténtalo de nuevo.");
      }
    } catch (err) {
      console.error("Error de conexión:", err);
      alert("No se pudo conectar al servidor. Por favor, inténtalo más tarde.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {/* Formulario para añadir reseña */}
      <div className="bg-azulprincipal border border-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Tu Reseña</h2>
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-white"
            >
              Calificación: {userRating}/10
            </label>
            <input
              type="range"
              id="rating"
              min="0"
              max="10"
              step="1"
              value={userRating}
              onChange={handleRatingChange}
              className="w-full mt-2 accent-white"
            />
          </div>
          <textarea
            placeholder="Escribe tu reseña aquí..."
            value={userReview}
            onChange={(e) => setUserReview(e.target.value)}
            rows="4"
            className="w-full bg-azulsecundario rounded-lg p-3 focus:ring-2 focus:ring-white"
          ></textarea>
          <button
            type="submit"
            className="bg-rojosecundario text-white py-2 px-4 rounded-lg hover:bg-white hover:text-rojosecundario transition duration-500 ease-in-out"
          >
            Enviar Reseña
          </button>
        </form>
      </div>

      {/* Reseñas existentes */}
      <div className="bg-transparent rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Reseñas de la Película</h2>
        {loading ? (
          <p>Cargando reseñas...</p>
        ) : reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <ReviewItem
                key={index}
                name={review.name}
                rating={review.rating}
                review={review.comment}
              />
            ))}
          </div>
        ) : (
          <p>No hay reseñas para esta película.</p>
        )}
      </div>
    </div>
  );
}

function ReviewItem({ name, rating, review }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div>
            <p className="font-semibold">{name}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            width="24"
            height="24"
            stroke-width="2"
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke="currentColor"
          >
            <path d="M17.286 21.09q -1.69 .001 -5.288 -2.615q -3.596 2.617 -5.288 2.616q -2.726 0 -.495 -6.8q -9.389 -6.775 2.135 -6.775h.076q 1.785 -5.516 3.574 -5.516q 1.785 0 3.574 5.516h.076q 11.525 0 2.133 6.774q 2.23 6.802 -.497 6.8"></path>
          </svg>
          <span className="font-bold">{rating.toFixed(1)}</span>
          <span className="text-sm text-gray-500">/10</span>
        </div>
      </div>
      <p className="text-sm text-gray-600">{review}</p>
    </div>
  );
}
