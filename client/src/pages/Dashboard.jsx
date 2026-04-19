import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import MapView from '../components/MapView';
import Loader from '../components/Loader';
import { fetchData } from '../services/api';
import { Toaster } from 'react-hot-toast';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flyToCoords, setFlyToCoords] = useState(null);

  const loadData = async () => {
    try {
      const result = await fetchData();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDataUpdated = (result) => {
    loadData();
    if (result && result.newPoints && result.newPoints.length > 0) {
      const pt = result.newPoints[0];
      setFlyToCoords([pt.latitude, pt.longitude]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background text-white font-sans">
      <Navbar />
      
      {loading ? (
        <Loader fullScreen />
      ) : (
        <MapView data={data} flyToCoords={flyToCoords} />
      )}
      
      <Sidebar onDataUpdated={handleDataUpdated} />
      
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#18181b', // zinc-900
            color: '#fff',
            border: '1px solid #3f3f46', // zinc-700
          },
        }} 
      />
    </div>
  );
};

export default Dashboard;
