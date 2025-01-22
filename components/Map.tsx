import { useState, useCallback, useEffect } from "react"
import { GoogleMap, Marker, DirectionsRenderer, TrafficLayer } from "@react-google-maps/api"
import { Button } from "@/components/ui/button"

interface MapProps {
  selectedLocation: google.maps.LatLngLiteral | null
  onMapClick: (location: google.maps.LatLngLiteral) => void
  directions: google.maps.DirectionsResult | null
}

const mapContainerStyle = {
  width: "100%",
  height: "100%",
}

const center = {
  lat: 40.7128,
  lng: -74.006,
}



export default function Map({ selectedLocation, onMapClick, directions }: MapProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showTraffic, setShowTraffic] = useState(false)

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        () => {
          console.error("Error: The Geolocation service failed.")
        },
      )
    } else {
      console.error("Error: Your browser doesn't support geolocation.")
    }


  }, [])

  const toggleTraffic = () => {
    setShowTraffic(!showTraffic)
  }

  return (
    <div className="relative w-full h-full">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={selectedLocation || userLocation || center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={(e) => e.latLng && onMapClick({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
      >
        {userLocation && (
          <Marker position={userLocation} icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png" />
        )}
        {selectedLocation && <Marker position={selectedLocation} />}
        {directions && <DirectionsRenderer directions={directions} />}
        {showTraffic && <TrafficLayer />}
      </GoogleMap>
      <Button
        onClick={toggleTraffic}
        className="absolute top-4 right-4 z-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      >
        {showTraffic ? "Hide Traffic" : "Show Traffic"}
      </Button>
    </div>
  )
}

