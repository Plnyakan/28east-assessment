interface DirectionsPanelProps {
  directions: google.maps.DirectionsResult
}

export default function DirectionsPanel({ directions }: DirectionsPanelProps) {
  const route = directions.routes[0]
  const legs = route.legs[0]

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mt-4">
      <h2 className="text-xl font-semibold mb-2">Directions</h2>
      <p className="font-bold">From: {legs.start_address}</p>
      <p className="font-bold mb-2">To: {legs.end_address}</p>
      <p className="text-lg font-semibold">Distance: {legs.distance?.text}</p>
      <p className="text-lg font-semibold mb-4">Duration: {legs.duration?.text}</p>
      <h3 className="text-lg font-semibold mb-2">Steps:</h3>
      <ol className="list-decimal list-inside">
        {legs.steps.map((step, index) => (
          <li key={index} className="mb-2">
            <span dangerouslySetInnerHTML={{ __html: step.instructions }} />
            <span className="text-sm text-gray-600 dark:text-gray-400"> ({step.distance?.text})</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

