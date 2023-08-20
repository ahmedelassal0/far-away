import { useState } from "react";
import Header from "./Header";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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

    function clearList() {
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
