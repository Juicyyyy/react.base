import React, { useEffect, useState } from 'react';
import Inventory from './components/Inventory';
import { Item } from './types/Item';
import inventoryDataJson from './data/inventory2.json'; // тут можно поменять файл инвентаря

const App: React.FC = () => {
  const [inventoryData, setInventoryData] = useState<Item[]>([]);

  useEffect(() => {
    setInventoryData(inventoryDataJson as Item[]);
  }, []);
  
  return (
    <>
      <h1>Inventory</h1>
      <Inventory data={inventoryData} />
    </>
  );
};

export default App;