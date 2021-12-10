import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import logo from "../assets/images/coach.png";
import { sports } from "../helpers/sport";
import axios from "axios";
import { config } from "../config";
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
} from "cloudinary-react";

const API_KEY = config.google_key;
const defaultProps = {
  center: {
    lat: 49.8865792,
    lng: 2.359296,
  },
  zoom: 13,
};

const Search = (props) => {
  const [position, setPosition] = useState(defaultProps.center);
  const [zoom, setZoom] = useState(defaultProps.zoom);
  const [address, setAddress] = useState("");
  const [radius, setRadius] = useState(5);
  const [coachs, setCoachs] = useState([]);
  const [sport, setSport] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    //géolocalisation
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        let coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log(coords);
        setPosition(coords);
      });
    } else {
      /* la géolocalisation n'est pas disponible */
      alert("Error! Your fucking IE don't like my geoposition...");
    }
  }, []);

  //envoi de la recherche du coach
  const onSubmitForm = () => {
    axios
      .get(
        "https://nominatim.openstreetmap.org/search?q=" +
          address +
          "&format=geocodejson"
      )
      .then((res, err) => {
        //si il ne trouve pas d'adresse correspondante
        if (res.data.features.length === 0) {
          setError("Adresse inexistante");
        } else {
          //si on a trouvé une adresse existante, on va récupérer les coordonnées de celle-ci
          let lat = res.data.features[0].geometry.coordinates[1];
          let lng = res.data.features[0].geometry.coordinates[0];
          console.log(lat);
          console.log(lng);

          let coords = {
            lat: lat,
            lng: lng,
          };

          //on calcul les coodonnées min et max dans un rayon autour de l'adresse
          let deg = radius * 0.009;

          let lat_min = lat - deg; // -1.7
          let lat_max = lat + deg; // -1.5
          let long_max = lng + deg / Math.cos(lat * (Math.PI / 180));
          let long_min = lng - deg / Math.cos((lat * Math.PI) / 180);

          console.log("lat_min", lat_min);
          console.log("lat_max", lat_max);
          console.log("long_max", long_max);
          console.log("long_min", long_min);

          let data = {
            min_lat: lat_min,
            max_lat: lat_max,
            min_lng: long_min,
            max_lng: long_max,
            sport: sport,
          };
          axios
            .post(config.api_url + "/api/v1/coach/distance", data)
            .then((response) => {
              console.log(response);
              setCoachs(response.data.result);
              setPosition(coords);
              setZoom(14);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  const createMarkers = () => {
    return coachs.map((coach) => {
      return (
        <div
          className="coachMarker"
          lat={coach.lat}
          lng={coach.lng}
          text="My Marker"
          key={coach.id}
        >
          <Link to={"/detail/" + coach.id}>
            <CloudinaryContext cloudName={config.cloudName}>
              <div>
                <Image publicId={coach.imageUrl}>
                  <Transformation quality="auto" fetchFormat="auto" />
                </Image>
              </div>
            </CloudinaryContext>
            {coach.firstName} {coach.lastName}
          </Link>
        </div>
      );
    });
  };

  return (
    <div>
      <h2>Trouvez un prof</h2>
      <form
        className="c-form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitForm();
        }}
      >
        <input
          type="text"
          placeholder="Tapez un adresse"
          onChange={(e) => {
            setAddress(e.currentTarget.value);
          }}
        />
        <p>Choisissez un sport : </p>
        <select
          onChange={(e) => {
            setSport(e.currentTarget.value);
          }}
        >
          {sports.map((sport, index) => {
            return (
              <option key={index} value={sport}>
                {sport}
              </option>
            );
          })}
        </select>
        <p>Quelle distance (km) : </p>
        <select
          onChange={(e) => {
            setRadius(e.currentTarget.value);
          }}
        >
          {[...Array(20).keys()].map((num, index) => {
            return (
              <option key={index} value={num + 1}>
                {num + 1}
              </option>
            );
          })}
        </select>
        <input type="submit" name="Chercher" />
      </form>

      <div style={{ height: "60vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY }}
          center={position}
          zoom={zoom}
        >
          <div lat={position.lat} lng={position.lng} text="My Marker">
            <img
              src="http://www.robotwoods.com/dev/misc/bluecircle.png"
              alt="marker"
            />
          </div>
          {createMarkers()}
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Search;
