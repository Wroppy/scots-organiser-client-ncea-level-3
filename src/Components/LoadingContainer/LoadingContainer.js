import LoadingIcon from "../LoadingIcon/LoadingIcon";
import "./LoadingContainer.scss";

export default function LoadingContainer(props){
    return <div className="loading-container">
        <LoadingIcon height="30" width="30"/>
    </div>
}