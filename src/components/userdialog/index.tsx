import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Grid,
  Typography,
} from "@mui/material";


interface UserInfoDialogProps {
  open: boolean;
  onClose: () => void;
}

interface ConfirmationDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
  }
  
  const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    open,
    onClose,
    onConfirm,
    title,
    message,
  }) => (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ py: 1 }}>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body2">{message}</Typography>
      </DialogContent>
      <DialogActions sx={{ px: 2, py: 1 }}>
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
            onClick={onClose}
        >
        Hủy
        </Button>
        <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{
                mt: 3,
                py: 1.5,
                borderRadius: '25px',
                backgroundColor: 'red',
                color: 'white',
                '&:hover': {
                backgroundColor: '#333333'
                }
                }}
            onClick={onConfirm}
        >
        Close
        </Button>
      </DialogActions>
    </Dialog>
  );

  const UserInfoDialog: React.FC<UserInfoDialogProps> = ({ open, onClose }) => {
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
    const [userInfo, setUserInfo] = useState({
      fullName: "",
      email: "",
      account: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      role: "Người dùng",
    });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handleSaveConfirmation = () => {
    console.log("User Info Saved:", userInfo);
    setShowConfirmationDialog(false);
    onClose();
  };
  const handleSave = () => {
    console.log("User Info Saved:", userInfo);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{ style: { maxWidth: 400 } }}
    >
      <DialogTitle sx={{ py: 2, mt: 'auto', color: 'black', fontWeight: 'bold' }}>Thông tin người dùng</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          {[
            { label: "Họ và tên", name: "fullName" },
            { label: "Email", name: "email" },
            { label: "Tài khoản", name: "account" },
            { label: "Mật khẩu hiện tại", name: "currentPassword", type: "password" },
            { label: "Mật khẩu mới", name: "newPassword", type: "password" },
            { label: "Xác nhận mật khẩu", name: "confirmPassword", type: "password" },
          ].map((field) => (
            <Grid item xs={12} key={field.name}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="body2">{field.label}</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    size="small"
                    type={field.type || "text"}
                    name={field.name}
                    value={userInfo[field.name as keyof typeof userInfo]}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
          ))}

          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={4}>
                <Typography variant="body2">Vai trò</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  name="role"
                  value={userInfo.role}
                  onChange={handleChange}
                  variant="outlined"
                >
                  <MenuItem value="Người dùng">Người dùng</MenuItem>
                  <MenuItem value="Quản trị viên">Quản trị viên</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
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
                onClick={() => setShowConfirmationDialog(true)} 
        >
        Save
        </Button>
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
            onClick={onClose}
        >
        Close
        </Button>
      </DialogActions>
      <ConfirmationDialog
          open={showConfirmationDialog}
          onClose={() => setShowConfirmationDialog(false)}
          onConfirm={handleSaveConfirmation}
          title="Xác nhận"
          message="Thông tin cá nhân sau khi lưu không thể hoàn tác, đồng thời bạn sẽ phải đăng nhập lại. Các chức năng như theo dõi ở các máy tính khác vẫn sẽ được duy trì cho đến khi đăng nhập lại"
      />
    </Dialog>
  );
};

export default UserInfoDialog;