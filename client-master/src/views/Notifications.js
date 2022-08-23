import { useHistory } from "react-router-dom"

export const Notifications = () => {
    const history = useHistory();
    return (
        <div className="center w-2/3 ">

            <h3 className="text-2xl font-bold shadow-2xl shadow-blue-500 bg-blue-200 p-3">Notifications</h3>
            <h4 className="p-2 m-3"> Notifications feature will be implemented in version 2!</h4>

            <button onClick={() => history.push("/profile")}
                className="edit-btn m-3"
            >Profile</button>
        </div>
    )
}