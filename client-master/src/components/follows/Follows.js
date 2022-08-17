import Followers from "./FlipComps/Followers"
import Following from "./FlipComps/Following"


const Follows = (props) => {

    return (
        <div style={{
            position: "fixed",
            left: "34vw",
            top: "30vh",
            border: ".2rem solid grey",
            backgroundColor: "whiteSmoke",
            height: "40vh",
            width: "20vw",
            textAlign: "center",
            borderRadius: "7px"
        }} className="relative">

            {
                props.followingComp ? (
                    <Following
                        followersComp={props.followersComp}
                        setFollowersComp={props.setFollowersComp}
                        followingComp={props.followingComp}
                        setFollowingComp={props.setFollowingComp}
                    />
                ) : null
            }
            {
                props.followersComp ? (
                    <Followers
                        followersComp={props.followersComp}
                        setFollowersComp={props.setFollowersComp}
                        followingComp={props.followingComp}
                        setFollowingComp={props.setFollowingComp}
                    />
                ) : null
            }
            <button onClick={() => props.setFollowsComp(false)} style={{
                backgroundColor: "rgb(251, 66, 66)",
                width: "100%",
                height: "50px",
                fontSize: "25px",
                position:"absolute",
                bottom:'0px',
                left:"0px",
                }}>Close</button>
        </div>
    )
}
export default Follows