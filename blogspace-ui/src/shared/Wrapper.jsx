import Footer from "./Footer";
import Navbart from "./Navbart";

const Wrapper = ({ children }) => {
  return (
    <>
      <Navbart />
      {children}
      <Footer />
    </>
  );
};

export default Wrapper;
