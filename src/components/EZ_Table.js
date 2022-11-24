import "./EZ_Table.css";

export default function EZ_Table(props) {
  const { data, Cols } = props;

  return (
    <>
      {Cols && Array.isArray(Cols) && (
        <table style={{ width: "100%" }} cellSpacing="0">
          <thead>
            <tr>
              <th>Serial No.</th>
              {Cols.map((y, i) => (
                <th key={i}>{y.displayName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data && Array.isArray(data) && data.length > 0
              ? data.map((x, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    {Cols.map((y, ind) => (
                      <td key={ind}>{x[y.key]}</td>
                    ))}
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      )}
    </>
  );
}
