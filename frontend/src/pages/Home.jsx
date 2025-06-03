
import Feeds from "../components/Feeds/index";
import Share from "../components/Share";
import Rightbar from "../components/Rightbar"; // <-- Import Rightbar
import "../styles/Home.css";
import Story from "../components/Story/index";

const Home = () => {
  return (
    <div className="flex w-full p-4 justify-between gap-4">
      {/* ---------- Main Content ---------- */}
      <div className="w-full max-w-2xl flex p-6 flex-col gap-6">
        <Story />
        <Share />
        <div className="flex flex-col gap-4">
          <Feeds />
        </div>
      </div>

      {/* ---------- Right Sidebar ---------- */}
      <div className="hidden lg:block w-72">
        <Rightbar />
      </div>
    </div>
  );
};

export default Home;
