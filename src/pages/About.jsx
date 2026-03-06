import React, { useMemo, useState } from "react";
import axios from "axios";
import { Container, Typography, Box, Paper, Avatar } from "@mui/material";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import { hyperspeedPresets } from "../components/hyperspeedPresets";
import FooterAfterLogin from "../components/FooterAfterLogin";
import Hyperspeed from "../components/Hyperspeed";
import cat1 from "../utils/cat1.png";
import cat2 from "../utils/cat2.png";
import cat3 from "../utils/cat3.png";
import cat4 from "../utils/cat4.png";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};


const About = () => {

  const [feedback, setFeedback] = useState({
    email: "",
    message: "",
  });

  const submitFeedback = async () => {
    try {
      const res = await axios.post(
        "http://localhost:9000/feedback/add",
        feedback
      );

      if (res.data.success) {
        alert("Feedback submitted successfully!");
        setFeedback({ email: "", message: "" });
      }
    } catch (err) {
      console.error("Feedback Error:", err);
    }
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          background: "transparent",
          minHeight: "100vh",
          py: 6,
        }}
      >
        {/* Floating background blobs */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
          style={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "",
            filter: "blur(60px)",
            zIndex: 0,
          }}
        />

        <motion.div
          animate={{ y: [0, 30, 0] }}
          transition={{ repeat: Infinity, duration: 8 }}
          style={{
            position: "absolute",
            bottom: -120,
            right: -100,
            width: 350,
            height: 350,
            borderRadius: "50%",
            background:
              "",
            filter: "blur(60px)",
            zIndex: 0,
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          {/* HERO SECTION */}
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp}>
            <Box
              sx={{
                position: "relative",
                overflow: "hidden",
                textAlign: "center",
                borderRadius: 5,
                border: "1px solid #e5e5e5",
                mb: 10,
                height: "500px",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 0,
                }}
              >
                <Hyperspeed
                  effectOptions={useMemo(() => hyperspeedPresets.three, [])}
                />
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.75) 100%)",
                  zIndex: 1,
                }}
              />

              <Box
                sx={{
                  position: "relative",
                  zIndex: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  px: 3,
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    mb: 3,
                    color: "white",
                    letterSpacing: "-1px",
                  }}
                >
                  About Job Portal
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    maxWidth: 750,
                    opacity: 0.85,
                    color: "rgba(255,255,255,0.9)",
                    lineHeight: 1.6,
                  }}
                >
                  Connecting talent with opportunity. Making job search seamless,
                  transparent, and effective for everyone.
                </Typography>
              </Box>
            </Box>
          </motion.div>

          {/* Empowering Careers */}
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, md: 5 },
                mb: 5,
                borderRadius: 5,
                background: "white",
                boxShadow: "0px 10px 40px rgba(0,0,0,0.05)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Typography variant="h4" sx={{ mt: 2, mb: 3, fontWeight: 700 }}>
                Empowering Careers
              </Typography>

              <Typography
                variant="body1"
                sx={{ fontSize: "1.1rem", color: "text.secondary", mb: 2 }}
              >
                We believe that discovering the right job or the perfect candidate should be more than just a process—it should be an empowering and rewarding experience.
                Our platform is designed to simplify the journey for both job seekers and employers by leveraging modern technology to connect talent with meaningful opportunities
              </Typography>

              <Typography
                variant="body1"
                sx={{ fontSize: "1.1rem", color: "text.secondary" }}
              >
                Through intelligent matching and a user-friendly experience, we help professionals showcase their skills while enabling organizations to identify candidates who align with their goals and culture.
                Our mission is to make job searching and hiring more efficient, transparent, and accessible for everyone.
                <br /><br />
                At the heart of our platform is a vision to empower people, support innovation, and transform the way careers are discovered and developed in today’s evolving workforce.
              </Typography>
            </Paper>
          </motion.div>

          {/* Who We Are */}
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, md: 5 },
                mb: 5,
                borderRadius: 5,
                background: "white",
                boxShadow: "0px 10px 40px rgba(0,0,0,0.05)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Typography variant="h4" sx={{ mt: 2, mb: 3, fontWeight: 700 }}>
                Who We Are
              </Typography>

              <Typography
                variant="body1"
                sx={{ fontSize: "1.1rem", color: "text.secondary" }}
              >
                JobPortal is a modern recruitment platform designed to simplify and enhance the hiring experience for both job seekers and employers.
                Our goal is to create a seamless environment where talented individuals can discover meaningful career opportunities and organizations can efficiently connect with the right candidates.
              </Typography>

              <Typography
                variant="body1"
                sx={{ fontSize: "1.1rem", color: "text.secondary", mt: 2 }}
              >
                We understand that the hiring process can often be complex and time-consuming. That’s why our platform is built with intuitive tools, smart search capabilities, and a user-friendly interface that makes job discovery and recruitment easier, faster, and more effective.
                Whether you are a professional looking to advance your career or a company seeking skilled talent, JobPortal provides the resources needed to make the process smooth and productive.
              </Typography>

              <Typography
                variant="body1"
                sx={{ fontSize: "1.1rem", color: "text.secondary", mt: 2 }}
              >
                At JobPortal, we are driven by the belief that the right opportunity can transform lives and businesses alike.
                By combining technology with a deep understanding of the recruitment landscape, we strive to build a platform that supports career growth, encourages innovation, and helps create meaningful professional connections.
              </Typography>
            </Paper>
          </motion.div>

          {/* Why Choose Us */}
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, md: 5 },
                mb: 5,
                borderRadius: 5,
                background: "white",
                boxShadow: "0px 10px 40px rgba(0,0,0,0.05)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Typography variant="h4" sx={{ mt: 2, mb: 3, fontWeight: 700 }}>
                Why Choose Us
              </Typography>

              <Typography
                variant="body1"
                sx={{ fontSize: "1.1rem", color: "text.secondary" }}
              >
                Our platform is designed to make the hiring journey smarter, faster, and more effective for both employers and job seekers.
                By combining intuitive design with modern technology, we help streamline the recruitment process and reduce the time and effort required to find the right opportunities or candidates.
              </Typography>

              <Typography
                variant="body1"
                sx={{ fontSize: "1.1rem", color: "text.secondary", mt: 2 }}
              >
                We focus on improving hiring accuracy by connecting employers with candidates whose skills, experience, and career goals align with their organizational needs.
                With powerful search features, organized job listings, and a seamless application process, users can easily navigate the platform and focus on what truly matters—building meaningful professional connections.
              </Typography>


            </Paper>
          </motion.div>



          {/* GLOBAL PLATFORM STATS */}
          <Box
            sx={{
              py: 8,
              mb: 10,
              borderTop: "1px solid #e5e7eb",
              borderBottom: "1px solid #e5e7eb",
              textAlign: "center",
            }}
          >

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >

              <Grid container spacing={4} justifyContent="center">

                {[
                  { value: "250M", label: "unique monthly visitors" },
                  { value: "175M", label: "resumes" },
                  { value: "320M", label: "total ratings & reviews" },
                  { value: "10", label: "jobs added per second" },
                  { value: "750M", label: "salaries" },
                ].map((item, index) => (

                  <Grid item xs={6} md={2.4} key={index}>

                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >

                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 800,
                          color: "#2563eb",
                        }}
                      >
                        {item.value}
                      </Typography>

                      <Typography sx={{ color: "text.secondary", mt: 1 }}>
                        {item.label}
                      </Typography>

                    </motion.div>

                  </Grid>

                ))}

              </Grid>

            </motion.div>

          </Box>

          {/* TEAM */}
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: 8, fontWeight: 700 }}
          >
            Meet Our Team
          </Typography>



          <Grid container spacing={6} justifyContent="center">
            {[
              { name: "Pavan Kumar", role: "Head of Product", image: cat1 },
              { name: "Adithya S", role: "CTO", image: cat2 },
              { name: "Vijeth Rai", role: "CEO & Founder", image: cat3 },
              { name: "Mithun KV", role: "Head of Operations", image: cat4 },
            ].map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 5,
                      borderRadius: 4,
                      textAlign: "center",
                      background: "white",
                      boxShadow: "0px 10px 30px rgba(0,0,0,0.05)",
                    }}
                  >
                    <Avatar
                      src={member.image}
                      alt={`${member.name}`}
                      sx={{
                        width: 110,
                        height: 110,
                        mx: "auto",
                        mb: 3,
                      }}
                    />

                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {member.name}
                    </Typography>

                    <Typography sx={{ color: "text.secondary", mt: 1 }}>
                      {member.role}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* FEEDBACK SECTION */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
          >

            <Paper
              elevation={0}
              sx={{
                mt: 10,
                p: { xs: 4, md: 6 },
                borderRadius: 5,
                background: "white",
                boxShadow: "0px 10px 40px rgba(0,0,0,0.05)",
                textAlign: "center"
              }}
            >

              <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
                Share Your Feedback
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  mb: 4,
                  maxWidth: 600,
                  mx: "auto"
                }}
              >
                We value your feedback. Let us know how we can improve
                your experience with JobPortal.
              </Typography>

              <Box
                sx={{
                  maxWidth: 500,
                  mx: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1
                }}
              >

                <input
                  type="email"
                  placeholder="Your Email"
                  value={feedback.email}
                  onChange={(e) =>
                    setFeedback({ ...feedback, email: e.target.value })
                  }
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    outline: "none"
                  }}
                />

                <textarea
                  placeholder="Your Feedback"
                  rows={4}
                  value={feedback.message}
                  onChange={(e) =>
                    setFeedback({ ...feedback, message: e.target.value })
                  }
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    outline: "none"
                  }}
                />

                <button
                  onClick={submitFeedback}
                  style={{
                    background: "#2563eb",
                    color: "white",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "600"
                  }}
                >
                  Submit Feedback
                </button>

              </Box>

            </Paper>

          </motion.div>
        </Container>
      </Box>


      <FooterAfterLogin />
    </>
  );
};

export default About;