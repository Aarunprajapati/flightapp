"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Avatar,
  Button,
  Container,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Plane, PlaneIcon } from "lucide-react";
import axiosinstance from "@/axiosinstance";
import toast from "react-hot-toast";
import Link from "next/link";

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
// const settings = ["Profile"];

function UserProfile({ user, session }: any) {
  const [userData, setUserData] = React.useState({
    name: "",
    email: "",
    phoneNumber: "",
    dob: "",
    gender: "",
    profilePic: null,
  });
  const [googleUser, setGoogleUser] = React.useState({
    name: "",
    email: "",
    image: "",
  });
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
      await axiosinstance.get("/logout");
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
      // toast.error("Error in fetch");
      console.log(error);
    }
  };
  const googleFetchdata = async () => {
    try {
      const response = await axiosinstance.get("/googleUserData");

      setGoogleUser(response.data.user);
    } catch (error) {
      // toast.error("Error in fetch");
      console.log(error);
    }
  };

  React.useEffect(() => {
    Fetchdata();
    googleFetchdata();
  }, []);

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
              alt={userData?.name || googleUser?.name || "User"}
              src={userData?.profilePic || googleUser?.image}
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
          <MenuItem onClick={handleCloseUserMenu}>
            <Button href="/auth/profile" onClick={handleOpenModal}>
              <Typography textAlign="center">Profile</Typography>
            </Button>
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>
            <Button href="/auth/trips">
              <Typography textAlign="center">History</Typography>
            </Button>
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>
            <Button onClick={handleLogOut}>
              <Typography textAlign="center">Log Out</Typography>
            </Button>
          </MenuItem>
        </Menu>
      </Toolbar>
    </Container>
  );
}

export default UserProfile;
