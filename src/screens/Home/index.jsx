import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TwitchStyleChat from '@/components/TwitchStyleChat';
import { Slider } from "@/components/ui/slider";

const Home = () => {
  return (
    <div className="bg-red-500 text-white min-h-screen flex flex-col">
      <header className="bg-red-700 py-4 px-6">
        <nav>
          <ul className="flex justify-between">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/admin" className="hover:underline">Admin</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className="flex-1 p-4 md:p-6 flex flex-col">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome to the Mahindra Platform</h1>
        <p className="text-lg md:text-xl mb-4">Join in our live chat!</p>
        <Button variant="secondary" className="bg-white text-red-500 hover:bg-gray-100 mb-6 w-full md:w-auto">
          Start Watching
        </Button>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-grow">
            <div className="bg-gray-800 rounded-lg shadow-lg aspect-video flex items-center justify-center mb-6">
              <video 
                className="rounded-lg w-full h-full"
                controls 
                src="https://videos.pexels.com/video-files/854514/854514-hd_1280_720_30fps.mp4"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            <Card className="bg-white text-black rounded-lg shadow-lg mb-6">
              <CardHeader className="border-b border-gray-200">
                <CardTitle className="text-2xl font-bold text-red-500">ESTATÍSTICAS</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row justify-between items-start pt-4">
                <div className="space-y-2 mb-4 md:mb-0">
                  <p><span className="font-semibold">Volta mais rápida:</span> 1:23.456</p>
                  <p><span className="font-semibold">Clima:</span> 27°C</p>
                  <p><span className="font-semibold">Umidade:</span> 4%</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-red-500">RANKING</h3>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>André</li>
                    <li>Matheus</li>
                    <li>Caio</li>
                    <li>Linard</li>
                    <li>Vasquez</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="h-full">
            <TwitchStyleChat />
          </div>
        </div>

        <Card className="bg-white text-black rounded-lg shadow-lg">
              <CardHeader className="border-b border-gray-200">
                <CardTitle className="text-2xl font-bold text-red-500">Volume Control</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
              </CardContent>
            </Card>
      </main>

      <footer className="bg-red-700 py-4 px-6 text-center mt-6">
        <p>&copy; 2023 Your Streaming Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
