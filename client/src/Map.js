import * as React from 'react';
import { useContext, useEffect, useState } from "react";
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import styled from 'styled-components'
import 'mapbox-gl/dist/mapbox-gl.css';
import { Room } from "@material-ui/icons";
import { PinContext } from './PinContext';
import { Link } from "react-router-dom";
import Signup from './Signup';
import Login from './Login';



const MAPBOX_TOKEN = 'pk.eyJ1Ijoid29vZHJvd2FsZXgiLCJhIjoiY2w4NWJqZ2doMGV6dTNvb2VjZnI5aGE1NCJ9.geOwh6qkCvAA21JV-H8buw'


const Map = () => {
    const myStorage = window.localStorage;
    const [currentPlaceId, setCurrentPlaceId] = useState(null);
    const [newPlace, setNewPlace] = useState(null);
    const [currentUsername, setCurrentUsername] = useState(myStorage.getItem("user"));
    const [category, setCategory] = useState(null);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [description, setDescription] = useState(null);
    const [showPopup, setShowPopup] = useState(true);
    const [viewState, setViewState] = useState({
    latitude: 45.508888,
    longitude: -73.561668,
    zoom: 8
    });

    const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
    
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

    // useEffect(() => {
    // fetch("/api/get-pins")
    // .then((res) => res.json())
    // .then((data) => {
    //     console.log(data)
    //     setPins(data.data)
    // })
    // .catch((err) => console.log(err))
    // }, [setPins])

    // -----------------------------


    const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewState({ ...viewState, latitude: lat, longitude: long });
    };

    const handleAddClick = (e) => {
        const [longitude, latitude] = e.lngLat;
        setNewPlace({
            lat: latitude,
            long: longitude,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPin = {
            username: currentUsername,
            category,
            description,
            lat: newPlace.lat,
            long: newPlace.long,
        };
    
        try {
            const res = await axios.post("/pins", newPin);
            setPins([...pins, res.data]);
            setNewPlace(null);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const getPins = async () => {
            try {
            const allPins = await axios.get("/pins");
            setPins(allPins.data);
        } catch (err) {
            console.log(err);
        }
        };
        getPins();
    }, []);
    
    const handleLogout = () => {
        setCurrentUsername(null);
        myStorage.removeItem("user");
    };


return (
    <ReactMapGL
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        // style={{width: '60%', height: '70%', margin: 'none'}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        onDblClick={currentUsername && handleAddClick}
    >
        {pins.map((p) => (
            <>
            <Marker longitude={p.long} latitude={p.lat} 
                color="red">
                {/* onClick={() => HandleSelectedPin(pins.map._id, pins.map.lat, pins.map.long)} */}
                <Room 
                style={{
                    color: currentUsername === p.username 
                    ? "tomato"
                    : "slateblue",
                    cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                />
            </Marker>
            {p._id === currentPlaceId && (
                <Popup
                key={p._id}
                lattitude={p.lat}
                longitude={p.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
                andchor="left"
                >
                    <Div>
                        <Label>Weather category</Label>
                        <H4> {p.category}</H4>
                        <Label>Date </Label>
                        <H4>{p.date}</H4>
                        <Label>Time </Label>
                        <H4>{p.time}</H4>
                        <Label>Posted by:</Label>
                        <H4>{p.username}</H4>
                        <Link to="/weather-description">
                            <Button><div>Click here for</div> <div>more info</div></Button>
                        </Link>
                    </Div>
                </Popup>
            )}
        </>    
        ))}
        {newPlace && (
            <>
            <Marker latitude={newPlace.lat} longitude={newPlace.long}
            color="red">
                <Room
                style={{
                    color: "tomato",
                    cursor: "pointer",
                }}
                />
            </Marker>
            <Popup
            latitude={newPlace.lat}
            longitude={newPlace.long}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewPlace(null)}
            anchor="left"
            >
                <InputDiv>
                    <form onSubmit={handleSubmit}>
                        <Label>Weather category</Label>
                        <input 
                        placeholder='Category of weather'
                        onChange={(e) => setCategory(e.target.value)}/>
                        <Label>Date </Label>
                        <input 
                        placeholder='date'
                        onChange={(e) => setDate(e.target.value)}/>
                        <Label>Time </Label>
                        <input 
                        placeholder='time'
                        onChange={(e) => setTime(e.target.value)}/>
                        <Label>Posted by:</Label>
                        <input 
                        placeholder='description'
                        onChange={(e) => setDescription(e.target.value)}/>
                        <Button type="submit">
                            Add Pin
                        </Button>
                    </form>
                </InputDiv>
            </Popup>
            </>
        )}
        {currentUsername ? (
            <Button onClick={handleLogout}>
                Log out
            </Button>
        ) : (
            <ButtonsDiv>
                <Button onClick={() => setShowLogin(true)}>
                    Log in
                </Button>
                <Button onClick={() => setShowSignup(true)}>
                    Sign up
                </Button>
            </ButtonsDiv>
        )}
        {showSignup && <Signup setShowSignup={setShowSignup}
        />}
        {showLogin && (
            <Login
            setShowLogin={setShowLogin}
            setCurrentUsername={setCurrentUsername}
            myStorage={myStorage}
            />
        )}
    </ReactMapGL>
)};

const Div = styled.div`
    display: flex;
    flex-direction: column;
    width: 150px;
    height: 250px;
    justify-content: space-around;
`

const Label = styled.label`
    color: tomato;
    font-size: 10px;
    border-bottom: 1px solid tomato;
`

const H4 = styled.h4`
margin: 0;
`

const InputDiv = styled.div`

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

const ButtonsDiv = styled.div`

`

export default Map;