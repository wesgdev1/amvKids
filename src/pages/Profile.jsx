import { ProfileRoutes } from "../components/profile/ProfileRoutes";
import { SideBar } from "../components/sidebar/SideBar";

export const Profile = () => {
  return (
    <div className="pt-4  ">
      <div className="flex flex-row gap-4 px-2  pt-4">
        <SideBar />
        <div className=" w-full ">
          <ProfileRoutes />
        </div>
      </div>
      <hr className="mx-5" />
    </div>
  );
};
