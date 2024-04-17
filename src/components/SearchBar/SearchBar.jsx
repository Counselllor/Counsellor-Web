import "./SearchBar.css";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <div className="search">
        <img src="src/assets/icons8-search-50.png" />
        <div className="vl"></div>
        <input
          type="text"
          placeholder="Type college name or university name"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button>Search</button>
      </div>
    </>
  );
};

export default SearchBar;
