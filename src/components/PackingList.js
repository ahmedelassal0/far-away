import { useState } from "react";
import Item from "./Item";

export default function PackingList({ items, onToggleItem, onDeleteItem, clearList }) {
    const [sortBy, setSortBy] = useState("input");
    let sortedItems;
    //sort sortedItems
    if (sortBy === "description")
        sortedItems = items.sort((a, b) =>
            a.description.localeCompare(b.description)
        );
    else if (sortBy === "packedStatus")
        sortedItems = items.sort((a, b) => a.packed - b.packed);
    else sortedItems = [...items];
    return (
        <div className="list">
            <ul>
                {sortedItems.map((item) => (
                    <Item
                        onToggleItem={onToggleItem}
                        onDeleteItem={onDeleteItem}
                        key={item.id}
                        item={item}
                    />
                ))}
            </ul>

            <div className="actions">
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="input">Sort by input order</option>
                    <option value="description">Sort by description</option>
                    <option value="packedStatus">Sort by packed status</option>
                </select>
                <button onClick={clearList}>Clear list</button>
            </div>
        </div>
    );
}
