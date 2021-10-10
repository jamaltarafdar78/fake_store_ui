import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilterControls } from '.';
import { AppStatusTypes } from '../../redux/reducers/app-status';
import { ALL, displayCategoryTextAndValue, titleCaseString } from '../../utils';

const mockDispatcher = jest.fn();
const categories = ['category 1', 'category 2'];
const categoriesWithDisplayValues = displayCategoryTextAndValue(categories);

describe('<FilterControl />', () => {
  test('when ALL is selected, dispatcher is called with type to get all', () => {
    const { getByLabelText, getByText } = render(
      <FilterControls
        dispatcher={mockDispatcher}
        categories={categoriesWithDisplayValues}
      />
    );
    const selectedOptionText = ALL;
    expect(getByText(selectedOptionText)).toBeInTheDocument();

    userEvent.selectOptions(
      getByLabelText('Selected Category'),
      selectedOptionText
    );

    const selectedOption = getByText(selectedOptionText);
    const unSelectedOption = getByText(titleCaseString(categories[0]));
    expect(selectedOption.selected).toBeTruthy();
    expect(unSelectedOption.selected).toBeFalsy();
    expect(mockDispatcher).toHaveBeenCalledWith({
      type: AppStatusTypes.LOADING_ALL,
    });
  });

  test('when a CATEGORY is selected, dispatcher is called with type to get products for that CATEGORY', () => {
    const { getByLabelText, getByText } = render(
      <FilterControls
        dispatcher={mockDispatcher}
        categories={categoriesWithDisplayValues}
      />
    );
    const selectedOptionValue = categories[0];
    const selectedOptionText = titleCaseString(selectedOptionValue);
    expect(getByText(selectedOptionText)).toBeInTheDocument();

    userEvent.selectOptions(
      getByLabelText('Selected Category'),
      selectedOptionText
    );

    const selectedOption = getByText(selectedOptionText);
    const unSelectedOption = getByText(titleCaseString(categories[1]));
    expect(selectedOption.selected).toBeTruthy();
    expect(unSelectedOption.selected).toBeFalsy();
    expect(mockDispatcher).toHaveBeenCalledWith({
      type: AppStatusTypes.LOAD_BY_CATEGORY,
      payload: selectedOptionValue,
    });
  });
});
