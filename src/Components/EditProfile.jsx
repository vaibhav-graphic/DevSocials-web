import { useState } from "react";

const EditProfile = ({user}) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);

  const [error, setError] = useState("");

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="card bg-primary text-primary-content w-96">
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
                  onChange={(e) => setPhotoUrl(e.target.value)}
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
              <fieldset className="fieldset py-4">
                <legend className="fieldset-legend">
                  About (max 100 words)
                </legend>
                <textarea
                  className="input"
                  rows="5"
                  value={about}
                  placeholder="Write about yourself..."
                  onChange={(e) => {
                    const words = e.target.value.trim().split(/\s+/);
                    if (words.length <= 100) {
                      setAbout(e.target.value);
                    }
                  }}
                />
                <div className="text-sm text-gray-500 mt-1">
                  {
                    about
                      .trim()
                      .split(/\s+/)
                      .filter((word) => word !== "").length
                  }
                  /100 words
                </div>
              </fieldset>
            </div>
            <p className="text-red-100">{error}</p>
            <div className="card-actions justify-center">
              <button className="btn">Save Profile</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
