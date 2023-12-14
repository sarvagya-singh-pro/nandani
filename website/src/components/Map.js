import React from 'react';
import ReactMapboxGl, { Layer,Feature, Marker, ZoomControl } from 'react-mapbox-gl';
const Map = (props) => {
  const Mapbox = ReactMapboxGl({
    accessToken: 'pk.eyJ1IjoiYXBvb3J2ZWxvdXMiLCJhIjoiY2ttZnlyMDgzMzlwNTJ4a240cmEzcG0xNyJ9.-nSyL0Gy2nifDibXJg4fTA'
  });

  const mapStyle = 'mapbox://styles/mapbox/streets-v11';
  const mapContainerStyle = {
    width: '95%',
    height: '500px',
    marginTop:'30px',
    marginBottom:'30px',
    borderRadius:'1rem',
  };

  const centerCoordinates = [ 86.1511, 23.6693];
  const marker2=[  86.136644997573211,23.650773466542713]
  const marker1=[ 86.16300344420783,23.65561515609579]
  const zoomLevel = [15];
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
      <div className="marker" style={{width:'7px',height:'7px',borderRadius:'50%',background:'#fff'}}></div>
    </div>
    </Marker>
    <ZoomControl/>

         </Mapbox>
  );
};

export default Map;