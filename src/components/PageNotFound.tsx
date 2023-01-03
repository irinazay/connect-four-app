import Computer from "../images/computer.png";
import "../styles/partials/_pageNotFound.scss";

export default function PageNotFound() {
  return (
    <div className="page-not-found">
      <img src={Computer} alt="fireSpot" width={100} height={100} />
      <p>Sorry, we can't find the page you're looking for.</p>
    </div>
  );
}
