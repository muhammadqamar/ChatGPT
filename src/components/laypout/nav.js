import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../service/firebase/firebase";
import DropdownButton from "react-bootstrap/DropdownButton";
import Router from "next/router";
import Link from "next/link";

const Navbar = () => {
  const [user, setUser] = useAuthState(auth);
  useEffect(() => {
    console.log("auth", user);
    console.log(setUser);
    if (!setUser && !user) {
      Router.push("/");
    }
  }, [setUser, user]);
  return (
    <div className="nav-dashboard">
      <div className="nav_container">
        <div className="logo-section">
          <div
            onClick={() => {
              Router.push("/");
            }}
          >
            <h2>Chat GPT</h2>
          </div>
          {/* {user && <p>Welcome {user.displayName}</p>} */}
        </div>
        {user && (
          <>
            <div className="nav_right_bx">
              {/* <Link className="dashboard_link" href="/dashboard">
                <img className="dashboard_home_logo" src="/dashboard.svg" alt="logo" />
                <span> Dashboard</span>
              </Link> */}

              <DropdownButton className="profile_bx" title="Profile">
                <div className="user-detail-sec">
                  <div className="user-name">
                    <p>{user.displayName ? user.displayName : user.email}</p>
                  </div>
                </div>
                <div className="hr_line"></div>
                {/* <div className="change_pswrd_bx ">
                  <img className="lock_logo" src="/lock.svg" alt="logo" />
                  <p className="change_pswrd_text">Change Password</p>
                </div> */}
                <div className="change_pswrd_bx">
                  <p className="change_pswrd_text" onClick={() => auth.signOut()}>
                    Logout
                  </p>
                </div>
              </DropdownButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
