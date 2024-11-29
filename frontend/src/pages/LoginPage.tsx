import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Flame, Github, Mail } from 'lucide-react';

export function LoginPage() {
  const { loginWithRedirect, loginWithPopup } = useAuth0();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        connection: 'google-oauth2'
      }
    });
  };

  const handleGithubLogin = () => {
    loginWithPopup({
      authorizationParams: {
        connection: 'github'
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary-100">
            <Flame className="h-8 w-8 text-primary-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome to Makibi
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to manage your OKRs effectively
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="h-5 w-5 mr-2"
            />
            Continue with Google
          </button>

          <button
            onClick={handleGithubLogin}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Github className="h-5 w-5 mr-2" />
            Continue with GitHub
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <button
            onClick={() => loginWithRedirect()}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            <Mail className="h-5 w-5 mr-2" />
            Sign in with Email
          </button>
        </div>
      </div>
    </div>
  );
}