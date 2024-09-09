const JobOverView = ({
  datePosted,
  expirationDate,
  location,
  jobTitle,
  hours,
  rate,
  salary,
}) => {
  return (
    <div className="widget-content">
      <ul className="job-overview">
        <li>
          <i className="icon icon-calendar"></i>
          <h5>Posted:</h5>
          <span>{datePosted}</span>
        </li>      
        <li>
          <i className="icon icon-location"></i>
          <h5>Companies Location:</h5>
          <span>{location}</span>
        </li>
        <li>
          <i className="icon icon-user-2"></i>
          <h5>Job Title:</h5>
          <span>{jobTitle}</span>
        </li>   
        <li>
          <i className="icon icon-rate"></i>
          <h5>Salary:</h5>
          <span>{rate}</span>
        </li>
      </ul>
    </div>
  );
};

export default JobOverView;
