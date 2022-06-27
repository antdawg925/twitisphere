import Followers from "./FlipComps/Followers"
import Following from "./FlipComps/Following"
const Follows = (props) => {

    return (
        <div style={{
            position: "fixed",
            left:"34vw",
            top:"27vh",
            border:".2rem solid black",
            backgroundColor:"whiteSmoke",
            height:"40vh",
            width:"20vw",
            textAlign:"center",
        }}>
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
            <button onClick={() => props.setFollowsComp(false)}>Close</button>
        </div>
    )
}
export default Follows