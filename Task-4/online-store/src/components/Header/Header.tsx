import React from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';

import './Header.scss';

const Header: React.FC = () => {
    const { isMobile } = useDeviceDetect();

    return (
        <header className='header'>
            <span className='header__icon'>магаз</span>
                {isMobile ? '' : 
                    <div className='header__wrapper-input'>
                        <input className='header__search' placeholder='Поиск товаров'/>
                        <span className='header__search--loupe'></span>
                    </div>
                }
            <div className='header__wrapper-button'>
                {isMobile ? 
                    <>
                        <button className='header__button header__loupe'></button>
                    </>
                : 
                    <>
                        <button className='header__button header__basket'></button>
                        <button className='header__button header__orders'></button>
                        <button className='header__button header__favorites'></button>
                        <button className='header__button header__profile'></button>
                    </>
                }
            </div>
        </header>
    );
};
  
export default Header;