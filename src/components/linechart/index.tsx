import { useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box, Button, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export const SensorChart = () => {
  const [fromDate, setFromDate] = useState<Date | null>(new Date());
  const [toDate, setToDate] = useState<Date | null>(new Date());

  const uData = [65, 59, 80, 81, 56, 55];
  const xLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{
            p: 2,
            width: 700, 
            height: 520, 
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 1,
      }}>
        <Typography variant="h6" gutterBottom>
          Thông tin cảm biến
        </Typography>
        <Box sx={{ height: '400px', width: '100%' }}>
          <LineChart
            series={[
              { 
                data: uData, 
                area: false,
                curve: "linear",
                showMark: true
              }
            ]}
            xAxis={[{ scaleType: 'point', data: xLabels }]}
          />
        </Box>
      
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mt: 3,
          flexWrap: 'nowrap', 
          '& > *': { flexShrink: 0 }
        }}>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ minWidth: 40 }}>
              From
            </Typography>
            <DateTimePicker
              value={fromDate}
              onChange={(newValue) => setFromDate(newValue)}
              slotProps={{
                textField: { 
                  sx: { 
                    minWidth: 120, 
                    bgcolor: "#F2EDF9",
                    height: 32,
                    borderRadius: 1,
                    "& .MuiInputBase-root": {
                      fontSize: "0.75rem", 
                      padding: "-10px 8px", 
                      height: 32, 
                    },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "5px", 
                      paddingRight: "0px"
                    },
                    "& .MuiInputAdornment-root": {
                      marginLeft: "-40px", // Dịch icon lịch vào gần hơn
                    },
                    "& .MuiSvgIcon-root": {
                      fontSize: "1rem", 
                    }
                  }
                }
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: -20 }}>
            <Typography variant="body2" color="text.secondary" sx={{ minWidth: 40 }}>
              To
            </Typography>
            <DateTimePicker
              value={toDate}
              onChange={(newValue) => setToDate(newValue)}
              slotProps={{
                textField: { 
                  sx: { 
                    minWidth: 120, 
                    bgcolor: "#F2EDF9",
                    height: 32,
                    borderRadius: 1,
                    "& .MuiInputBase-root": {
                      fontSize: "0.75rem", 
                      padding: "-10px 8px", 
                      height: 32, 
                    },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "5px", 
                      paddingRight: "0px"
                    },
                    "& .MuiInputAdornment-root": {
                      marginLeft: "-40px", // Dịch icon lịch vào gần hơn
                    },
                    "& .MuiSvgIcon-root": {
                      fontSize: "1rem", 
                    }
                  }
                }
              }}
            />
          </Box>

          <Button 
            variant="contained" 
            color="secondary"
            sx={{ 
              height: 30, 
              backgroundColor: "red",
              px: 3,
              textTransform: 'none'
            }}
          >
            Download
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};