import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TwitchStyleChat from '@/components/TwitchStyleChat';


const Home = () => {
  const [stats, setStats] = useState({
    fastestLap: '',
    climate: '',
    humidity: '',
    ranking: []
  });

  useEffect(() => {
    
    const fetchData = () => {
      const data = {
        statistics: {
          fastestLap: ["1:22.345", "1:23.456", "1:24.678", "1:25.890"],
          climate: ["25°C", "27°C", "30°C", "32°C", "20°C"],
          humidity: ["10%", "4%", "6%", "8%", "12%"]
        },
        ranking: ["André", "Matheus", "Caio", "Linard", "Vasquez"]
      };

      setStats({
        fastestLap: getRandomElement(data.statistics.fastestLap),
        climate: getRandomElement(data.statistics.climate),
        humidity: getRandomElement(data.statistics.humidity),
        ranking: shuffleArray(data.ranking)
      });
    };

    
    fetchData();

    
    const interval = setInterval(fetchData, 6000);

    
    return () => clearInterval(interval);
  }, []);

  
  const getRandomElement = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="bg-red-500 text-white min-h-screen flex flex-col">
      <header className="bg-red-700 py-4 px-6">
        <nav>
          <ul className="flex justify-between">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/admin" className="hover:underline">Admin</a></li>
            <li><a href="/admin" className="hover:underline">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className="flex-1 p-4 md:p-6 flex flex-col">
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Bem vindo a nossa Plataforma</h1>
          <p className="text-lg md:text-xl mb-4">Entre no nosso chat!</p>
          <Button variant="secondary" className="bg-white text-red-500 hover:bg-gray-100 mb-6 w-full md:w-auto">
            Start Watching
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-800 rounded-lg shadow-lg aspect-video">
                <video 
                  className="rounded-lg w-full h-full object-cover"
                  controls 
                  src="https://videos.pexels.com/video-files/854514/854514-hd_1280_720_30fps.mp4"
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              <Card className="bg-white text-black rounded-lg shadow-lg">
                <CardHeader className="border-b border-gray-200">
                  <CardTitle className="text-2xl font-bold text-red-500">ESTATÍSTICAS</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row justify-between items-start pt-4">
                  <div className="space-y-2 mb-4 md:mb-0">
                    <p><span className="font-semibold">Volta mais rápida:</span> {stats.fastestLap}</p>
                    <p><span className="font-semibold">Clima:</span> {stats.climate}</p>
                    <p><span className="font-semibold">Umidade:</span> {stats.humidity}</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2 text-red-500">RANKING</h3>
                    <ol className="list-decimal list-inside space-y-1">
                      {stats.ranking.map((name, index) => (
                        <li key={index}>{name}</li>
                      ))}
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-1 flex flex-col">
              <div className="flex-grow">
                <TwitchStyleChat />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-red-700 py-4 px-6 text-center mt-6">
        <p>&copy; 2024 Mahindra Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
