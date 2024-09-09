const JobSkills = ({skills}) => {
  // const skills = [
  //   "app",
  //   "administrative",
  //   "android",
  //   "wordpress",
  //   "design",
  //   "react",
  // ];
  return (
    <ul className="job-skills">
      {skills?.map((skill, i) => (
        <li key={i} className="bg-white px-2">
          {skill}
        </li>
      ))}
    </ul>
  );
};

export default JobSkills;
