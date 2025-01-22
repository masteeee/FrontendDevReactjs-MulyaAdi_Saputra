import React from "react";

function Header({ filter, setFilter }) {
  const handleFilterChange = (key, value) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white shadow-md p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-2">Restaurants</h1>
        <p className="text-gray-600 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="border-t border-gray-200 pt-4">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-8">
      <span className="text-gray-700 font-medium">Filter By:</span>


      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-blue-600 rounded-full"
          checked={filter.openNow}
          onChange={(e) => handleFilterChange("openNow", e.target.checked)}
        />
        <span className="text-gray-600">Open Now</span>
      </label>

 
      <div className="relative">
  <select
    className="appearance-none bg-transparent border-b border-gray-400 text-gray-600 focus:outline-none focus:border-blue-600 pr-6" // Tambahkan pr-6
    value={filter.price}
    onChange={(e) => handleFilterChange("price", e.target.value)}
  >
    <option value="" disabled>
      Price
    </option>
    <option value="$">$</option>
    <option value="$$">$$</option>
    <option value="$$$">$$$</option>
  </select>

  <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400">▼</span>
</div>

 
      <div className="relative">
  <select
    className="appearance-none bg-transparent border-b border-gray-400 text-gray-600 focus:outline-none focus:border-blue-600 pr-6" // Tambahkan pr-6
    value={filter.category}
    onChange={(e) => handleFilterChange("category", e.target.value)}
  >
    <option value="" disabled>
      Categories
    </option>
    <option value="Mexican">Mexican</option>
    <option value="Italian">Italian</option>
    <option value="Japanese">Japanese</option>
    <option value="Thai">Thai</option>
    <option value="Seafood">Seafood</option>
    <option value="Steakhouse">Steakhouse</option>
    <option value="American">American</option>
  </select>
  {/* Dropdown Icon */}
  <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400">▼</span>
</div>
    </div>


    <button
      onClick={() => setFilter({ openNow: false, price: "", category: "" })}
      className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
    >
      CLEAR ALL
    </button>
  </div>
</div>

      </div>
    </div>
  );
}

export default Header;
