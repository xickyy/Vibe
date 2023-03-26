import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import * as sessionActions from '../../store/session';
import { useModal } from "../../context/Modal";
import { clearFriendsThunk } from "../../store/friends";
import EditUserModal from '../EditUserModal'
import { clearPostsThunk } from "../../store/posts";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const { closeModal } = useModal();
  const ulRef = useRef();
  const sessionUser = useSelector(state => state.session.user);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const demoSubmit = (e) => {
    e.preventDefault();
    closeModal()
    return dispatch(sessionActions.demoLogin());
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    dispatch(clearFriendsThunk())
    dispatch(clearPostsThunk())
    history.push('/');
  };

  const handleUser = (e) => {
    e.preventDefault();
    history.push('/current_user')
  }

  const editUser = () => {
    return (
      <OpenModalButton
        buttonText="Edit Profile"
        modalComponent={<EditUserModal user={sessionUser} />}
      />
    );
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="prof-button-li">
            <li>{user.username}</li>
            <li><button onClick={handleUser}>View Profile</button></li>
            <li>{editUser()}</li>
            <li><button onClick={handleLogout}>Log Out</button></li>
          </div>
        ) : (
          <div className="logged-out-buttons">
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            <form className="demo-login-div" onSubmit={demoSubmit}>
              <button>Demo Login</button>
            </form>
          </div>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
