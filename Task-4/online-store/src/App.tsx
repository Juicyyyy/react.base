import Header from './components/Header/Header';
import Banner from './components/Banner/Banner';
import Categories from './components/Categories/Categories';
import Catalog from './components/Catalog/Catalog';
import CatalogPage from './components/CatalogPage/CatalogPage';
import Selection from './components/Selection/Selection';
import CatalogSelection from './components/CatalogSelection/CatalogSelection';
import Footer from './components/Footer/Footer';
import MobileMenu from './components/MobileMenu/MobileMenu';
import useDeviceDetect from './hooks/useDeviceDetect';
import { useState } from 'react';

import catalogData from './data/catalogData.json'
import selectionData from './data/selectionData.json';
import './App.css'

const App = () => {
  const { isMobile } = useDeviceDetect();
  const [currentPage, setCurrentPage] = useState('main');
  const [selectedCategory, setSelectedCategory] = useState(''); 

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setCurrentPage('catalog');
  };

  const handleIconClick = () => {
    setCurrentPage('main');
    setSelectedCategory('');
  };

  return (
    <>
      <Header onIconClick={handleIconClick} onCategorySelect={handleCategorySelect}/>
       {isMobile ? <MobileMenu /> : ''}
      
        {currentPage === 'main' && (
          <>
            <div className='wrapper'>
              <Banner />
              <Categories onCategorySelect={handleCategorySelect} />
              <Catalog items={catalogData.catalog} />
            </div>
            <Selection titleImage="Для_дома" items={selectionData.home} />
            <div className='wrapper'>
              <CatalogSelection titleImage="sale" items={catalogData.sale} />
            </div>
            <Selection titleImage="Для_сна" items={selectionData.home} />
            <div className='wrapper'>
              <CatalogSelection titleImage="treasures" items={catalogData.treasures} />
            </div>
          </>
        )}
        {currentPage === 'catalog' && selectedCategory && (
          <div className='wrapper'>
            <CatalogPage categoryName={selectedCategory} />
          </div>
        )}
      <Footer />
    </>
  );
};

export default App;
