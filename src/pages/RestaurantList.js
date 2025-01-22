import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { FaStar, FaRegStar } from "react-icons/fa";

// URL API
const API_URL = "https://678fd0c449875e5a1a937840.mockapi.io/Api/v1/Restaurants";

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [filter, setFilter] = useState({ openNow: false, price: "", category: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        console.log("Fetched Restaurants:", response.data);
        const updatedRestaurants = response.data.map((restaurant) => {
          if (restaurant.id === "2" || restaurant.id === "5") {
            return { ...restaurant, isOpen: false };
          }
          return { ...restaurant, isOpen: true };
        });

        setRestaurants(updatedRestaurants);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const isOpen = filter.openNow ? restaurant.isOpen : true;
    const matchesPrice = filter.price ? restaurant.price === filter.price : true;
    const matchesCategory = filter.category ? restaurant.categories.includes(filter.category) : true;
    return isOpen && matchesPrice && matchesCategory;
  });

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <FaStar key={`full-${i}`} className="text-yellow-500" />
          ))}
        {halfStar && <FaStar className="text-yellow-500" />}
        {Array(emptyStars)
          .fill(0)
          .map((_, i) => (
            <FaRegStar key={`empty-${i}`} className="text-yellow-500" />
          ))}
      </div>
    );
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <Header filter={filter} setFilter={setFilter} />
      <h2 className="text-lg font-semibold mt-20">All Restaurants</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {filteredRestaurants.map((restaurant) => (
          <div key={restaurant.id} className="border rounded-lg shadow-md p-4">
            <img
              src={restaurant.photos[0]}
              alt={restaurant.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{restaurant.name}</h3>
            {restaurant.rating && <div className="mb-2">{renderStars(restaurant.rating)}</div>}
            <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
              <div className="flex space-x-4">
                <span>{restaurant.categories[0]}</span>
                <span>{restaurant.price || "N/A"}</span>
              </div>
              <div className="flex items-center">
                <span
                  className={`w-3 h-3 rounded-full ${
                    restaurant.isOpen ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
                <span className="ml-2 text-sm text-gray-600">
                  {restaurant.isOpen ? "Open Now" : "Closed"}
                </span>
              </div>
            </div>
            <Link
              to={`/restaurant/${restaurant.id}`}
              className="block mt-4 bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700"
            >
              Learn More
            </Link>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button className="px-6 py-2 bg-gray-100 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-200">
          Load More
        </button>
      </div>
    </div>
  );
}

export default RestaurantList;
