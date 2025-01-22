import axios from "axios";

const API_URL = "https://678fd0c449875e5a1a937840.mockapi.io/Api/v1/Restaurants";

export const fetchRestaurants = () => axios.get(API_URL);
export const fetchRestaurantDetails = (id) => axios.get(`${API_URL}/${id}`);
useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setRestaurants(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  