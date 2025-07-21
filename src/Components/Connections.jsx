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
    <div className="flex flex-col gap-8 items-center my-10">
      {connections.map((connection) => {
        const { firstName, lastName, age, gender, photoUrl, about, _id } =
          connection;

        return (
          <div
            key={_id}
            className="card card-side bg-base-300 shadow-md w-full max-w-xl"
          >
            <figure className="w-40 h-40 overflow-hidden">
              <img
                className="object-cover w-full h-full"
                src={photoUrl}
                alt={firstName + " " + lastName}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{firstName + " " + lastName}</h2>
              {age && gender && <span>{age + " • " + gender}</span>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
