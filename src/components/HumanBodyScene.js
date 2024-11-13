import React, { useEffect } from 'react';
import 'aframe';

const HumanBodyScene = () => {
  return (
    <a-scene>
      {/* Raycasting cursor setup */}
      <a-entity cursor="rayOrigin: mouse" raycaster="objects: [data-raycastable]"></a-entity>
      <a-sky color="#ECECEC"></a-sky>
      <a-camera position="0 1.6 0"></a-camera>

      {/* Include the 3D model */}
      <a-assets>
        {/* Preload the model */}
        <a-asset-item id="humanBodyModel" src="/models/human_body.glb"></a-asset-item>
      </a-assets>

      {/* Use the model in the scene */}
      <a-gltf-model
        src="#humanBodyModel"
        position="0 0 -3"
        scale="1 1 1"
        rotation="0 180 0"  // Rotate to face the camera, if necessary
        data-raycastable
      ></a-gltf-model>
    </a-scene>
  );
};

export default HumanBodyScene;
