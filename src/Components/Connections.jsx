import axios from "axios";
import BASE_URL from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const featchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    featchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-bold text-2xl">No Connections</h1>
      </div>
    );
  }
  return (
    <div className="flex justify-center my-10">
      <div className="text-bold text-2xl">
        {connections.map((connection, index) => {
          const { firstName, lastName, age, gender, photoUrl, about } =
            connection;

          return (
            <div key={index} className="card card-side bg-base-100 shadow-sm">
              <figure className="w-40 h-40 overflow-hidden">
                <img
                  className="object-cover w-full h-full"
                  src={photoUrl}
                  alt="connection name"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <span>{age + " " + gender}</span>}
                <p>{about}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
