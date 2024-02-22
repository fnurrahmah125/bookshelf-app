import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./configs/firebase-config";
import { useDispatch } from "react-redux";
import { saveUser } from "./store/slices/authSlice";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import EmailSent from "./pages/EmailSent";
import EditBook from "./pages/EditBook";
import AddBook from "./pages/AddBook";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const payload = {
          uid: user.uid,
          authToken: user.refreshToken,
          email: user.email,
          displayName: user.displayName,
        };
        dispatch(saveUser(payload));
      } else {
        dispatch(saveUser(undefined));
      }
    });
  }, [auth, dispatch]);

  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit/:id" element={<EditBook />} />
          <Route path="/add-book" element={<AddBook />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-password/sent" element={<EmailSent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
