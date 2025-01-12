import Header from './components/Header/Header';
import Banner from './components/Banner/Banner';
import Categories from './components/Categories/Categories';
import Catalog from './components/Catalog/Catalog';
import Selection from './components/Selection/Selection';
import CatalogSelection from './components/CatalogSelection/CatalogSelection';
import Footer from './components/Footer/Footer';
import MobileMenu from './components/MobileMenu/MobileMenu';
import useDeviceDetect from './hooks/useDeviceDetect';

import catalogData from './data/catalogData.json'
import selectionData from './data/selectionData.json';
import './App.css'

const App = () => {
  const { isMobile } = useDeviceDetect();
  return (
    <>
      <Header />
      {isMobile ? <MobileMenu /> : ''}
      <div className='wrapper'>
        <Banner />
        <Categories />
        <Catalog items={catalogData.catalog} />
      </div>
      <Selection titleImage="Для_дома" items={selectionData.home}/>
      <div className='wrapper'>
        <CatalogSelection titleImage="sale" items={catalogData.sale} />
      </div>
      <Selection titleImage="Для_сна" items={selectionData.home}/>
      <div className='wrapper'>
        <CatalogSelection titleImage="treasures" items={catalogData.treasures} />
      </div>
      <Footer />
    </>
  );
};

export default App;
