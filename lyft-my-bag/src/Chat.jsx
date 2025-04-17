import { useParams } from 'react-router-dom';
import { Navbar } from './Navbar';

export const Chat = () => {
  const { otherUserId } = useParams();

  {trips.map((trip) => (
    <li key={trip._id} className="border rounded-xl shadow p-4 bg-white">
      <h2 className="text-lg font-semibold mb-1">{trip.destinationName}</h2>
      {/* trip details... */}
      
      <button
        onClick={() => window.location.href = `/chat/${trip.user_id}`}
        className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Message
      </button>
    </li>
  ))}
  

  return (
    <div className="p-4">
        <div><Navbar /></div>
      <h2 className="text-2xl font-bold mb-4">Chat with User {otherUserId}</h2>
      {/* Message thread + input here */}
    </div>
  );
};

