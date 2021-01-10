import React, {Suspense, useEffect, useRef} from "react";
import "./App.scss";
//Components
import Header from "./components/header";
import {Section} from "./components/section";
import {Canvas, useFrame, useLoader} from "react-three-fiber";
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader";
import {Html, RoundedBox, useGLTFLoader} from "drei";
//Page States
import state from './components/state';
//Make the Bg Color Intersection observer
import {useInView} from 'react-intersection-observer';

const Model = ({modelPath}) => {
//const gltfModel = useGLTFLoader(modelPath, true);
const collModel = useLoader(ColladaLoader, modelPath);
return <primitive object={ collModel.scene } dispose={null} /> 
}

const LightsModel = () => {
  return(
    <>
    <ambientLight intensity={0.3} />
    <directionalLight position={[10, 10, 5]} intensity={1} />
    <directionalLight position={[10, 10, 5]} intensity={1.5} />
    <spotLight position={[1000, 0, 0]} intensity={1} />
   </>
  );
}

const HTMLContents = ({bgColor, domContent, children, modelPath, positionY, positionLeftMove, positionRightMove, positionLemon, positionRotationX, positionRotationY, scaleL, scaleX, scaleY}) => {
  const ref = useRef();
 useFrame(() => (ref.current.rotation.y += positionRotationX)); 
 useFrame(() => (ref.current.rotation.x -= positionRotationY)); 

 const [refItem, inView] = useInView({
   threshold: 0
 });

 useEffect(() =>{
  inView && (document.body.style.background = bgColor)
 }, [inView]);

  return (
     <Section factor={1.5} offset={1} >
       <group position={[0, positionY, 0 ]}>
         <mesh ref={ref}  position={[positionLeftMove, positionLemon, positionRightMove]} scale={[scaleL,scaleX,scaleY]}>
           <Model modelPath={modelPath}/>
         </mesh>
          <Html portal={domContent} fullscreen>
            <div className="container" ref={refItem}> {children}</div>
          </Html>
       </group>
    </Section>
  )
}
export default function App() {
  const domContent= useRef(); 
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);
  useEffect(() => void onScroll({ target: scrollArea.current}), []);
  return (
    <>
      <Header />
      <Canvas
        colorManagement
        camera={{position:[0,0, 120], fov: 70}}>
          <LightsModel />
          <Suspense fallback={null}>
            <HTMLContents domContent={domContent} modelPath="/lemonse/model.dae" 
            positionY={250} 
            positionLeftMove={90}
            positionRightMove={0}
            positionLemon={-30} 
            positionRotationX={0.005}
            positionRotationY={0} 
            bgColor={'#ffc233'}
            scaleL= {20}
            scaleX= {20}
            scaleY= {20}>
  
                <h1 className="title">Welcome to Lemon Dev </h1>
             
            </HTMLContents>
            <HTMLContents domContent={domContent} modelPath="/lemonse/modelscopy.dae" 
            positionY={0} 
            positionLeftMove={0}
            positionRightMove={0}
            positionLemon={100} 
            positionRotationX={0.02} 
            positionRotationY={0} 
            bgColor={'#f15935'}
            scaleL= {5}
            scaleX= {5}
            scaleY= {5}>
             
                <h1 className="title">Here we are the Lemon Dev </h1>
            
            </HTMLContents>
            <HTMLContents domContent={domContent} modelPath="/lemonse/modelscopycopy.dae" 
            positionY={-200} 
            positionLeftMove={0}
            positionRightMove={0}
            positionLemon={200} 
            positionRotationX={0.02} 
            positionRotationY={0.02} 
            bgColor={'#f15925'}
            scaleL= {5}
            scaleX= {5}
            scaleY= {5}>
            
                <h1 className="title">Contact us Lemon Dev </h1>
           
            </HTMLContents>
         </Suspense>
        </Canvas>
        <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
          <div style={{position: 'sticky', top:0}} ref={domContent}></div>
          <div style={{height: `${state.pages * 50}vh`}} ref={domContent}></div>
        </div>
    </>
  );
}
