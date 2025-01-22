import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RESTAURANT_API_URL = "https://678fd0c449875e5a1a937840.mockapi.io/Api/v1/Restaurants";
const REVIEWS_API_URL = "https://67915a25af8442fd7379d17a.mockapi.io/Api/v1/reviews";

function RestaurantDetail() {
  const { id } = useParams(); 
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loadingRestaurant, setLoadingRestaurant] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [errorRestaurant, setErrorRestaurant] = useState(null);
  const [errorReviews, setErrorReviews] = useState(null);


  useEffect(() => {
    axios
      .get(`${RESTAURANT_API_URL}/${id}`)
      .then((response) => {
        setRestaurant(response.data);
        setLoadingRestaurant(false);
      })
      .catch((error) => {
        setErrorRestaurant(error.message);
        setLoadingRestaurant(false);
      });
  }, [id]);


  useEffect(() => {
    axios
      .get(REVIEWS_API_URL)
      .then((response) => {
        setReviews(response.data);
        setLoadingReviews(false);
      })
      .catch((error) => {
        setErrorReviews(error.message);
        setLoadingReviews(false);
      });
  }, []);


  if (loadingRestaurant) return <div className="text-center mt-8">Loading restaurant details...</div>;
  if (errorRestaurant) return <div className="text-center mt-8 text-red-500">Error: {errorRestaurant}</div>;

  return (
    <div className="container mx-auto p-4">

      <div className="mb-6">
        <h1 className="text-3xl font-bold">{restaurant.name}</h1>
        <p className="text-gray-600 text-sm mt-2">Rating: {restaurant.rating ? restaurant.rating.toFixed(1) : "N/A"} / 5</p>
      </div>


      <div className="w-full h-64 bg-gray-200 rounded-lg mb-6">
        <p className="text-center text-gray-500 pt-24">Map Placeholder</p>
      </div>

 
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {loadingReviews ? (
          <p>Loading reviews...</p>
        ) : errorReviews ? (
          <p className="text-red-500">Error: {errorReviews}</p>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="flex items-start gap-4 p-4 border rounded-lg shadow-sm mb-4">
   
              <img
                src={review.photo || "https://via.placeholder.com/150"}
                alt={review.name}
                className="w-16 h-16 rounded-full object-cover"
              />
  
              <div>
                <p className="font-semibold">{review.name}</p>
                <p className="text-sm text-gray-500">Rating: {review.rating} / 5</p>
                <p className="text-gray-700 mt-2">{review.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews available.</p>
        )}
      </div>
    </div>
  );
}

export default RestaurantDetail;
