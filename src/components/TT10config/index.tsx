import React from "react";
import { TextField, Button, Typography, Box, Grid, Paper } from "@mui/material";

const TT10Config: React.FC = () => {
  return (
    <Box className="p-4">
      <Paper elevation={3} className="p-6 rounded-lg">
        <Grid container justifyContent="space-between" alignItems="center" className="mb-4">
          <Typography variant="h5" className="font-semibold">
            1. FTP 1
          </Typography>
          <Typography variant="subtitle1">
            TXT TT-10 BTMNT
          </Typography>
        </Grid>

        <Grid container spacing={2} direction="column">
          <Grid item>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" className="text-muted-foreground">
                  Folder
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  placeholder="/(Year)(Month)(Day)"
                  variant="outlined"
                  size="small"
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" className="text-muted-foreground">
                  File Name
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  placeholder="PT_PHA_NUONT1"
                  variant="outlined"
                  size="small"
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" className="text-muted-foreground">
                  Sensor List
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  placeholder="FLOW_GK1,LEVEL_GK1"
                  variant="outlined"
                  size="small"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Typography variant="body2" className="mt-4 text-muted-foreground">
          Xem dữ liệu định dạng TENFILE.TXT sẽ được gửi lên FTP Servers
        </Typography>
        <Typography variant="body2" className="mt-2 text-muted-foreground">
          Tải xuống tệp các file TXT theo đúng định dạng đang được cài đặt
        </Typography>

        <Box className="mt-4 flex space-x-2">
          <Button variant="contained" color="secondary">
            📄
          </Button>
          <Button variant="contained" color="success">
            ✔️
          </Button>
          <Button variant="contained" color="primary">
            ⬇️
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default TT10Config;
