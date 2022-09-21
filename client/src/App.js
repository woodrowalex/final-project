import * as React from 'react';
import { useContext, useEffect } from "react";
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import styled from 'styled-components'
import 'mapbox-gl/dist/mapbox-gl.css';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import Header from "./Header"
// import Sidebar from './Sidebar';
import { PinContext } from './PinContext';
import { BrowserRouter as Router, Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import Login from "./Login";
import HomeFeed from "./HomeFeed";
import Signup from "./Signup";
import WeatherDescription from "./WeatherDescription";
import Map from './Map';
import SignedIn from './SignedIn';
import LoggedOut from './LoggedOut';


const MAPBOX_TOKEN = 'pk.eyJ1Ijoid29vZHJvd2FsZXgiLCJhIjoiY2w4NWJqZ2doMGV6dTNvb2VjZnI5aGE1NCJ9.geOwh6qkCvAA21JV-H8buw'


const App = () => {

  const [showPopup, setShowPopup] = React.useState(true);
  const [viewState, setViewState] = React.useState({
    latitude: 45.508888,
    longitude: -73.561668,
    zoom: 8
  });
  
  // const {
  //   pins,
  //   setPins,
  //   username,
  //   setUsername,
  //   category,
  //   setCategory,
  //   description,
  //   setDescription,
  //   lat,
  //   setLat,
  //   long, 
  //   setLong,
  //   selectedPin,
  //   setSelectedPin
  // } = useContext(PinContext)

  // const navigate = useNavigate();
  // // console.log(selectedPin);

  // // const HandleSelectedPin = (e) => {
  // //   setSelectedPin(e.target.value)
  // // };


  // useEffect(() => {
  //   fetch("/api/get-pins", {
  //   method: "GET",
  //   body: JSON.stringify(newPin),
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   },
  // })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data)
  //     setPins(data.data)
  //   })
  //   .catch((err) => console.log(err))
  // }, [setPins])

//   if (!pins) return <p>Loading...</p>;
// console.log(pins)
  return (
    <> 
      <BrowserRouter>
        <Header/>
        <MainDiv>
          <Map/>
            <SwitchDiv>
              <Routes>
                <Route exact path="/" element={<HomeFeed />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signedin" element={<SignedIn />} />
                <Route path="/loggedout" element={<LoggedOut />} />
                <Route path="/login" element={<Login />} />
                <Route path="/weather-description" element={<WeatherDescription />} />
              </Routes>
            </SwitchDiv>
        </MainDiv>
      </BrowserRouter>
    </>
  );
}

// const Div = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 150px;
//   height: 250px;
//   justify-content: space-around;
// `

const MainDiv = styled.div`
display: flex;
flex-direction: row;
height: 80vh;
`


const SwitchDiv = styled.div`
width: 50vw;
`

export default App;