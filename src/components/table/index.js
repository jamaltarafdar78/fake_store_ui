import classNames from 'classnames';

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
      {Array(...data).map(({ id, title }) => (
        <tr key={id}>
          <td>{id}</td>
          <td>{title}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
