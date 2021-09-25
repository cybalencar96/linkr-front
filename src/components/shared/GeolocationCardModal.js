import React from "react"
import { Map, Marker } from "pigeon-maps"
import styled from "styled-components";
import { IoCloseOutline } from "react-icons/io5";

export default function MapView({username, geolocation, showMap, setShowMap}) {

  function nameSolve (username) {

    return "";
  }

  console.log(username.split(' '))

  return (
    <BackgroundMapScreen>
        <MapFrame>
            <HeaderMap>
                <h3>{username.split(' ')[0].length > 10 ? username.substring(0, 9, 10) : username.split(' ')[0]}</h3>
                <h3>'s location</h3>
                <CloseIcon onClick={() => setShowMap(!showMap)} />
            </HeaderMap>
            <MapDiv>
                <Map height="100%" defaultCenter={[Number(geolocation.latitude), Number(geolocation.longitude)]} defaultZoom={13}>
                    <Marker width={30} color='red' anchor={[Number(geolocation.latitude), Number(geolocation.longitude)]} />
                </Map>
            </MapDiv>
        </MapFrame>
    </BackgroundMapScreen>
  )
}

const HeaderMap = styled.div`
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  font-size: 38px;
  display: flex;
  height: 56px;
  width: 90%;
  margin: 10px auto;
  align-items: center;
  white-space: nowrap;
  
  & h3 {
    overflow: hidden;
    text-overflow: ellipsis;
    height: 45px;
  }

  @media (max-width: 996px) {
    font-size: 20px;
    
    & h3 {
    height: auto;
  }
  }
`;
const BackgroundMapScreen = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1;
`;

const MapFrame = styled.div`
  width: 790px;
  height: 354px;
  background-color: #333333;
  border-radius: 50px;
  margin-top: 30vh;
  position: relative;
  margin: 26vh auto 0 auto;
  p {
    font-size: 38px;
    color: #FFFFFF;
    font-family: 'Oswald', sans-serif;
    width: 275px;
    height: 56px;
    margin: 10px 0 20px 40px;
    padding-top: 20px;
  }

  @media (max-width: 996px) {
    width: 100vw;
    border-radius: 0px;
  }
`;

const MapDiv = styled.div`
  width: 713px;
  height: 240px;
  margin: 0 auto 0 auto;

  @media (max-width: 996px) {
    width: 89vw;
  }
`;

const CloseIcon = styled(IoCloseOutline)`
  position: absolute;
  left: calc(100% - 70px);
  height: 40px;
  width: 40px;
  @media (max-width: 996px) {
    width: 25px;
    height: 25px;
    left: calc(100% - 35px);
  }
`;