import Footer from "./Footer";

const Wrapper = ({ children }) => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default Wrapper;
