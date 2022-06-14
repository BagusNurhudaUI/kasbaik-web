import ClipLoader from "react-spinners/ClipLoader";

const Loading = function (loading) {

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <ClipLoader 
            loading={loading} css size={100} />
    </div>
    )
    
}

export default Loading;