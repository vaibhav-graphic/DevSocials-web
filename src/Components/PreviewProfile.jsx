const PreviewProfile = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about, skills } = user;

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure className="w-full flex justify-center items-center bg-base-200">
        <img
          src={photoUrl}
          alt="user photo"
          className="w-70 h-70 object-cover"
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
      </div>
    </div>
  );
};

export default PreviewProfile;
