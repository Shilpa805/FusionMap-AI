// Dummy points across India for demo
let nodes = [
  {
    id: '1',
    latitude: 28.6139,
    longitude: 77.2090, // New Delhi
    type: 'OSINT',
    title: 'Social Media Chatter Analysis',
    description: 'High volume of unusual keyword activity detected in local forums.',
    image: 'https://images.unsplash.com/photo-1541888045520-cb961ee452b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: '2',
    latitude: 19.0760,
    longitude: 72.8777, // Mumbai
    type: 'HUMINT',
    title: 'Informant Meeting Report',
    description: 'Local contact details recent supply chain movements at the harbor.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c25141650?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: '3',
    latitude: 13.0827,
    longitude: 80.2707, // Chennai
    type: 'IMINT',
    title: 'Satellite Imagery Analysis',
    description: 'Unidentified logistical buildup spotted near port facilities.',
    image: 'https://images.unsplash.com/photo-1533615967699-e68840eb3519?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: '4',
    latitude: 22.5726,
    longitude: 88.3639, // Kolkata
    type: 'OSINT',
    title: 'Dark Web Artifact',
    description: 'Leaked logistics schedule matching ground observations.',
  },
  {
    id: '5',
    latitude: 12.9716,
    longitude: 77.5946, // Bangalore
    type: 'IMINT',
    title: 'Drone Surveillance Footage',
    description: 'Anomalous vehicles spotted moving towards city outskirts.',
    image: 'https://images.unsplash.com/photo-1563229712-ad9428b8a5fc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: '6',
    latitude: 31.1048,
    longitude: 77.1665, // Shimla
    type: 'HUMINT',
    title: 'Border Patrol Sighting',
    description: 'Movement detected in restricted passage route.',
  }
];

export const DataModel = {
  getAll: () => nodes,
  addPoints: (newPoints) => {
    // Basic validation / format enforcement could be added here
    nodes = [...nodes, ...newPoints];
    return nodes;
  }
};
