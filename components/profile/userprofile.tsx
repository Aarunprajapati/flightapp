import * as React from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Plane, PlaneIcon } from "lucide-react";
import axiosinstance from "@/axiosinstance";
import toast from "react-hot-toast";
import Link from "next/link";

// import UserDeatils from "./userDeatils";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 350 },
  bgcolor: "background.paper",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const settings = ["Profile"];

function UserProfile({ user, session }: any) {
  const [userData, setUserData] = React.useState({
    name: "",
    email: "",
    phoneNumber: "",
    dob: "",
    gender: "",
    profilePic: null
  });;
  const [open, setOpen] = React.useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const router = useRouter();
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogOut = async () => {
    try {
      await signOut({ redirect: false });
      await axiosinstance.post("/logout");
      toast.success("Logged out successfully");
      router.push("/auth/login");
    } catch (error) {
      toast.error("Error in logout");
    }
  };

  const Fetchdata = async () => {
    try {
      const response = await axiosinstance.get("/profile");
      setUserData(response.data.user);
    } catch (error) {
      console.error("Error in fetch");
    }
  };

  // React.useEffect(() => {
  //   Fetchdata();
  // }, []);

  
  if (!user && !session) {
    return (
      <div className="flex gap-x-2 ml-auto">
        <Link href="/auth/register">
          <div className="flex items-center p-1 lg:p-4 md:p-3 shadow-xl rounded-md border border-gray-300 hover:shadow-lg transition cursor-pointer bg-white">
            <Plane className="w-6 h-6 text-blue-600" />
            <span className="ml-2 text-sm text-blue-700">Signup</span>
          </div>
        </Link>
        <Link href="/auth/login">
          <div className="flex items-center p-1 lg:p-4 md:p-3 shadow-xl rounded-md border border-gray-300 hover:shadow-lg transition cursor-pointer bg-white">
            <PlaneIcon className="w-6 h-6 text-blue-600" />
            <span className="ml-2 text-sm text-blue-700">Login</span>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Tooltip title="Open settings">
          <Button onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              alt={userData?.name || "User"}
              src={`/${userData?.profilePic}` || "/logo.png"}
              sx={{ bgcolor: "white", p: "2px", width: 50, height: 50, color:"black" }}
            />
          </Button>
        </Tooltip>
        <Menu
          sx={{ mt: "55px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Button onClick={handleOpenModal}>
                <Typography textAlign="center" onClick={Fetchdata}>{setting}</Typography>
              </Button>
            </MenuItem>
          ))}
          <MenuItem onClick={handleCloseUserMenu}>
            <Button>
              <Typography textAlign="center">History</Typography>
            </Button>
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>
            <Button onClick={handleLogOut}>
              <Typography textAlign="center">Log Out</Typography>
            </Button>
          </MenuItem>
        </Menu>
        {/* user details */}
        <Modal
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
           
                <Avatar
                  alt={userData.name.toUpperCase()}
                  src={`/${userData.profilePic}`}
                  sx={{ width: 56, height: 56, mb: 2, color:"black" }}
                />
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {userData.name}
                </Typography>
                <Grid container spacing={1} sx={{ width: "100%" }}>
                  <Grid item xs={4} sx={{ textAlign: "right", pr: 1 }}>
                    <Typography variant="subtitle1">Email:</Typography>
                  </Grid>
                  <Grid item xs={8} sx={{ textAlign: "left" }}>
                    <Typography variant="subtitle2">
                      {userData.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sx={{ textAlign: "right", pr: 1 }}>
                    <Typography variant="subtitle1">DOB:</Typography>
                  </Grid>
                  <Grid item xs={8} sx={{ textAlign: "left" }}>
                    <Typography variant="subtitle2">{userData.dob}</Typography>
                  </Grid>
                  <Grid item xs={4} sx={{ textAlign: "right", pr: 1 }}>
                    <Typography variant="subtitle1">Phone:</Typography>
                  </Grid>
                  <Grid item xs={8} sx={{ textAlign: "left" }}>
                    <Typography variant="subtitle2">{userData.phoneNumber}</Typography>
                  </Grid>
                  <Grid item xs={4} sx={{ textAlign: "right", pr: 1 }}>
                    <Typography variant="subtitle1">Gender:</Typography>
                  </Grid>
                  <Grid item xs={8} sx={{ textAlign: "left" }}>
                    <Typography variant="subtitle2">{userData.gender}</Typography>
                  </Grid>
                </Grid>

          </Box>
        </Modal>
      </Toolbar>
    </Container>
  );
}

export default UserProfile;
