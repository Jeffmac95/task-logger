import { useState } from "react"
import "./timeblocksfetcher.css"

function TimeblockFetcher() {

    const [data, setData] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [getActivity, setGetActivity] = useState("");
    const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);
    const [editId, setEditId] = useState(null);
    const [getUpdatedActivity, setGetUpdatedActivity] = useState("");

    async function getAllData() {
        try {
            const response = await fetch("http://localhost:3000/timeblocks", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            const result = await response.json();
            setData(result);
            setErrorMsg("");
        } catch (err) {
            console.error("Error getting all data: ", err);
            setErrorMsg("Error getting all data. try again.");
        }
    }

    //if theres no data retrieved from search, display msg
    async function getDataByActivity() {
        if (!getActivity.trim()) {
            setErrorMsg("Enter a valid activity.");
            return;
        }
        try {
            const response = await fetch(`http://localhost:3000/timeblocks?search=${encodeURIComponent(getActivity.toLowerCase())}`, {
                method: "GET",
                headers: { "Content-Type": "application/json"}
            });

            const result = await response.json();
            setData(result);
            setErrorMsg("");
        } catch(err) {
            console.error("Error getting data by query", err);
            setErrorMsg("Error getting data by query. Try again.");
        }
    }

    async function deleteById(id) {
        try {
            const response = await fetch(`http://localhost:3000/timeblocks/${id}`, {
                method: "DELETE"
            });
            console.log(response);

            setData(prevData => prevData.filter(item => item.id !== id));
            setErrorMsg("");
        } catch (err) {
            console.error("Error deleting data: ", err);
            setErrorMsg("Error deleting data. Try again.");
        }
    }

    async function updateById(id) {
        try {
            const response = await fetch(`http://localhost:3000/timeblocks/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    activity: getUpdatedActivity.toLowerCase()
                })
            });

            const result = await response.json();
            console.log(result);
            setData(prevData => prevData.map(item => item.id === id ? {...item, activity: getUpdatedActivity.toLowerCase()} : item));
            setErrorMsg("");
            setEditId(null);
            setGetUpdatedActivity("");
        } catch (err) {
            console.error("Error updating data: ", err);
            setErrorMsg("Error updating data. Try again.");
        }
    }

    return(
        <>
        <div id="data-container">
            <h2 className="timeblockfetcher-title">Get Timeblocks</h2>
            <span>Search by Activity: </span>
            <input 
            type="text"
            id="get-activity-input"
            placeholder="Search activity"
            value={getActivity}
            onChange={(e) => {
                setGetActivity(e.target.value);
                setErrorMsg("");
            }}
            />
            <button className="timeblock-buttons get-all-button" onClick={getAllData}>Get All</button>
            <button className="timeblock-buttons get-activity-button" onClick={getDataByActivity}>Get activity</button>

            <div id="data-table">
                <table>
                    <caption id="table-caption">Your Timeblocks</caption>
                    <thead>
                        <tr>
                        <th scope="col">Activity</th>
                        <th scope="col">Time spent</th>
                        <th scope="col">Date</th>
                        <th scope="col">Delete Timeblocks</th>
                        <th scope="col">Edit Timeblocks</th>
                    </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.activity}</td>
                                    <td>{item.time_spent}</td>
                                    <td>{item.created_at}</td>
                                    <td className="delete-by-id" onClick={() => setDeleteConfirmationId(item.id)}>Delete &#128465;</td>
                                    <td className="edit-by-id" onClick={() => setEditId(item.id)}>Edit Activity &#10550;</td>
                                    {deleteConfirmationId === item.id && (
                                        <td className="delete-confirmation-options">
                                            <span>Confirm delete?</span>
                                            <button className="get-buttons confirm-delete-button" onClick={() => deleteById(item.id)}>Yes</button>
                                            <button className="get-buttons deny-delete-button" onClick={() => setDeleteConfirmationId(null)}>No</button>
                                         </td>)
                                    }
                                    {editId === item.id && (
                                        <td className="edit-options">
                                            <input
                                            type="text"
                                            placeholder="Enter edited activity"
                                            value={getUpdatedActivity}
                                            onChange={(e) => setGetUpdatedActivity(e.target.value)}
                                            />
                                            <button className="buttons update-activity-button" onClick={() => updateById(item.id)}>Update</button>
                                            <button className="buttons cancel-edit-button" onClick={() => {
                                                setEditId(null);
                                                setGetUpdatedActivity("");
                                            }}>Cancel</button>
                                        </td>
                                    )

                                    }
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">Use the buttons to start displaying data!</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
                {errorMsg && <div className="error-msg"> {errorMsg} </div>}
            </div>
        </div>
        </>
    )
}

export default TimeblockFetcher;