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

  const [error, setError] = useState("");

  const dispatch = useDispatch();

  console.log(about);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about, skills },
        { withCredentials: true }
      );
      console.log(res?.data?.data);
      dispatch(addUser(res?.data?.data));
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <>
      <div className="flex justify-center items-start gap-8 p-8 max-w-7xl mx-auto">
        <div className="flex justify-center mx-10">
          <div className="card bg-primary text-primary-content w-[380px] shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Edit Profile</h2>
              <div>
                <fieldset className="fieldset py-4">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset py-4">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset py-4">
                  <legend className="fieldset-legend">PhotoUrl</legend>
                  <input
                    type="text"
                    className="input"
                    value={photoUrl}
                    placeholder="Photo URL"
                    onChange={(e) => {
                      console.log(e.target.value);
                      return setPhotoUrl(e.target.value);
                    }}
                  />
                </fieldset>
                <fieldset className="fieldset py-4">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="text"
                    className="input"
                    value={age}
                    placeholder="Age"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset py-4">
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
                <fieldset className="form-control w-full max-w-xs my-4">
                  <div className="label">
                    <span className="label-text">About</span>
                  </div>
                  <textarea
                    type="text"
                    value={about}
                    className="input input-bordered w-full max-w-xs"
                    placeholder="About"
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>
                </fieldset>
                <fieldset className="form-control w-full max-w-xs my-4">
                  <div className="label">
                    <span className="label-text">Skills</span>
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

                  {/* Show added skills */}
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
    </>
  );
};

export default EditProfile;
