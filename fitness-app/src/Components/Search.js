import React, { useState } from "react";
import { AxiosWithAuth } from "./utils/AxiosWithAuth";

const Search = ({ setClassList }) => {
  const [query, setQuery] = useState();

  const handleChange = (e) => {
    AxiosWithAuth()
      .get(`/search/classes?q=${e.target.value}`)
      .then((res) => {
        setClassList(res.data);
      })
      .catch((error) => console.log(error.response.data));
  };

  return (
    <div className="search">
      <input
        placeholder="Search"
        type="text"
        onChange={handleChange}
        value={query}
      />
    </div>
  );
};

export default Search;
