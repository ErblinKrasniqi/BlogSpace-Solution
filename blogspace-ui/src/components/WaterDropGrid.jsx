import anime from "animejs";

const WaterDropGrid = () => {
  return (
    <div className="position-absolute w-100" style={{ zIndex: 0 }}>
      <DotGrid />
    </div>
  );
};

const GRID_WIDTH = 35;
const GRID_HEIGHT = 14;

const DotGrid = () => {
  const handleDotClick = (e) => {
    anime({
      targets: ".dot-point",
      scale: [
        { value: 1.35, easing: "easeOutSine", duration: 250 },
        { value: 1, easing: "easeInOutQuad", duration: 500 },
      ],
      translateY: [
        { value: -15, easing: "easeOutSine", duration: 250 },
        { value: 0, easing: "easeInOutQuad", duration: 500 },
      ],
      opacity: [
        { value: 1, easing: "easeOutSine", duration: 250 },
        { value: 0.5, easing: "easeInOutQuad", duration: 500 },
      ],
      delay: anime.stagger(100, {
        grid: [GRID_WIDTH, GRID_HEIGHT],
        from: e.target.dataset.index,
      }),
    });
  };

  const dots = [];
  let index = 0;

  for (let i = 0; i < GRID_WIDTH; i++) {
    for (let j = 0; j < GRID_HEIGHT; j++) {
      dots.push(
        <div
          className="d-flex align-items-center justify-content-center rounded-circle p-2 cursor-pointer"
          data-index={index}
          key={`${i}-${j}`}
        >
          <div
            className="dot-point rounded-circle"
            data-index={index}
            style={{
              width: "0.5rem",
              height: "0.5rem",
              backgroundColor: "rgb(61, 64, 91)",
              opacity: 0.9,
            }}
          />
        </div>
      );
      index++;
    }
  }

  return (
    <div
      onClick={handleDotClick}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)`,
      }}
    >
      {dots}
    </div>
  );
};

export default WaterDropGrid;
