import { Input } from "@/Components/ui/input";
import StartMeetBtn from "../../Components/StartMeetBtn";

const Home = () => {
  return (
    <div className="flex gap-2 items-center justify-center h-screen">
      <Input placeholder="Enter Your Name..." className="w-[200px]" />
      <StartMeetBtn />
    </div>
  );
};

export default Home;
