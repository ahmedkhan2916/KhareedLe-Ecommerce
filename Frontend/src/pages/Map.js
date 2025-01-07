import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

// Fix marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const LocationPicker = ({ onLocationChange, onAddressChange }) => {
  const [position, setPosition] = useState([28.7041, 77.1025]); // Default to Delhi

  // Fetch address using Nominatim Reverse Geocoding
  const fetchAddress = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const address = response.data?.display_name || "Address not found";
      onAddressChange(address); // Pass the address to the parent component
    } catch (error) {
      console.error("Error fetching address:", error);
      onAddressChange("Error fetching address");
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        onLocationChange({ lat, lng });
        fetchAddress(lat, lng);
      },
    });
    return position ? <Marker position={position} draggable /> : null;
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        onLocationChange({ lat: latitude, lng: longitude });
        fetchAddress(latitude, longitude);
      },
      (err) => {
        console.error("Geolocation Error:", err.message);
      }
    );
  }, []);

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "400px", width: "100%", borderRadius: "10px", overflow: "hidden" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker />
    </MapContainer>
  );
};

const Map = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [address, setAddress] = useState("");

  const handleLocationChange = (coords) => {
    setLocation(coords);
    console.log("Location Updated:", coords);
  };

  const handleAddressChange = (addr) => {
    setAddress(addr);
    console.log("Address Updated:", addr);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "10px", color: "#4CAF50" }}>Pick Your Location</h2>
      <LocationPicker
        onLocationChange={handleLocationChange}
        onAddressChange={handleAddressChange}
      />
      <div style={{ marginTop: "20px" }}>
        <p>
          <strong>Latitude:</strong> {location.lat}
        </p>
        <p>
          <strong>Longitude:</strong> {location.lng}
        </p>
        <p>
          <strong>Address:</strong> {address}
        </p>
      </div>
    </div>
  );
};

export default Map;
