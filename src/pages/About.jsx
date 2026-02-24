import React from 'react';
import { Container, Typography, Box, Paper, Avatar } from '@mui/material';
import Grid from '@mui/material/Grid';

const About = () => {
  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box sx={{ my: 8, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          About Job Portal
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', mb: 4 }}>
          Connecting talent with opportunity. We are dedicated to making the job search process seamless, transparent, and effective for everyone.
        </Typography>
      </Box>

      {/* Mission Section */}
      <Paper elevation={0} variant="outlined" sx={{ p: { xs: 3, md: 6 }, mb: 8, borderRadius: 4, bgcolor: 'background.default' }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="overline" color="primary" fontWeight="bold">
              Our Mission
            </Typography>
            <Typography variant="h4" gutterBottom sx={{ mt: 1 }}>
              Empowering Careers
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', color: 'text.secondary' }}>
              We believe that finding the right job or the right candidate should be an enjoyable experience. Our platform leverages cutting-edge technology to match skills with opportunities, ensuring that talent finds its perfect home.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', color: 'text.secondary' }}>
              Whether you are a fresh graduate looking for your first break or an experienced professional seeking the next challenge, we are here to support your journey.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                width: '100%',
                height: 300,
                bgcolor: 'grey.200',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'text.disabled'
              }}
            >
              {/* Placeholder for an image */}
              <Typography variant="h6">Mission Image</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Stats Section */}
      <Box sx={{ mb: 8 }}>
        <Grid container spacing={3} justifyContent="center">
          {[
            { label: 'Jobs Posted', value: '10k+' },
            { label: 'Active Candidates', value: '50k+' },
            { label: 'Companies', value: '500+' },
          ].map((stat, index) => (
            <Grid key={index} size={{ xs: 12, sm: 4 }}>
              <Paper elevation={1} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold' }}>
                  {stat.value}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Team Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 6 }}>
          Meet Our Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            { name: 'Alex Johnson', role: 'CEO & Founder' },
            { name: 'Sarah Williams', role: 'CTO' },
            { name: 'Michael Chen', role: 'Head of Product' },
          ].map((member, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar
                  sx={{ width: 120, height: 120, mb: 2, bgcolor: 'secondary.main', fontSize: '2.5rem' }}
                >
                  {member.name[0]}
                </Avatar>
                <Typography variant="h6">{member.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {member.role}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default About;
