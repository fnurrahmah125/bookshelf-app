import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";
import { AuthProvider } from "./context/AuthContext";
import DefaultLayout from "./layouts/DefaultLayout";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import SendResetPassword from "./pages/SendResetPassword";
import AuthLayout from "./layouts/AuthLayout";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Form from "./pages/Form";
import LoginRoute from "./routes/LoginRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import ChangePassword from "./pages/ChangePassword";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <GlobalProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <DefaultLayout>
                      <Homepage />
                    </DefaultLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <DefaultLayout>
                      <Profile />
                    </DefaultLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/change-password"
                element={
                  <ProtectedRoute>
                    <DefaultLayout>
                      <ChangePassword />
                    </DefaultLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-book"
                element={
                  <ProtectedRoute>
                    <DefaultLayout>
                      <Form />
                    </DefaultLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit-book/:id"
                element={
                  <ProtectedRoute>
                    <DefaultLayout>
                      <Form />
                    </DefaultLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <LoginRoute>
                    <AuthLayout>
                      <Login />
                    </AuthLayout>
                  </LoginRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <LoginRoute>
                    <AuthLayout>
                      <Register />
                    </AuthLayout>
                  </LoginRoute>
                }
              />
              <Route
                path="/reset-password"
                element={
                  <LoginRoute>
                    <AuthLayout>
                      <ResetPassword />
                    </AuthLayout>
                  </LoginRoute>
                }
              />
              <Route
                path="/send-reset-password"
                element={
                  <LoginRoute>
                    <AuthLayout>
                      <SendResetPassword />
                    </AuthLayout>
                  </LoginRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </GlobalProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
