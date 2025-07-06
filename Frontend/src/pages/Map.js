// import React, { useEffect, useRef, useState } from "react";
// import mapboxgl from "mapbox-gl";
// import MapboxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
// import "mapbox-gl/dist/mapbox-gl.css";

// mapboxgl.accessToken =
//   "pk.eyJ1IjoibXJzaGVra2h1MTIzIiwiYSI6ImNtNW14dXhrcTA0cnIybHNjeGt4bm9qdWcifQ.yjirqObv6wntSDtu-dX_yg"; // Replace with your Mapbox token

// const Map = () => {
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const marker = useRef(null);
//   const [address, setAddress] = useState("");
//   const [location,setLocation]=useState({lat:null,lng:null});

//   const getUserLocation = () => {
  
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//         },
//         (error) => {
//           console.error("Error fetching location:", error);
//         }
//       );
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   };

//   useEffect(() => {
//     getUserLocation();
   
//   }, []);

//   // useEffect(()=>{

//   //   fetchAddress(0,0);


//   // },location.lat)




//   useEffect(() => {

  
//     if (!mapContainer.current || map.current || !location.lat) return; // Ensure the container is ready and map is not already initialized

//     map.current = new mapboxgl.Map({
//       container: mapContainer.current, // Pass the valid DOM element
//       // style: "mapbox://styles/mapbox/streets-v11", // Add the style
//       center: [location.lng, location.lat], // Center coordinates [lng, lat]
//       zoom: 12,
//     });
      
//     // Add a draggable marker
//     marker.current = new mapboxgl.Marker({ draggable: true })
//       .setLngLat([location.lng, location.lat])
//       .addTo(map.current);

//     marker.current.on("dragend", () => {
//       const lngLat = marker.current.getLngLat();
//       fetchAddress(lngLat.lng, lngLat.lat);
//     });

//     // Trigger map resize
//     fetchAddress(location.lng, location.lat);
//     map.current.resize();
//   }, [location.lat]);

 

//   const fetchAddress = async (longitude, latitude) => {
//     const geocodingClient = MapboxGeocoding({
//       accessToken: mapboxgl.accessToken,
//     });
// // alert(location.lng);
//     try {
//       const response = await geocodingClient
//         .reverseGeocode({ query: [longitude, latitude] })
//         .send();

//       if (response && response.body.features.length > 0) {
        
//         setAddress(response.body.features[0].place_name);
//         console.log("Map data:", response);
//         localStorage.setItem("UserAddress", response.body.features[0].place_name); // Store the address
//       } else {
//         setAddress("Address not found");
//       }
//     } catch (error) {
//       console.error("Reverse geocoding error:", error);
//       setAddress("Error fetching address");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center bg-gray-100 p-6 w-1/2 h-screen rounded-xl">
//       <div
//         ref={mapContainer}
//         className="w-full h-96 rounded-lg shadow-lg"
//       ></div>
//       <div
//         className="mt-6 p-4 bg-white rounded-lg shadow-md"
//         style={{ width: "80%" }}
//       >
//         <strong>Address:{location.lat}||{location.lng}</strong> {address || "Fetching address..."}
//       </div>
//     </div>
//   );
// };

// export default Map;



import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1IjoibXJzaGVra2h1MTIzIiwiYSI6ImNtNW14dXhrcTA0cnIybHNjeGt4bm9qdWcifQ.yjirqObv6wntSDtu-dX_yg";

const Map = ({ onLocationSelect }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({ lat: null, lng: null });

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);


  useEffect(() => {
  const resizeListener = () => {
    if (map.current) {
      map.current.resize();
    }
  };
  window.addEventListener('resize', resizeListener);
  return () => window.removeEventListener('resize', resizeListener);
}, []);


useEffect(() => {
  if (!map.current || !mapContainer.current) return;

  const resizeObserver = new ResizeObserver(() => {
    map.current.resize();
  });

  resizeObserver.observe(mapContainer.current);

  return () => resizeObserver.disconnect();
}, []);

  useEffect(() => {
    if (!mapContainer.current || map.current || !location.lat) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      center: [location.lng, location.lat],
      zoom: 12,
    });

    marker.current = new mapboxgl.Marker({ draggable: true })
      .setLngLat([location.lng, location.lat])
      .addTo(map.current);

    marker.current.on("dragend", () => {
      const lngLat = marker.current.getLngLat();
      fetchAddress(lngLat.lng, lngLat.lat);
    });

    fetchAddress(location.lng, location.lat);
    map.current.resize();
  }, [location.lat]);

  const fetchAddress = async (longitude, latitude) => {
    const geocodingClient = MapboxGeocoding({ accessToken: mapboxgl.accessToken });

    try {
      const response = await geocodingClient
        .reverseGeocode({ query: [longitude, latitude], types: ['address'] })
        .send();

      if (response && response.body.features.length > 0) {
        const place = response.body.features[0];
        const context = place.context || [];

        const getComponent = (idPrefix) =>
          context.find(c => c.id.startsWith(idPrefix))?.text || '';

        const addressData = {
          fullAddress: place.place_name,
          street: place.text || '',
          city: getComponent("place"),
          state: getComponent("region"),
          pincode: getComponent("postcode"),
          locality: getComponent("neighborhood"),
          latitude,
          longitude,
        };

        setAddress(place.place_name);
        localStorage.setItem("UserAddress", place.place_name);

        if (onLocationSelect) {
          onLocationSelect(addressData);
        }
      } else {
        setAddress("Address not found");
      }
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      setAddress("Error fetching address");
    }
  };

  return (
  <div className="flex flex-col items-center justify-start bg-gray-100 p-4 w-full h-full">

      <div ref={mapContainer}  className="w-full h-full rounded-lg shadow-lg"></div>
      <div className="mt-4 p-4 bg-white rounded-lg shadow-md w-full md:w-[80%] text-sm md:text-base">
        <strong>Address: {location.lat} || {location.lng}</strong><br />
        {address || "Fetching address..."}
      </div>
    </div>
  );
};

export default Map;













