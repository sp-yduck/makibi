import React from "react";
import { useParams } from "react-router-dom";
import { User, Mail, GitBranch } from "lucide-react";
import { getUser } from "../context/User";

const ProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const currentUser = getUser();
  const currentUserId = currentUser?.user_id;
  const email = currentUser.email;

  return currentUserId !== userId ? null : (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">User Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <User size={24} className="text-blue-600 mr-2" />
          <span className="text-xl font-semibold">User ID: {userId}</span>
        </div>
        <div className="flex items-center mb-4">
          <Mail size={24} className="text-blue-600 mr-2" />
          <span>{email}</span>
        </div>
        <div className="flex items-center">
          <GitBranch size={24} className="text-blue-600 mr-2" />
          <span>
            <a href={"https://github.com/" + userId}>github.com/{userId}</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
