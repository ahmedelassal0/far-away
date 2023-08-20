import { useState } from "react";

const initialItems = [
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: true },
];

export default function App() {
    const [items, setItems] = useState(initialItems);
    function handleAddItem(item) {
        setItems([...items, item]);
    }

    function handleDeleteItem(itemId) {
        setItems((items) => items.filter((item) => item.id !== itemId));
    }

    function handleToggleItem(itemId) {
        setItems((items) =>
            items.map((item) =>
                item.id === itemId ? { ...item, packed: !item.packed } : item
            )
        );
    }

    function clearList () {
        setItems([]);
    }
    return (
        <div className="app">
            <Header />
            <Form onAddItem={handleAddItem} />
            <PackingList
                onToggleItem={handleToggleItem}
                onDeleteItem={handleDeleteItem}
                clearList={clearList}
                items={items}
            />
            <Stats items={items} />
        </div>
    );
}

function Header() {
    return <h1 className="">🌴FAR AWAY💼</h1>;
}

function Form({ onAddItem }) {
    const [description, setDescribtion] = useState("");
    const [quantity, setQuantity] = useState(1);

    const count = Array.from({ length: 20 }, (_, i) => i + 1);
    function handleSubmit(e) {
        e.preventDefault();

        if (!description) return;
        // prepare new item
        const newItem = {
            id: Date.now(),
            description,
            quantity: Number(quantity),
            packed: false,
        };

        onAddItem(newItem);
        // restore form inputs
        setDescribtion("");
        setQuantity(1);
    }
    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <label>What do you need for your 😍 trip</label>
            <select
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
            >
                {count.map((el) => (
                    <option key={el} value={el}>
                        {el}
                    </option>
                ))}
            </select>
            <input
                onChange={(e) => setDescribtion(e.target.value)}
                value={description}
                type="text"
                placeholder="Items..."
            />
            <button>ADD</button>
        </form>
    );
}

function PackingList({ items, onToggleItem, onDeleteItem, clearList }) {
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

function Item({ item, onToggleItem, onDeleteItem }) {
    return (
        <li>
            <input
                onChange={() => onToggleItem(item.id)}
                defaultChecked={item.packed && true}
                type="checkbox"
            ></input>

            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
                {item.quantity} {item.description}
            </span>

            <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li>
    );
}

function Stats({ items }) {
    const packedItems = items.filter((item) => item.packed === true);
    return (
        <footer className="stats">
            <em>
                You have {items.length} items on your list, and you 've already
                packed {packedItems.length} (
                {Math.floor((packedItems.length / items.length) * 100) || '0'}%)
            </em>
        </footer>
    );
}
