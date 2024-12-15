import React from 'react';
import InventoryItem from './InventoryItem';
import { Item } from '../types/Item';
import './Inventory.css';

interface InventoryProps {
  data: Item[];
}

const Inventory: React.FC<InventoryProps> = ({ data }) => {

  const gridSize = { rows: 5, cols: 5 };

  const renderItems = () => {
    const grid: JSX.Element[] = [];
    const occupied: boolean[][] = Array.from({ length: gridSize.rows }, () => Array(gridSize.cols).fill(false));

    data.forEach(item => {
      let placed = false;
      for (let row = 0; row < gridSize.rows; row++) {
        for (let col = 0; col < gridSize.cols; col++) {
          // Проверяем, помещается ли элемент в текущую позицию
          if (
            row + item.height <= gridSize.rows && 
            col + item.width <= gridSize.cols &&
            !occupied.slice(row, row + item.height).some(rowArray => rowArray.slice(col, col + item.width).some(cell => cell))
          ) {
            // Если помещается, добавляем элемент в сетку
            grid.push(<InventoryItem key={item.id} item={item} x={col} y={row} />);
            // Помечаем ячейки как занятые
            for (let r = 0; r < item.height; r++) {
              for (let c = 0; c < item.width; c++) {
                occupied[row + r][col + c] = true;
              }
            }
            placed = true;
            break;
          }
        }
        if (placed) break;
      }
      if (!placed) {
        console.error(`Предмет ${item.name} не поместился в инвентарь!`);
      } 
    });

    return grid;
  };

  return (
    <div className="inventory">
      {renderItems()}
    </div>
  );
};

export default Inventory;