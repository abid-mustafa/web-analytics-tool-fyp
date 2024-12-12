import "../styles/DynamicTable.css";

export default function DynamicTable({ title, data }) {
    return (
        <div className="table-container">
            <h3>{title}</h3>
            <table>
                <thead>
                    <tr>
                        {Object.keys(data[0] || {}).map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {Object.values(row).map((value, idx) => (
                                <td key={idx}>{value || 'N/A'}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}