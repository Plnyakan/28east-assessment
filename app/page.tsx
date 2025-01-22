"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { LoadScript } from "@react-google-maps/api"
import ThemeToggle from "../components/ThemeToggle"

const Map = dynamic(() => import("../components/Map"), { ssr: false })
const SearchBar = dynamic(() => import("../components/SearchBar"), { ssr: false })
const DirectionsPanel = dynamic(() => import("../components/DirectionsPanel"), { ssr: false })

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<google.maps.LatLngLiteral | null>(null)
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null)

  const handleLocationSelect = async (location: google.maps.LatLngLiteral) => {
    setSelectedLocation(location)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const origin = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
          const destination = new google.maps.LatLng(location.lat, location.lng)
          const directionsService = new google.maps.DirectionsService()
          directionsService.route(
            {
              origin: origin,
              destination: destination,
              travelMode: google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                setDirections(result)
              } else {
                console.error(`error fetching directions ${result}`)
              }
            },
          )
        },
        () => {
          console.error("Error: The Geolocation service failed.")
        },
      )
    } else {
      console.error("Error: Your browser doesn't support geolocation.")
    }
  }

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!} libraries={["places"]}>
      <div className="flex flex-col h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <header className="bg-blue-600 dark:bg-blue-800 text-white p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Interactive Map Explorer</h1>
          <ThemeToggle />
        </header>
        <main className="flex-grow flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 p-4 bg-gray-100 dark:bg-gray-800">
            <SearchBar onPlaceSelect={handleLocationSelect} />
            {directions && <DirectionsPanel directions={directions} />}
          </div>
          <div className="w-full md:w-2/3">
            <Map selectedLocation={selectedLocation} onMapClick={handleLocationSelect} directions={directions} />
          </div>
        </main>
      </div>
    </LoadScript>
  )
}

