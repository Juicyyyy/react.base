import './MobileMenu.scss';
import '../../data/catalogData.json'

const MobileMenu = () => {

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