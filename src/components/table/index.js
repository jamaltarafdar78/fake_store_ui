import classNames from 'classnames';
import './table.css';

export const Table = ({ tableHeadings, data }) => (
  <table className={classNames('table', 'table-striped')}>
    <thead>
      <tr key="products-table">
        {Array(...tableHeadings).map((heading) => (
          <th scope="col" key={heading}>
            {heading}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {Array(...data).map(({ id, title, price, category }) => (
        <tr key={id}>
          <td>{id}</td>
          <td className="title-align">{title}</td>
          <td className="currency-align">{price}</td>
          <td>{category}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
