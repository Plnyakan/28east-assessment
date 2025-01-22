# Interactive Map Explorer

An interactive web application that allows users to explore maps, search for locations, get directions, and view real-time traffic information.

## Author

Pleasure Nyakane

## Features

- Interactive Google Map
- Address search with autocomplete
- Directions from user's location to searched destination
- Real-time traffic information toggle
- Dark mode support

## Inspiration

The creative features of this project were inspired by the 28East Pty Ltd website, specifically their "Maps to Optimise Deliveries" Transport & Logistics: Last Mile Delivery Solution. Google Maps Platform has been a popular choice for businesses seeking to leverage real-time location data, traffic information, and optimized routing algorithms to streamline their operations, whether for on-demand rides or last-mile deliveries. By integrating Google Maps APIs and SDKs into their applications, businesses can create feature-rich solutions for their fleet operations.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm or yarn
- A Google Maps API key with the following APIs enabled:
  - Maps JavaScript API
  - Places API
  - Directions API

## Installation

1. Clone the repository:
   \`\`\`
   git clone https://github.com/Plnyakan/28east-assessment.git
   cd 28east-assessment
   \`\`\`

2. Install the dependencies:
   \`\`\`
   npm install
   \`\`\`
   or
   \`\`\`
   yarn install
   \`\`\`

3. Create a \`.env.local\` file in the root directory and add your Google Maps API key:
   \`\`\`
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
   \`\`\`

## Running the Application

To run the application in development mode:

\`\`\`
npm run dev
\`\`\`
or
\`\`\`
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Usage

1. Upon loading the application, you'll see a map centered on a default location.
2. Use the search bar to look for a specific location.
3. Click on the map to set a destination, or use the search results.
4. The application will display directions from your current location (if available) to the selected destination.
5. Use the "Show Traffic" button to toggle real-time traffic information on the map.
6. The theme toggle in the header allows you to switch between light and dark modes.

## Contributing

Contributions to the Interactive Map Explorer are welcome. Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

