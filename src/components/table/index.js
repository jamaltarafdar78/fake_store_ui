export const Table = ({ tableHeadings, data }) => (
  <table style={{ color: 'black' }}>
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
