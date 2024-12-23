import React from 'react';
import Catalog, {CatalogItem} from '../Catalog/Catalog';

import './CatalogSelection.scss';

type CatalogSelectionProps = {
    titleImage: string;
    items: CatalogItem[];
}

const CatalogSelection: React.FC<CatalogSelectionProps> = ({ titleImage, items }) => {
    return (
        <div className='catalog-selection'>
           <div className='catalog-selection__title' style={{ backgroundImage: `url(./src/assets/img/${titleImage}.png)` }}></div>
           <Catalog items={items} />
        </div>
    );
};
  
export default CatalogSelection;