import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Users,
  UserPlus,
  UserCheck,
  UserX,
  Search,
  Mail,
  MapPin,
  Globe,
  Clock,
  Check,
  X,
  MessageCircle,
  MoreVertical,
} from "lucide-react";
import { getFriendRequests, getRecommendedUsers, getUserFriends } from "../api/dataService";
import { Link, useNavigate } from "react-router-dom";

const FriendPage = () => {
  const [activeTab, setActiveTab] = useState("friends");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: friendsData, isLoading: friendsLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: requestsData, isLoading: requestsLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { data: suggestionsData = [], isLoading: suggestionsLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  console.log(suggestionsData);

  // Mutations
  const acceptRequestMutation = useMutation({
    mutationFn: async (userId) => {
      // API call to accept friend request
      await new Promise((resolve) => setTimeout(resolve, 500));
      return userId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["friendRequests"]);
      queryClient.invalidateQueries(["friends"]);
    },
  });

  const rejectRequestMutation = useMutation({
    mutationFn: async (userId) => {
      // API call to reject friend request
      await new Promise((resolve) => setTimeout(resolve, 500));
      return userId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["friendRequests"]);
    },
  });

  const sendRequestMutation = useMutation({
    mutationFn: async (userId) => {
      // API call to send friend request
      await new Promise((resolve) => setTimeout(resolve, 500));
      return userId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["suggestedFriends"]);
    },
  });

  const removeFriendMutation = useMutation({
    mutationFn: async (userId) => {
      // API call to remove friend
      await new Promise((resolve) => setTimeout(resolve, 500));
      return userId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["friends"]);
    },
  });

  const handleProfile = (userId) => {
    navigate(`/users/${userId}`);
  };

  const friends = friendsData?.friends || [];
  const requests = requestsData?.requests || [];
  const suggestions = suggestionsData?.recommendedUsers || [];

  const filteredFriends = friends.filter((friend) => friend.fullName.toLowerCase().includes(searchQuery.toLowerCase()));

  const FriendCard = ({ friend, showActions = false }) => (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className="flex items-start gap-4">
        <div className="relative">
          <img
            src={friend.profilePicture}
            alt={friend.fullName}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
          />
          {friend.status === "online" && (
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          )}
        </div>
        <div className="flex-1">
          <Link
            to={`/users/${friend._id}`}
            className="font-bold text-gray-900 text-lg cursor-pointer hover:underline hover:text-primary"
          >
            {friend.fullName}
          </Link>
          <div className="flex flex-col gap-1 mt-2 text-sm text-gray-600">
            {friend.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{friend.location}</span>
              </div>
            )}
            {friend.learningLanguage && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>Learning {friend.learningLanguage}</span>
              </div>
            )}
          </div>
        </div>
        {showActions && (
          <button className="p-2 hover:bg-gray-100 rounded-full transition">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>
      {showActions && (
        <div className="flex gap-2 mt-4">
          <Link
            to={`/chat/${friend._id}`}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 font-medium"
          >
            <MessageCircle className="w-4 h-4" />
            Message
          </Link>
          <button
            className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition font-medium cursor-pointer"
            onClick={() => handleProfile(friend._id)}
          >
            View Profile
          </button>
        </div>
      )}
    </div>
  );

  const RequestCard = ({ request }) => (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className="flex items-start gap-4">
        <img
          src={request.profilePicture}
          alt={request.fullName}
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
        />
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-lg">{request.fullName}</h3>
          <div className="flex flex-col gap-1 mt-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{request.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{request.mutualFriends} mutual friends</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{request.sentAt}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => acceptRequestMutation.mutate(request.id)}
          disabled={acceptRequestMutation.isPending}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 font-medium disabled:opacity-50"
        >
          <Check className="w-4 h-4" />
          Accept
        </button>
        <button
          onClick={() => rejectRequestMutation.mutate(request.id)}
          disabled={rejectRequestMutation.isPending}
          className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition flex items-center justify-center gap-2 font-medium disabled:opacity-50"
        >
          <X className="w-4 h-4" />
          Decline
        </button>
      </div>
    </div>
  );

  const SuggestionCard = ({ suggestion }) => (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className="flex items-start gap-4">
        <img
          src={suggestion.profilePicture}
          alt={suggestion.fullName}
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
        />
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-lg">{suggestion.fullName}</h3>
          <div className="flex flex-col gap-1 mt-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{suggestion.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>Learning {suggestion.learningLanguage}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{suggestion.mutualFriends} mutual friends</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => sendRequestMutation.mutate(suggestion.id)}
          disabled={sendRequestMutation.isPending}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 font-medium disabled:opacity-50"
        >
          <UserPlus className="w-4 h-4" />
          Add Friend
        </button>
        <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition font-medium">
          Remove
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Friends</h1>
          <p className="text-gray-600">Connect with language learners around the world</p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Friends</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">{friends.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Friend Requests</p>
                <p className="text-3xl font-bold text-purple-600 mt-1">{requests.length}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Suggestions</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{suggestions.length}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <UserPlus className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex gap-1 px-6">
              {[
                { id: "friends", label: "My Friends", icon: Users },
                { id: "requests", label: "Requests", icon: Mail, badge: requests.length },
                { id: "suggestions", label: "Suggestions", icon: UserPlus },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-medium capitalize transition relative flex items-center gap-2 ${
                    activeTab === tab.id ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
                  } cursor-pointer`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                  {tab.badge > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {tab.badge}
                    </span>
                  )}
                  {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {/* Search Bar */}
            {activeTab === "friends" && (
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search friends..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-black pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Friends Tab */}
            {activeTab === "friends" && (
              <div>
                {friendsLoading ? (
                  <div className="flex justify-center py-12">
                    <span className="loading loading-spinner loading-lg text-blue-600" />
                  </div>
                ) : filteredFriends.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No friends found</h3>
                    <p className="text-gray-600">Start connecting with other language learners!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredFriends.map((friend) => (
                      <FriendCard key={friend.id} friend={friend} showActions={true} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Requests Tab */}
            {activeTab === "requests" && (
              <div>
                {requestsLoading ? (
                  <div className="flex justify-center py-12">
                    <span className="loading loading-spinner loading-lg text-blue-600" />
                  </div>
                ) : requests.length === 0 ? (
                  <div className="text-center py-12">
                    <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No friend requests</h3>
                    <p className="text-gray-600">You're all caught up!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {requests.map((request) => (
                      <RequestCard key={request.id} request={request} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Suggestions Tab */}
            {activeTab === "suggestions" && (
              <div>
                {suggestionsLoading ? (
                  <div className="flex justify-center py-12">
                    <span className="loading loading-spinner loading-lg text-blue-600" />
                  </div>
                ) : suggestions.length === 0 ? (
                  <div className="text-center py-12">
                    <UserPlus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No suggestions</h3>
                    <p className="text-gray-600">Check back later for new friend suggestions!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {suggestions.map((suggestion) => (
                      <SuggestionCard key={suggestion.id} suggestion={suggestion} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendPage;
