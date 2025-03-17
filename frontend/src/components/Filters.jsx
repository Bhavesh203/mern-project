import React from "react";

const Filters = ({ filter, setFilter }) => {
    return (
        <div>
            <h3>Filters</h3>
            <label>Category:</label>
            <select onChange={(e) => setFilter(e.target.value)}>
                <option value="">All</option>
                <option value="sneakers">Sneakers</option>
                <option value="flats">Flats</option>
            </select>
        </div>
    );
};

export default Filters;
