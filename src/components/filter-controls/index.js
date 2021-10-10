import { useCallback, useMemo } from 'react';
import { AppStatusTypes } from '../../redux/reducers/app-status';
import './filter-controls.css';

export const ALL = 'All';

export const titleCaseString = (word) =>
  `${word.charAt(0).toUpperCase()}${word.slice(1)}`;

export const FilterControls = ({ dispatcher, categories, disabled }) => {
  const displayCategoryTextAndValue = useMemo(() => {
    return categories
      .map((category) => ({
        displayLabel: String(category)
          .split(' ')
          .map(titleCaseString)
          .join(' '),
        value: category,
      }))
      .concat({ displayLabel: ALL, value: ALL });
  }, [categories]);

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
        {displayCategoryTextAndValue.map(({ displayLabel, value }) => (
          <option key={value} value={value}>
            {displayLabel}
          </option>
        ))}
      </select>
    </div>
  );
};
