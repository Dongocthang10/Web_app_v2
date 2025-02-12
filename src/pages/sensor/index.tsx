import React from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Sensor: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate('/dashboard');
  }

  return (
      <Box display="flex" minHeight="100vh">
        {/* Left Side - Black Background */}
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bgcolor="black"
          color="white"
          position="relative"
        >
          {/* Main Logo */}
          <Box textAlign="center">
            <Typography variant="h2" fontWeight="bold" gutterBottom>
              MTG
            </Typography>
            <Typography variant="h3" gutterBottom>
              Technology
            </Typography>
            <Typography variant="h4" mt={4}>
              DHT-5
            </Typography>
          </Box>

          {/* Bottom Text with Bullet Points */}
          <Box position="absolute" bottom={40} left={40}>
            <Typography variant="body1" gutterBottom>
              • Cung cấp thiết bị và giải pháp với chất lượng tốt nhất
            </Typography>
            <Typography variant="body1" gutterBottom>
              • Phát triển năng lực, tích lũy kinh nghiệm tạo nền tảng xây dựng mối quan hệ hợp tác lâu dài
            </Typography>
            <Typography variant="body1" gutterBottom>
              • 24/7 Technical support
            </Typography>
          </Box>
        </Box>

        {/* Right Side - Login Form */}
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bgcolor="#f4f4f4"
          p={2}
        >
          <Box maxWidth={400} width="100%">
            <Typography variant="h4" align="center" gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" mb={4}>
              Please sign in to continue
            </Typography>

            <Box component="form" noValidate autoComplete="off">
              <TextField
                fullWidth
                label="User Name"
                variant="outlined"
                margin="normal"
              />

              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                margin="normal"
              />

              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: '25px',
                  backgroundColor: 'black',
                  color: 'white',
                  '&:hover': {
                  backgroundColor: '#333333'
                  }
                  }}
                onClick={handleLogin}
              >
                Login
              </Button>

              <Typography
                variant="body2"
                align="center"
                sx={{ mt: 3, color: 'black' }}
              >
                By clicking sign in, you agree to our{' '}
                <a href="#" style={{ 
                  textDecoration: 'none', 
                  color: 'black',
                  borderBottom: '2px solid black',
                  paddingBottom: '1px',
                  fontWeight: 'bold'
                }}>
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" style={{ 
                  textDecoration: 'none', 
                  color: 'black',
                  borderBottom: '2px solid black',
                  paddingBottom: '1px',
                  fontWeight: 'bold'
                }}>
                  Privacy Policy
                </a>
              </Typography>
            </Box>

            <Typography
              variant="h6"
              display="block"
              align="center"
              sx={{ mt: 'auto', color: 'black', fontWeight: 'bold' }}
            >
              MINH THANH GROUP COMPANY LIMITED
            </Typography>
          </Box>
        </Box>
      </Box>
  );
};

export default Sensor;