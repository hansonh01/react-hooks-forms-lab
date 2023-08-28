import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [shoppingItems, setShoppingItems] = useState(items);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  const handleSearchTerm = (e) => setSearchTerm(e.target.value);

  const handleShoppingItems = (newItem) => setShoppingItems([...shoppingItems,newItem]);

  const itemsToDisplay = shoppingItems.filter((item) => {
    const matchCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchFilter = item.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchCategory && (!searchTerm || matchFilter)
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleShoppingItems}/>
      <Filter onCategoryChange={handleCategoryChange} search={searchTerm} onSearchChange={handleSearchTerm} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
