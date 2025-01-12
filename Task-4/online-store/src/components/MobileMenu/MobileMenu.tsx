import React from 'react';

import './MobileMenu.scss';

const MobileMenu: React.FC = () => {

    return (
        <div className='mobile-menu'>
            <button className='mobile-menu__button mobile-menu__profile'></button>
            <button className='mobile-menu__button mobile-menu__orders'></button>
            <button className='mobile-menu__button mobile-menu__favorites'></button>
            <button className='mobile-menu__button mobile-menu__basket'></button>
        </div>
    );
};
  
export default MobileMenu;