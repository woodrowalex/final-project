import * as React from 'react';
import { useContext, useEffect } from "react";
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import styled from 'styled-components'
import 'mapbox-gl/dist/mapbox-gl.css';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import Header from "./Header"
// import Sidebar from './Sidebar';
import { PinContext } from './PinContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import HomeFeed from "./HomeFeed";
import Signup from "./Signup";
import WeatherDescription from "./WeatherDescription";


const MAPBOX_TOKEN = 'pk.eyJ1Ijoid29vZHJvd2FsZXgiLCJhIjoiY2w4NWJqZ2doMGV6dTNvb2VjZnI5aGE1NCJ9.geOwh6qkCvAA21JV-H8buw'


const App = () => {

  const [showPopup, setShowPopup] = React.useState(true);
  const [viewState, setViewState] = React.useState({
    latitude: 45.508888,
    longitude: -73.561668,
    zoom: 8
  });
  
  const {
    pins,
    // selectedPin,
    setPins,
    // setSelectedPin
  } = useContext(PinContext)

  // console.log(selectedPin);

  // const HandleSelectedPin = (e) => {
  //   setSelectedPin(e.target.value)
  // };

  useEffect(() => {
    fetch("/api/get-pins")
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      setPins(data.data)
    })
    .catch((err) => console.log(err))
  }, [setPins])

//   if (!pins) return <p>Loading...</p>;
// console.log(pins)
  return (
    <>
    <Header/>
    <MainDiv>
      <ReactMapGL
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        // style={{width: '60%', height: '70%', margin: 'none'}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {pins
        ?pins.map((pin) => {
          return (
          <Marker longitude={pin.long} latitude={pin.lat} 
            color="red">
              {/* onClick={() => HandleSelectedPin(pins.map._id, pins.map.lat, pins.map.long)} */}
          </Marker>)

        })
      :<></>}
        <Marker longitude={-73.561668} latitude={45.508888} 
          color="red">
            {/* onClick={() => HandleSelectedPin(pins.map._id, pins.map.lat, pins.map.long)} */}
        </Marker>
          {showPopup && (
            <Popup className='popup'
              longitude={-73.561668} latitude={45.508888}
              anchor="left"
              onClose={() => setShowPopup(true)}>
                <Div>
                  <Label>Weather category</Label>
                  <H4 className='category'> Thunderstorm <ThunderstormIcon styles={{ fontSize: 'small' }}/></H4>
                  <Label>Date </Label>
                  <H4 className='date'>Sept 10th</H4>
                  <Label>Time </Label>
                  <H4 className='time'>4:54pm</H4>
                  <Label>Posted by:</Label>
                    <H4 className='user'>Woodrow</H4>
                    <Button><div>Click here for</div> <div>more info</div></Button>
              </Div>
            </Popup>
          )};
      </ReactMapGL>
      <Sidebar>
        {/* <Routes>
          <Route exact path="/" element={<HomeFeed />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/weather-description" element={<WeatherDescription />} />
        </Routes> */}
      </Sidebar>
      </MainDiv>

    </>
  );
}

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 250px;
  justify-content: space-around;
`

const MainDiv = styled.div`
display: flex;
flex-direction: row;
height: 300px;
`

const Label = styled.label`
  color: tomato;
  font-size: 10px;
  border-bottom: 1px solid tomato;
`

const H4 = styled.h4`
margin: 0;
`
const Button = styled.button`
border-radius: 8px;
font-size: 10px;
color: black;
background-color: #efe9e1;
width: 100px;
height: 40px;
border: none;
margin: 0px 20px;
&:hover {
    font-weight: bold;
    border: 1px solid black;
    cursor: pointer;
}
`

const Sidebar = styled.div`
position: absolute;
z-index: 1;
right: 0;
display: flex;
flex-direction: column;
font-family: Arial, Helvetica, sans-serif;
justify-content: space-between;
width: 30%;
height: 100%;
background-color: pink;
`

export default App;