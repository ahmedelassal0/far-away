import { useState } from "react";

export default function Form({ onAddItem }) {
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
