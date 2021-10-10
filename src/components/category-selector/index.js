import { useCallback } from 'react';
import { AppStatusTypes } from '../../redux/reducers/app-status';
import { ALL } from '../../utils';
import './category-selector.css';

export const CategorySelector = ({ dispatcher, categories, disabled }) => {
  const onSelectCategoryChange = useCallback(
    (event) => {
      if (!dispatcher) return console.log('Dispatcher not set!');
      const selectedCategory = event.currentTarget.value;
      if (!selectedCategory) return;

      if (selectedCategory === ALL) {
        return dispatcher({ type: AppStatusTypes.LOADING_ALL });
      }
      return dispatcher({
        type: AppStatusTypes.LOAD_BY_CATEGORY,
        payload: selectedCategory,
      });
    },
    [dispatcher]
  );

  return (
    <div className="filter-controls-wrapper">
      <label htmlFor="categorySelector" className="category-label">
        Selected Category
      </label>
      <select
        id="categorySelector"
        disabled={disabled}
        defaultValue="All"
        onChange={onSelectCategoryChange}
        className="category-selector"
      >
        {categories.map(({ displayLabel, value }) => (
          <option key={value} value={value}>
            {displayLabel}
          </option>
        ))}
      </select>
    </div>
  );
};
