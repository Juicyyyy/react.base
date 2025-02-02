import categoriesData from '../../data/categoriesData.json';

import './Categories.scss';

type Category = {
    id: number;
    name: string;
    image: string;
}

type CategoriesProps = {
    categories?: Category[];
    onCategorySelect: (categoryName: string) => void;
}

const Categories = ({ categories = categoriesData.categories, onCategorySelect}: CategoriesProps) => {
    return (
        <div className='categories'>
            <ul className='categories__list'>
                {categories.map(category => (
                    <li className='categories__item' key={category.id} onClick={() => onCategorySelect(category.name)}>
                        <img src={`./src/assets/img/${category.image}`} className='categories__img' alt={category.name}/>
                        <span className='categories__title'>{category.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
  
export default Categories;