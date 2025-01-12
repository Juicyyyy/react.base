import Catalog, {CatalogItem} from '../Catalog/Catalog';
import useDeviceDetect from '../../hooks/useDeviceDetect';

import './CatalogSelection.scss';

type CatalogSelectionProps = {
    titleImage: string;
    items: CatalogItem[];
}

const CatalogSelection = ({ titleImage, items }: CatalogSelectionProps) => {
    const { isTablet } = useDeviceDetect();

    let titleStyle;
    if (titleImage === 'treasures' && isTablet) {
        titleStyle = { backgroundImage: `url(./src/assets/img/${titleImage}.png)`, top: '5px', left: '3px', backgroundSize: '353px 87px' };
    } else if (titleImage === 'treasures' && !isTablet) {
        titleStyle = { backgroundImage: `url(./src/assets/img/${titleImage}.png)`, top: '58px', left: '28px' };
    } else if (titleImage === 'sale' && isTablet) {
        titleStyle = { backgroundImage: `url(./src/assets/img/${titleImage}.png)`, top: '22px', left: '-3px', backgroundSize: '142px 65px' };
    } else if (titleImage === 'sale' && !isTablet) {
        titleStyle = { backgroundImage: `url(./src/assets/img/${titleImage}.png)`, top: '98px', left: '-6px' };
    }

    return (
        <div className='catalog-selection'>
            <div className='catalog-selection__wrapper'>
                <div className='catalog-selection__title' style={titleStyle}></div>
            </div>
           <Catalog items={items} />
        </div>
    );
};
  
export default CatalogSelection;