import axios from "axios";
import { useDispatch } from "react-redux";
import BASE_URL from "../utils/constant";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const {_id, firstName, lastName, photoUrl, age, gender, about, skills } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/"+status+"/"+userId, {}, {withCredentials: true}
      );

      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure className="w-full flex justify-center items-center bg-base-200">
        <img
          src={photoUrl}
          alt="user photo"
          className="w-70 h-70 object-cover rounded-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="badge badge-outline text-sm px-2 py-1"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-error"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-success"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
