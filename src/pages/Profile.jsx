import { ProfileRoutes } from "../components/profile/ProfileRoutes";
import { SideBar } from "../components/sidebar/SideBar";

export const Profile = () => {
  return (
    <div className="pt-4  ">
      <div className="flex flex-col items-center md:flex-row md:items-start gap-4 px-2  pt-4 mx-5 ">
        <SideBar />
        <div className=" w-full ">
          <ProfileRoutes />
        </div>
      </div>
      <hr className="mx-5" />
    </div>
  );
};
