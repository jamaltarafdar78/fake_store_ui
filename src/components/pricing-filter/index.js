import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  PriceFilterTypes,
  PriceFilterTypesValues,
} from '../../redux/reducers/price-filter';
import { titleCaseString } from '../../utils';
import './pricing-filter.css';

const PriceFilterOptions = PriceFilterTypesValues.map((filterType) => ({
  type: filterType,
  displayText: titleCaseString(filterType),
})).map(({ type, displayText }) => (
  <option key={type} value={type}>
    {displayText}
  </option>
));

export const PriceFilter = ({ dispatcher, disabled }) => {
  const [filterValue, setFilterValue] = useState();
  const [filterType, setFilterType] = useState(PriceFilterTypes.NONE);

  const NO_FILTER = useMemo(
    () => filterType === PriceFilterTypes.NONE,
    [filterType]
  );

  const handleFilterTypeSelection = useCallback(
    (event) => {
      const selectedFilterType = event.currentTarget.value;
      if (!selectedFilterType) return;
      setFilterType(selectedFilterType);
    },
    [setFilterType]
  );

  const handleFilterValueChange = useCallback(
    (event) => {
      const selectedFilterValue = event.currentTarget.value;
      try {
        const selectedValue = parseFloat(selectedFilterValue);
        setFilterValue(selectedValue);
      } catch {
        return;
      }
    },
    [setFilterValue]
  );

  useEffect(() => {
    if (!dispatcher) {
      console.warn('dispatcher not set');
      return;
    }
    if (NO_FILTER) {
      return dispatcher({ type: PriceFilterTypes.NONE });
    } else if (filterValue) {
      return dispatcher({ type: filterType, payload: filterValue });
    }
    return;
  }, [dispatcher, filterType, filterValue, NO_FILTER]);

  return (
    <div className="price-filter-wrapper">
      <label htmlFor="operator-selector" className="price-filter-label">
        Price Filter
      </label>
      <select
        id="operator-selector"
        className="price-filter-selector"
        defaultValue={filterType}
        disabled={disabled}
        onChange={handleFilterTypeSelection}
      >
        {PriceFilterOptions}
      </select>
      <input
        type="text"
        className="price-filter-label"
        disabled={disabled || NO_FILTER}
        onChange={handleFilterValueChange}
      />
    </div>
  );
};
