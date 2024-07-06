export default function Page() {
    return (
        <section>
            <form id="searchForm">
                <label htmlFor="origin">Origin:</label>
                <input type="text" id="origin" name="origin"/>

                <label htmlFor="destination">Destination:</label>
                <input type="text" id="destination" name="destination"/>

                <label htmlFor="transportation">Transportation:</label>
                <input type="text" id="transportation" name="transportation"/>

                <button type="submit">Search</button>
            </form>
            <table>
                <thead>
                <tr>
                    <th>Origin City</th>
                    <th>Destination City</th>
                    <th>Transportation</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Schedule</th>
                </tr>
                </thead>
                <tbody id="results">
                <tr>
                    <td>New York</td>
                    <td>Los Angeles</td>
                    <td>American Airlines</td>
                    <td>Plane</td>
                    <td>$500</td>
                    <td>MTWTFSS</td>
                </tr>
                </tbody>
            </table>
        </section>
    );
}
