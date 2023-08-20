export default function Stats({ items }) {
    const packedItems = items.filter((item) => item.packed === true);
    return (
        <footer className="stats">
            <em>
                You have {items.length} items on your list, and you 've already
                packed {packedItems.length} (
                {Math.floor((packedItems.length / items.length) * 100) || "0"}%)
            </em>
        </footer>
    );
}
