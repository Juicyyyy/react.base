import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import './Header.scss';
import Categories from '../Categories/Categories';
import categoriesData from '../../data/categoriesData.json';

type DropdownProps = {
    filteredQueries: string[];
    popularQueries: string[];
    handleDeleteQuery: (query: string) => void;
    handleOverlayClick: () => void;
    filteredCategories: CategoryType[];
}

type DropdownItemProps = {
    query: string;
    handleDeleteQuery: (query: string) => void;
}

type CategoryType = {
    id: number;
    name: string;
    image: string;
}

const Header = () => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [filteredQueries, setFilteredQueries] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { isMobile } = useDeviceDetect();

    const popularQueries = useMemo(() => [
        'маска гая фокса',
        'циркониевый браслет',
        'нефритовый стержень',
        'шарф лололошки',
        'нож кредитка',
    ], []);
    const categories = categoriesData.categories;

    const handleFocus = () => {
        setDropdownVisible(true);
        filterQueries(searchQuery); 
    };

    const handleOverlayClick = () => {
        setSearchQuery('');
        setDropdownVisible(false);
    };

    const filteredCategories = categories.filter(category => 
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchQuery(value);
        filterQueries(value);
    };

    const filterQueries = useCallback((query: string) => {
        const filteredHistory = searchHistory.filter(item => 
            item.toLowerCase().includes(query.toLowerCase())
        );

        const filteredPopularQueries = popularQueries.filter(item => 
            item.toLowerCase().includes(query.toLowerCase())
        );

        const combinedResults = filteredHistory.length > 0 ? filteredHistory : filteredPopularQueries;
        const filtered = combinedResults.slice(0, 5);
        setFilteredQueries(filtered);
    }, [searchHistory, popularQueries]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && searchQuery.trim() !== '') {
            if (!searchHistory.includes(searchQuery)) {
                setSearchHistory(prevHistory => [searchQuery, ...prevHistory].slice(0, 5));
            }
            setSearchQuery('');
            setDropdownVisible(false);
            inputRef.current?.blur();
        }  
    };

    const handleDeleteQuery = (queryToDelete: string) => {
        setSearchHistory((prevHistory) => 
            prevHistory.filter(query => query !== queryToDelete)
        );
    };

    useEffect(() => {
        filterQueries(searchQuery);
    }, [searchHistory, searchQuery, filterQueries]);

    const toggleDropdown = () => {
        setDropdownVisible(prev => !prev);
    };

    return (
        <header className='header'>
            {(isDropdownVisible && isMobile) ? '' : <span className='header__icon'>магаз</span>}
            {!isMobile && (
                <div className='header__wrapper-input'>
                    <input
                        className='header__search'
                        placeholder='Поиск товаров'
                        ref={inputRef}
                        value={searchQuery}
                        onFocus={handleFocus}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                    <span className='header__search--loupe'></span>
                    {isDropdownVisible && (
                        <Dropdown 
                            filteredQueries={filteredQueries}
                            filteredCategories={filteredCategories} 
                            popularQueries={popularQueries} 
                            handleDeleteQuery={handleDeleteQuery}
                            handleOverlayClick={handleOverlayClick}
                        />
                    )}
                </div>
            )}
            <div className='header__wrapper-button'>
                {isMobile ? 
                    <>
                        {isDropdownVisible ? (
                            <>
                                <input
                                    className='header__search'
                                    placeholder='Поиск товаров'
                                    ref={inputRef}
                                    value={searchQuery}
                                    onFocus={handleFocus}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                />
                                <span className='header__search--loupe'></span>
                                <Dropdown 
                                    filteredQueries={filteredQueries}
                                    filteredCategories={filteredCategories} 
                                    popularQueries={popularQueries} 
                                    handleDeleteQuery={handleDeleteQuery}
                                    handleOverlayClick={handleOverlayClick}
                                />
                            </>)
                            :
                                <button className='header__button header__loupe' onClick={toggleDropdown}></button>
                            }
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

const Dropdown = ({filteredQueries, filteredCategories, popularQueries, handleDeleteQuery, handleOverlayClick }: DropdownProps) => (
    <div className='header__wrapper-dropdown'>
        <div className='overlay' onClick={handleOverlayClick}></div>
        <div className='header__dropdown'>
            {filteredQueries.length > 0 ? (
                <div className='header__search-history'>
                    {filteredQueries.map((query, index) => (
                        <DropdownItem 
                            key={index} 
                            query={query} 
                            handleDeleteQuery={handleDeleteQuery} 
                        />
                    ))}
                </div>
            ) : (
                popularQueries.map((query, index) => (
                    <DropdownItem 
                        key={index} 
                        query={query} 
                        handleDeleteQuery={handleDeleteQuery} 
                    />
                ))
            )}
            <Categories categories={filteredCategories} />
        </div>
    </div>
);

const DropdownItem = ({ query, handleDeleteQuery }: DropdownItemProps) => (
    <div className='header__wrapper-dropdown-item'>
        <div className='header__dropdown-item'>
            {query}
        </div>
        <span className='header__dropdown-icon' onClick={() => handleDeleteQuery(query)}></span>
    </div>
);
  
export default Header;