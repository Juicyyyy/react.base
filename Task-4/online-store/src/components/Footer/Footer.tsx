import React from 'react';

import './Footer.scss';

const Footer: React.FC = () => {
    return (
        <footer className='footer'>
            <span className='footer__text footer__left'>© 2023 Магаз</span>
            <div className='footer__right'>
                <span className='footer__text footer__mail'>support@magaz.ru</span>
                <div className='footer__icons'>
                    <div className='footer__icon footer__telegram'></div>
                    <div className='footer__icon footer__dzen'></div>
                    <div className='footer__icon footer__youtube'></div>
                </div>
            </div>
        </footer>
    );
};
  
export default Footer;