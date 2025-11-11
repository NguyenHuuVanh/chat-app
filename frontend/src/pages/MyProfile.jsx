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
      <h1 className="text-3xl font-bold">My Profile</h1>
      {isLoading ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        /* avatar */
        <div className="my-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Profile Picture</h2>
          </div>
          <div className="avatar size-24 rounded-full">
            <img src={data.user?.profilePicture} alt="User Avatar" />
          </div>
        </div>
        /* profile details */
        /* settings */
      )}
    </div>
  );
};

export default MyProfile;
