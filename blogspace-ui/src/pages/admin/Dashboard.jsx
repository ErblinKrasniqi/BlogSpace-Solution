import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <section className="events-section section-padding" id="section_2">
      <div className="container">
        <div className="row ">
          <div className="col-lg-12 col-12 mt-5">
            <h2 className="mb-lg-5 mb-4">Dashboard</h2>
          </div>

          <div className="col-lg-6 col-12 mb-5 mb-lg-0 mt-5">
            <div className="custom-block-image-wrap">
              <Link to="/details/1">
                <img
                  src={require("../../Assets/images/anna-rosar-ZxFyVBHMK-c-unsplash.jpg")}
                  className="custom-block-image img-fluid"
                  alt=""
                ></img>

                <i className="custom-block-icon bi-link"></i>
              </Link>

              <Link to="/edit" className="custom-block-date-wrap">
                <strong className="text-white">Edit</strong>
              </Link>

              <div className="custom-btn-wrap btn custom-btn custom-danger">
                Delete
              </div>
            </div>

            <div className="custom-block-info">
              <a href="event-detail.html" className="events-title mb-2">
                The first space trip 🚀
              </a>

              <p className="mb-0">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Recusandae dignissimos modi corrupti, nostrum dolores aut quasi
                placeat ullam cum ex iusto atque pariatur illum nam
                necessitatibus expedita. Totam, architecto culpa.
              </p>

              <div className="border-top mt-4 pt-3">
                <div className="d-flex flex-wrap align-items-center mb-1">
                  <span className="custom-block-span">Location:</span>

                  <p className="mb-0">National Center, NYC</p>
                </div>

                <div className="d-flex flex-wrap align-items-center">
                  <span className="custom-block-span">Author:</span>

                  <p className="mb-0">Nikoll Culaj</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-12 mt-5">
            <div className="custom-block-image-wrap">
              <Link to="/details/2">
                <img
                  src={require("../../Assets/images/frederik-rosar-NDSZcCfnsbY-unsplash.jpg")}
                  className="custom-block-image img-fluid"
                  alt=""
                ></img>

                <i className="custom-block-icon bi-link"></i>
              </Link>

              <Link to="/edit" className="custom-block-date-wrap">
                <strong className="text-white">Edit</strong>
              </Link>

              <div className="custom-btn-wrap btn custom-btn custom-danger">
                Delete
              </div>
            </div>

            <div className="custom-block-info">
              <a href="event-detail.html" className="events-title mb-2">
                Brining the best 🏆
              </a>

              <p className="mb-0">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Recusandae dignissimos modi corrupti, nostrum dolores aut quasi
                placeat ullam cum ex iusto atque pariatur illum nam
                necessitatibus expedita. Totam, architecto culpa.
              </p>

              <div className="border-top mt-4 pt-3">
                <div className="d-flex flex-wrap align-items-center mb-1">
                  <span className="custom-block-span">Location:</span>

                  <p className="mb-0">National Center, NYC</p>
                </div>

                <div className="d-flex flex-wrap align-items-center">
                  <span className="custom-block-span">Author:</span>

                  <p className="mb-0">Erblin Krasniqi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
