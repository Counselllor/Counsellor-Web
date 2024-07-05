import HashLoader from "react-spinners/HashLoader";
import './Loading.css'
const Loading = () => {
  return (
    <div className="loader ">
    <HashLoader aria-label="Loading Spinner" data-testid="loader" color={"#0603a9"} />
  </div>
  )
}

export default Loading