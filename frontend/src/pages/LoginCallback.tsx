import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dispatchSetUser } from "../context/User";
import { api } from "../lib/client";

const LoginCallback = () => {
  const [isFailed, setIsFailed] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.users
      .me()
      .then((data) => {
        dispatchSetUser(data);
        navigate(`/${data.user_id}/dashboard`);
        setIsFailed(false);
      })
      .catch((error) => {
        console.error(error);
        setIsFailed(true);
      });
  }, []);

  // to do: retry logic for failed authentication
  return !isFailed ? (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">
          Authenticating with GitHub...
        </h2>
        <p>Please wait while we complete the authentication process.</p>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Failed to Authenticate...</h2>
        <p>Sorry, something went wrong with authentication process...</p>
      </div>
    </div>
  );
};

export default LoginCallback;
