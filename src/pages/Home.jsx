import { Link } from "react-router-dom";

export default function Home() {
  const companies = [
    "Rival Gaming",
    "Rammix INC",
    "Nested Routes Inc",
    "Bugagga Inc.",
    "Transparent Ideas",
    "Software Kings",
    "mindmap.ai",
    "Astellas Inc."
  ];

  const jobs = [
    {
      title: "Administrative Assistant",
      company: "Forever Young",
      location: "Kathmandu, Nepal",
      type: "Full Time",
      urgent: true
    },
    {
      title: "Administrative Controller",
      company: "Rival Gaming",
      location: "San Francisco",
      type: "Full Time",
      urgent: true
    },
    {
      title: "AI Lead",
      company: "Transparent Ideas",
      location: "Los Angeles",
      type: "Full Time",
      urgent: true
    },
    {
      title: "AI/ML Data Scientist",
      company: "Rammix INC",
      location: "Cupertino",
      type: "Full Time",
      urgent: true
    }
  ];

  return (
    <div className="home-wrapper">
      {/* NAVBAR */}
      <header className="home-navbar">
        <h2 className="home-logo">rekroot</h2>

        <nav className="home-nav">
          <span>Home</span>
          <span>Jobs</span>
          <span>Blog</span>
          <span>Pages</span>
          <span>Contact</span>
        </nav>

        <div className="nav-actions">
          <Link to="/" className="signin-link">
            Sign In
          </Link>
          <button className="post-btn">Post a Job</button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-left">
          <h1>
            Get your new <span>dream job</span> today
          </h1>
          <p className="hero-subtitle">25,478 Offers Worldwide</p>

          <div className="search-box">
            <input placeholder="Keywords" />
            <input placeholder="Location" />
            <button>Search</button>
          </div>

          <div className="tags">
            <span>Sales</span>
            <span>Customer Service</span>
            <span>Accounting</span>
            <span>Entry Level</span>
            <span>Administrative Assistant</span>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-image" />
        </div>
      </section>

      {/* COMPANIES SECTION */}
      <section className="companies">
        <h2>Top Hiring Companies</h2>
        <p className="section-subtitle">
          Get started with the best companies
        </p>

        <div className="company-grid">
          {companies.map((company, index) => (
            <div className="company-card" key={index}>
              <div className="company-logo" />
              <h4>{company}</h4>
              <small>2 positions</small>
            </div>
          ))}
        </div>
      </section>

      {/* JOB LISTINGS */}
      <section className="jobs">
        <h2>Latest Listings</h2>
        <p className="section-subtitle">
          Get started with the best jobs
        </p>

        <div className="job-grid">
          {jobs.map((job, index) => (
            <div className="job-card" key={index}>
              <div className="job-top">
                <h4>{job.company}</h4>
                {job.urgent && (
                  <span className="urgent">URGENT</span>
                )}
              </div>

              <h3>{job.title}</h3>
              <p>{job.location}</p>
              <p>{job.type}</p>

              <div className="job-actions">
                <button className="details-btn">
                  Job details
                </button>
                <button className="apply-btn">+</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
