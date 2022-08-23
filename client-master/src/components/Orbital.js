// import { useRef} from "react"
// import { Canvas } from "@react-three/fiber"
// import { OrbitControls, Stars } from "@react-three/drei"
// import { WireSphere } from "./WireSphere"
// import { SpinMesh } from "./SpinMesh"
// import { useFrame } from "@react-three/fiber"
// // import "../../CSS/style.css"



// const Orbitalz = () => {

//     const mesh = useRef();
//     useFrame(() => (mesh.current.rotation.y += 0.008));

//     return (
//         <mesh ref={mesh}>

//             <WireSphere
//                 position={[0, 0, 0]}
//                 color="turquoise"
//                 args={[2, 2, 1]}
//                 speed={2}
//             />

//             <SpinMesh position={[5, 0, 5]} color="silver" speed={12} />
//             <SpinMesh position={[-5, 0, 5]} color="teal" speed={9} />
//             <SpinMesh position={[5, 0, -5]} color="teal" speed={9} />
//             <SpinMesh position={[-5, 0, -5]} color="silver" speed={15} />

//         </mesh>
//     )
// }


// export const Orbital = () => {
//     return (
//         <div className="p-bar">

//             <div className="">

//                 <Canvas
//                     className='canvas'
//                     camera={{ position: [0, 10, 60], fov: 10 }}
//                 >

//                     <OrbitControls />
//                     <Stars />
//                     <ambientLight intensity={.5} />
//                     <spotLight position={[-10, 5, 15]} angle={0.5} />
//                     <spotLight position={[10, 5, 15]} angle={0.5} />
//                     <spotLight position={[10, 5, -15]} angle={0.5} />

//                     <Orbitalz />

//                 </Canvas>

//             </div>

//         </div>
//     )
// }
