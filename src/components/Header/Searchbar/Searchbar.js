import React from "react";

function Searchbar() {
  return (
    <div className="d-flex">
      <input
        className="form-control"
        type="text" 
        placeholder="Szukaj" />
      <button
        className="ms-1 btn btn-secondary">Szukaj</button>
    </div>
  );
}

export default Searchbar;