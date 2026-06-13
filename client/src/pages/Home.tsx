import illustration from "../assets/illustration.svg";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <section className="w-full min-h-screen flex flex-col bg-[#faf9fc] md:gap-20 md:pb-20">
      <Navbar />

      <main className="w-full px-6 pt-16 pb-20 md:px-10 md:pt-28 md:flex md:items-center md:justify-center">
        <div className="mx-auto flex w-full max-w-[1090px] flex-col items-center gap-12 md:flex-row md:gap-14 md:h-[400px]">
          {/* Left Side */}
          <div className="flex w-full flex-col items-center gap-8 text-center md:w-1/2 md:items-start md:text-left md:gap-10">
            <h1 className="text-[36px] font-medium leading-tight text-[#292929] min-[390px]:text-[38px] min-[414px]:text-[40px] md:text-[50px]">
              Manage your Tasks on
              <span className="block text-purple-600">
                TaskDuty
              </span>
            </h1>

            <p className="max-w-[535px] text-[18px] font-normal leading-relaxed text-[#737171] min-[390px]:text-[19px] min-[414px]:text-[20px] md:text-[24px]">
              Organize your work, personal and important tasks in one place.
              Stay productive and never miss a deadline.
            </p>

            <Link
              to="/tasks"
              className="inline-flex h-[58px] w-[190px] items-center justify-center rounded-xl bg-[#974FD0] text-[18px] font-medium text-white transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-green-300 hover:text-purple-500 min-[414px]:h-[62px] min-[414px]:w-[200px] min-[414px]:text-[20px] md:h-[70px] md:w-[220px] md:text-[24px]"
            >
              Go to My Tasks
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex w-full justify-center md:w-1/2">
            <img
              src={illustration}
              alt="Task Manager Illustration"
              className="w-full max-w-[300px] min-[390px]:max-w-[330px] min-[414px]:max-w-[350px] md:max-w-[550px]"
            />
          </div>
        </div>
      </main>
    </section>
  );
};

export default Home;