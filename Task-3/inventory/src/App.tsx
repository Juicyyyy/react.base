import { Component } from 'react';
import Inventory from './components/Inventory';
import { Item } from './types/Item';
import inventoryDataJson from './data/inventory2.json'; // тут можно поменять файл инвентаря

interface AppState {
  inventoryData: Item[];
}

class App extends Component<object, AppState> {

  state = {
    inventoryData: [],
  };

  componentDidMount() {
    this.setState({ inventoryData: inventoryDataJson as Item[] });
  }

  render() {
    return (
      <>
        <h1>Inventory</h1>
        <Inventory data={this.state.inventoryData} />
      </>
    );
  }
}

export default App;