import React from 'react';
import { Item } from '../types/Item';
import './InventoryItem.css';

interface InventoryItemProps {
    item: Item;
    x: number;
    y: number;
}

const InventoryItem: React.FC<InventoryItemProps> = ({ item, x, y }) => {
    const style = {
        gridRow: y + 1,
        gridColumn: x + 1,
        backgroundColor: item.rarity === 'common' ? 'green' : item.rarity === 'rare' ? 'purple' : 'blue',
        width: `${item.width * 100}%`,
        height: `${item.height * 100}%`,
    };

    return (
        <div className="inventory-item" style={style}>
            {item.name}
        </div>
    );
};

export default InventoryItem;