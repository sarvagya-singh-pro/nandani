import React from 'react';
import ReactMapboxGl, { Layer,Feature, Marker, ZoomControl } from 'react-mapbox-gl';
const Map = (props) => {
  const Mapbox = ReactMapboxGl({
    accessToken: 'pk.eyJ1IjoiYXBvb3J2ZWxvdXMiLCJhIjoiY2ttZnlyMDgzMzlwNTJ4a240cmEzcG0xNyJ9.-nSyL0Gy2nifDibXJg4fTA'
  });

  const mapStyle = 'mapbox://styles/mapbox/streets-v11';
  const mapContainerStyle = {
    width: '95%',
    height: '400px',
    marginTop:'30px',
    marginBottom:'30px',
    borderRadius:'1rem',
  };

  const centerCoordinates = [ 86.1511, 23.6693];
  const marker2=[ 84.85119062383082,25.53586779358031]
  const marker1=[ 86.1456568976087,23.674535893698813]
  const zoomLevel = [8];
  console.log(props.cords)  
  return (
    <Mapbox
      style={mapStyle}
      containerStyle={mapContainerStyle}
      center={props.cords}
      zoom={zoomLevel}
    >
     
    <Marker  color="red"    coordinates={props.cords}  >
   
    <div className="marker" style={{width:'20px',display:'flex',justifyContent:'center',alignItems:'center',height:'20px',borderRadius:'50%',background:'#f00'}} >
      <div className="marker" style={{width:'7px',height:'7px',borderRadius:'50%',background:'#fff'}}></div>
    </div>
    </Marker>
    <Marker  color="red"    coordinates={marker2}  >
    <div className="marker" style={{width:'20px',display:'flex',justifyContent:'center',alignItems:'center',height:'20px',borderRadius:'50%',background:'#f00'}} >
      <div className="marker" style={{width:'10px',height:'10px',borderRadius:'50%',background:'#fff'}}></div>
    </div>
    </Marker>
    <ZoomControl/>

         </Mapbox>
  );
};

export default Map;