import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/dataService";
import { User, Mail, MapPin, Globe, Edit2, Calendar } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { userId } = useParams(); // Lấy userId từ URL params

  const { data, isLoading, error } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => getUser(userId),
    enabled: !!userId, // Chỉ chạy query khi có userId
  });

  console.log(data);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 text-lg">Error loading user profile</p>
          <p className="text-gray-600 mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  const user = data?.profile?.user || {};
  console.log(user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Cover */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-2xl h-48 relative">
          <div className="absolute -bottom-16 left-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
                <img
                  src={user.profilePicture || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition cursor-pointer">
                <Edit2 className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          </div>
          <button className="absolute top-4 right-4 bg-white text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition flex items-center gap-2 shadow-lg cursor-pointer">
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </button>
        </div>

        {/* Profile Info Section */}
        <div className="bg-white rounded-b-2xl shadow-lg pt-20 pb-6 px-8 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user.fullName || "User Name"}</h1>
              <p className="text-gray-600 mt-2 max-w-2xl">
                {user.bio || "No bio added yet. Share something about yourself!"}
              </p>
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                {user.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{user.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex gap-1 px-6">
              {["overview", "languages", "activity"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium capitalize transition relative ${
                    activeTab === tab ? "text-blue-600" : "text-gray-600 hover:text-gray-900 cursor-pointer"
                  }`}
                >
                  {tab}
                  {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <User className="w-5 h-5 text-gray-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Full Name</p>
                        <p className="font-medium text-gray-900">{user.fullName || "Not provided"}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium text-gray-900">{user.email || "Not provided"}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="font-medium text-gray-900">{user.location || "Not provided"}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <Globe className="w-5 h-5 text-gray-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Native Language</p>
                        <p className="font-medium text-gray-900">{user.nativeLanguage || "Not provided"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "languages" && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Language Learning</h2>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {user.learningLanguage?.charAt(0) || "?"}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{user.learningLanguage || "No language selected"}</h3>
                          <p className="text-sm text-gray-600">Currently Learning</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Globe className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{user.nativeLanguage || "Not specified"}</h3>
                        <p className="text-sm text-gray-600">Native Language</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "activity" && (
              <div>
                <h1>---</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
