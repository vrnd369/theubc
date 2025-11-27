import React, { useEffect, useState } from "react";
import "./Careers.css";
import heroImage from "../assets/career.png";
import starImage from "../assets/star.png";

export default function Careers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    requirement: '',
    message: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState('');

  useEffect(() => {
    document.title = "Careers - UBC | United Brothers Company";
  }, []);

  const handleOpenModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      requirement: '',
      message: ''
    });
    setSelectedFile(null);
    setFileError('');
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (5MB = 5 * 1024 * 1024 bytes)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setFileError('File size must be less than 5MB');
        setSelectedFile(null);
        e.target.value = ''; // Clear the input
      } else {
        setSelectedFile(file);
        setFileError('');
      }
    } else {
      setSelectedFile(null);
      setFileError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', {
      ...formData,
      jobTitle: selectedJob?.title,
      file: selectedFile
    });
    // You can add your submission logic here
    // After successful submission, close the modal
    handleCloseModal();
  };

  const jobs = [
    {
      title: "Community Manager",
      date: "10th Mar 2025",
      blurb:
        "We're looking for a warm, people-first individual to lead member engagement, curate events, and cultivate a welcoming coworking culture.",
      description: "As a Community Manager, you'll be the heart of our coworking space, fostering connections and creating an inclusive environment. Your role involves organizing networking events, managing member relationships, and ensuring our community thrives. You'll work closely with members to understand their needs, facilitate introductions, and maintain the vibrant culture that makes our space unique. This position requires excellent communication skills, empathy, and a passion for bringing people together."
    },
    {
      title: "Space Operations Coordinator",
      date: "10th Mar 2025",
      blurb:
        "Support the day-to-day operations of our space—keeping things running smoothly, maintaining high standards, and ensuring an excellent member experience.",
      description: "The Space Operations Coordinator is responsible for maintaining the physical space and ensuring everything operates seamlessly. You'll manage facility maintenance, coordinate with vendors, oversee cleaning schedules, and handle any operational issues that arise. Your attention to detail and proactive approach will ensure our members always have a clean, functional, and welcoming workspace. This role requires strong organizational skills, problem-solving abilities, and a commitment to excellence in every aspect of space management."
    },
    {
      title: "Membership Experience Associate",
      date: "10th Mar 2025",
      blurb:
        "Be the first point of contact for our members—whether onboarding new joiners or handling queries, you'll help everyone feel right at home.",
      description: "As a Membership Experience Associate, you'll be the friendly face that greets members daily and helps them navigate their coworking journey. Your responsibilities include conducting tours for prospective members, managing the onboarding process, handling member inquiries, and ensuring everyone feels supported. You'll maintain member records, process memberships, and serve as a liaison between members and management. This role is perfect for someone who is personable, organized, and dedicated to creating exceptional experiences from first contact to ongoing support."
    },
    {
      title: "Events & Partnerships Executive",
      date: "10th Mar 2025",
      blurb:
        "Plan and deliver events that bring our community together, while building relationships with local partners to enrich our member offerings.",
      description: "The Events & Partnerships Executive plays a crucial role in building our community through strategic events and valuable partnerships. You'll plan and execute a diverse calendar of events including workshops, networking sessions, and social gatherings. Additionally, you'll identify and cultivate partnerships with local businesses, service providers, and organizations to enhance member benefits. This position requires creativity, strong relationship-building skills, and the ability to manage multiple projects simultaneously while ensuring each event delivers value to our community."
    }
  ];

  return (
    <main className="careers">
      <section
        className="careers-hero"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${heroImage})`
        }}
        aria-label="Careers hero"
      >
        <div className="site-container">
          <span className="pill pill-outline">★ Opportunity</span>
          <h1 className="hero-title">
            Life at
            <br />
            United Brothers
          </h1>
          <p className="hero-sub">
            At the United Brothers Company, we are more than just a team; we are a family of
            innovators, creators, and professionals.
          </p>
        </div>
      </section>

      <section className="why">
        <div className="site-container">
          <span className="pill pill-soft">★ Why</span>
          <h2 className="section-title">Why Join Us?</h2>

          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon">
                <img src={starImage} alt="Star icon" />
              </div>
              <h3 className="why-head">Nurture Your<br />Potential</h3>
              <p className="why-text">
                We invest in our people through continuous learning and development opportunities,
                empowering you to grow both professionally and personally.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon">
                <img src={starImage} alt="Star icon" />
              </div>
              <h3 className="why-head">A Culture<br />of Integrity</h3>
              <p className="why-text">
                Our core values of purity, quality, and trust are reflected in every aspect of our
                work, from our products to our people.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon">
                <img src={starImage} alt="Star icon" />
              </div>
              <h3 className="why-head">Make an<br />Impact</h3>
              <p className="why-text">
                Be a part of a company that is shaping the future of the FMCG industry and making a
                positive difference in households worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="openings" aria-label="Current openings">
        <div className="site-container">
          <span className="pill pill-outline inverted">★ Join Us</span>
          <h2 className="section-title inverted">Our Openings</h2>

          <ul className="job-list">
            {jobs.map((job) => (
              <li key={job.title} className="job-row">
                <div className="job-left">
                  <h3 className="job-title">{job.title}</h3>
                  <p className="job-date">
                    <span>Posted Date</span> / {job.date}
                  </p>
                </div>

                <div className="job-right">
                  <p className="job-blurb">{job.blurb}</p>
                  <button 
                    className="btn-apply" 
                    type="button" 
                    aria-label={`Apply for ${job.title}`}
                    onClick={() => handleOpenModal(job)}
                  >
                    Apply Now
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Application Modal */}
      {isModalOpen && (
        <div className="apply-modal-overlay" onClick={handleCloseModal}>
          <div className="apply-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="apply-modal-close" onClick={handleCloseModal} aria-label="Close modal">
              ×
            </button>
            <div className="apply-modal-header">
              <h2 className="apply-modal-title">Apply for {selectedJob?.title}</h2>
              {selectedJob?.description && (
                <p className="apply-modal-description">{selectedJob.description}</p>
              )}
            </div>
            <form className="apply-modal-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="input-wrapper">
                  <label htmlFor="firstName" className="input-label">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-wrapper">
                  <label htmlFor="lastName" className="input-label">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Smith"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-wrapper">
                  <label htmlFor="email" className="input-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="John@gmail.com"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-wrapper">
                  <label htmlFor="requirement" className="input-label">Requirement</label>
                  <select
                    id="requirement"
                    name="requirement"
                    value={formData.requirement}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select requirement</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <div className="input-wrapper">
                  <label htmlFor="message" className="input-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    required
                  ></textarea>
                </div>
              </div>
              <div className="form-group">
                <div className="input-wrapper">
                  <label htmlFor="fileUpload" className="input-label">Upload File (Max 5MB)</label>
                  <input
                    type="file"
                    id="fileUpload"
                    name="fileUpload"
                    onChange={handleFileChange}
                    accept="*/*"
                    className="file-input"
                  />
                  {fileError && <p className="file-error">{fileError}</p>}
                  {selectedFile && !fileError && (
                    <p className="file-success">Selected: {selectedFile.name}</p>
                  )}
                </div>
              </div>
              <button type="submit" className="apply-modal-submit-btn">Submit</button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
