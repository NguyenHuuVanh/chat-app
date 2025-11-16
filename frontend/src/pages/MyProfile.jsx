import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../api/dataService";
const MyProfile = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
  });

  console.log(data);
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {isLoading ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <div className="flex flex-row items-center gap-4">
          {/* avatar */}
          <div className="my-6 border border-gray-300 rounded-lg p-4 w-1/3 flex flex-col items-center">
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-4">Profile Picture</h2>
            </div>
            <div className="avatar size-24 rounded-full">
              <img src={data.user?.profilePicture} alt="User Avatar" />
            </div>
            <h2 className="text-xl font-medium mt-2">{data.user?.fullName}</h2>
            <p className="text-gray-600 mt-2">{data.user?.bio}</p>
          </div>
          {/* profile details */}
          <div className="my-6 border border-gray-300 rounded-lg p-4 px-6 w-2/3">
            <h1 className="text-2xl font-bold mb-4">Profile details</h1>
            <div className="mb-4 flex flex-row gap-2">
              <label className="font-medium">Full Name:</label>
              <p>{data.user?.fullName}</p>
            </div>
            <div className="mb-4 flex flex-row gap-2">
              <label className="font-medium">Email:</label>
              <p>{data.user?.email}</p>
            </div>
            <div className="mb-4 flex flex-row gap-2">
              <label className="font-medium">Location:</label>
              <p>{data.user?.location}</p>
            </div>
            <div className="mb-4 flex flex-row gap-2">
              <label className="font-medium">LearningLanguage:</label>
              <p>{data.user?.learningLanguage}</p>
            </div>
            <div className="mb-4 flex flex-row gap-2">
              <label className="font-medium">NativeLanguage:</label>
              <p>{data.user?.nativeLanguage}</p>
            </div>
          </div>
          {/* settings */}
        </div>
      )}
    </div>
  );
};

export default MyProfile;
