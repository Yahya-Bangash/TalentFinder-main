import Social from "../social/Social";

const CompanyInfo = ({
  primaryIndustry,
  companySize,
  estSince,
  email,
  location,
  linkedin,
  twitter,
  instagram,
  facebook,
}) => {
  return (
    <ul className="company-info">
      <li>
        Primary industry: <span>{primaryIndustry || "N/A"}</span>
      </li>
      <li>
        Company size: <span>{companySize || "N/A"}</span>
      </li>
      <li>
        Founded in: <span>{estSince || "N/A"}</span>
      </li>
      <li>
        Email: <span>{email || "N/A"}</span>
      </li>
      <li>
        Location: <span>{location || "N/A"}</span>
      </li>
      <li>
        Social media:
        <Social
          linkedin={linkedin}
          twitter={twitter}
          instagram={instagram}
          facebook={facebook}
        />
      </li>
    </ul>
  );
};

export default CompanyInfo;
