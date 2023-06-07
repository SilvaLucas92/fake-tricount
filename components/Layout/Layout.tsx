import AnimateComponent from "../AnimateComponent/AnimateComponent";
import Navbar from "../Navbar/Navbar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" px-10 md-px-0 md:w-3/4 mx-auto">
      <AnimateComponent>
        <Navbar />
        {children}
      </AnimateComponent>
    </div>
  );
};
