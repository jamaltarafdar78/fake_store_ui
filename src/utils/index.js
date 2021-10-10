export const titleCaseString = (word) =>
  `${word.charAt(0).toUpperCase()}${word.slice(1)}`;

export const ALL = 'All';

export const displayCategoryTextAndValue = (categories) => {
  return categories
    .map((category) => ({
      displayLabel: String(category).split(' ').map(titleCaseString).join(' '),
      value: category,
    }))
    .concat({ displayLabel: ALL, value: ALL });
};
