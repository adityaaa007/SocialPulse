import "./App.css";
import { Outlet } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./features/auth/authSlice.js";
import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";

export default function App() {
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(true);
  const lightTheme = useSelector(state => state.settings.lightTheme)

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User logged in
        dispatch(
          login({ uid: user.uid, email: user.email, name: user.displayName })
        );
      } else {
        // User is signed out
        dispatch(logout());
      }

      setLoader(false);
    });
  }, []);

  return (
    <div className={`w-full min-h-screen flex items-center justify-center ${lightTheme ? 'bg-bgLight' : 'bg-bgDark'}`}>
      {loader ? (
        <InfinitySpin
          visible={true}
          width="200"
          color="#666BED"
          ariaLabel="infinity-spin-loading"
        />
      ) : (
        <Outlet></Outlet>
      )}
    </div>
  );
}
