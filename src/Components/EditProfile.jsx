import { useState } from "react";
import PreviewProfile from "./PreviewProfile";
import axios from "axios";
import BASE_URL from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "male");
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(user.skills || "");
  const [skillInput, setSkillInput] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about, skills },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center gap-8 p-2">
        <div className="flex justify-center mx-10">
          <div className="card bg-primary text-primary-content w-[380px] shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Edit Profile</h2>
              <div>
                <fieldset className="fieldset py-1">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset py-1">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset py-1">
                  <legend className="fieldset-legend">PhotoUrl</legend>
                  <input
                    type="text"
                    className="input"
                    value={photoUrl}
                    placeholder="Photo URL"
                    onChange={(e) => {
                      return setPhotoUrl(e.target.value);
                    }}
                  />
                </fieldset>
                <fieldset className="fieldset py-1">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="text"
                    className="input"
                    value={age}
                    placeholder="Age"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset py-1">
                  <legend className="fieldset-legend">Gender</legend>
                  <select
                    className="input"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </fieldset>
                <fieldset className="fieldset">
                  <div className="label">
                    <legend className="fieldset-legend">About</legend>
                  </div>
                  <textarea
                    type="text"
                    value={about}
                    className="input input-bordered w-full max-w-xs"
                    placeholder="About"
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>
                </fieldset>
                <fieldset className="fieldset">
                  <div className="label">
                    <legend className="fieldset-legend">Skills</legend>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-xs"
                      value={skillInput}
                      placeholder="Enter a skill"
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (
                            skillInput.trim() &&
                            !skills.includes(skillInput.trim())
                          ) {
                            setSkills([...skills, skillInput.trim()]);
                            setSkillInput("");
                          }
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="btn"
                      onClick={() => {
                        if (
                          skillInput.trim() &&
                          !skills.includes(skillInput.trim())
                        ) {
                          setSkills([...skills, skillInput.trim()]);
                          setSkillInput("");
                        }
                      }}
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap mt-2 gap-2">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="badge badge-secondary cursor-pointer"
                        onClick={() =>
                          setSkills(skills.filter((_, i) => i !== index))
                        }
                        title="Click to remove"
                      >
                        {skill} ✕
                      </span>
                    ))}
                  </div>
                </fieldset>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center">
                <button className="btn" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[380px]">
          <PreviewProfile
            user={{ firstName, lastName, photoUrl, age, gender, about, skills }}
          />
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
