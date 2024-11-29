import React, { useState } from 'react';
import { Camera, Mail, MapPin, Building, Calendar } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export function ProfilePage() {
  const { user, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    role: user?.role || '',
    department: user?.department || '',
    location: user?.location || '',
  });

  if (!user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow rounded-lg">
        <div className="relative h-32 bg-primary-600 rounded-t-lg">
          <div className="absolute -bottom-12 left-8">
            <div className="relative">
              <img
                src={user.picture}
                alt={user.name}
                className="h-24 w-24 rounded-full border-4 border-white object-cover"
              />
              <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-white shadow-sm hover:bg-gray-50">
                <Camera className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-16 pb-8 px-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="text-2xl font-bold text-gray-900 bg-gray-50 border-gray-300 rounded-md"
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                )}
                <div className="mt-1 flex items-center text-gray-500">
                  <Mail className="h-4 w-4 mr-2" />
                  {user.email}
                </div>
              </div>
              <button
                type="button"
                onClick={() => isEditing ? handleSubmit : setIsEditing(true)}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                {isEditing ? (
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-600">{user.bio}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-600">{user.role}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-600">{user.department}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                ) : (
                  <div className="mt-1 flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {user.location}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Join Date</label>
                <div className="mt-1 flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(user.joinDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}