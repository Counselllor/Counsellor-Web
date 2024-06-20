
import HashLoader from "react-spinners/HashLoader";

const Loading = () => {
  return (
    <div className="loader ">
    <HashLoader aria-label="Loading Spinner" data-testid="loader" color={"#0603a9"} />
  </div>
  )
}

export default Loading