import React, { useRef, useEffect } from "react";

const Map = (props) => {
  const { center, zoom } = props;
  const mapRef = useRef();

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });

    new window.google.maps.Marker({ position: props.center, map: map });
  }, [center, zoom]);

  return <div ref={mapRef} className="h-full w-full"></div>;
};

export default Map;
