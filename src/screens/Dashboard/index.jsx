import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer 
} from 'recharts';
import { 
  Car, 
  Flag, 
  Battery,  
  Award, 
  Users, 
  Calendar, 
  MapPin,
  CircleGauge
} from 'lucide-react';
import { Link } from "react-router-dom";

const raceData = [
  { name: 'Race 1', points: 18 },
  { name: 'Race 2', points: 25 },
  { name: 'Race 3', points: 15 },
  { name: 'Race 4', points: 22 },
  { name: 'Race 5', points: 20 },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
     
      <header className="bg-red-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Formula E Dashboard</h1>
          <Button variant="outline" className="text-black border-white hover:bg-red-700 ">
            <Link to="/">Logout</Link>
          </Button>
        </div>
      </header>

    
      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    
          <Card className="bg-white shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Races</CardTitle>
              <Flag className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-gray-500">+2 from last season</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Championship Position</CardTitle>
              <Award className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3rd</div>
              <p className="text-xs text-gray-500">Top 3 finish</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Points</CardTitle>
              <CircleGauge className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">186</div>
              <p className="text-xs text-gray-500">+24 from last race</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fastest Lap</CardTitle>
              <Car className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1:07.012</div>
              <p className="text-xs text-gray-500">New track record</p>
            </CardContent>
          </Card>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle>Race Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={raceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="points" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

        
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle>Car Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Battery Health</span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2 bg-gray-200" indicatorClassName="bg-green-500" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Motor Efficiency</span>
                    <span className="text-sm font-medium">88%</span>
                  </div>
                  <Progress value={88} className="h-2 bg-gray-200" indicatorClassName="bg-blue-500" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Tire Wear</span>
                    <span className="text-sm font-medium">35%</span>
                  </div>
                  <Progress value={35} className="h-2 bg-gray-200" indicatorClassName="bg-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle>Upcoming Races</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <div className="space-y-4">
                  {[
                    { city: "Berlin", date: "December 15, 2024", track: "Tempelhof Airport Street Circuit" },
                    { city: "London", date: "September 26, 2024", track: "ExCeL London" },
                    { city: "New York", date: "December 16, 2024", track: "Brooklyn Street Circuit" },
                    { city: "Seoul", date: "October 2, 2024", track: "Seoul Street Circuit" },
                  ].map((race, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <MapPin className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium">{race.city}</p>
                        <p className="text-sm text-gray-500">{race.date}</p>
                        <p className="text-xs text-gray-400">{race.track}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

        
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle>Team Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Users className="h-6 w-6 text-red-600" />
                  <div>
                    <p className="font-medium">Team Members</p>
                    <p className="text-sm text-gray-500">32 personnel</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Car className="h-6 w-6 text-red-600" />
                  <div>
                    <p className="font-medium">Car Model</p>
                    <p className="text-sm text-gray-500">FE23-X Prototype</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Battery className="h-6 w-6 text-red-600" />
                  <div>
                    <p className="font-medium">Battery Supplier</p>
                    <p className="text-sm text-gray-500">EnergyTech Solutions</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Calendar className="h-6 w-6 text-red-600" />
                  <div>
                    <p className="font-medium">Next Team Meeting</p>
                    <p className="text-sm text-gray-500">June 10, 2023 - 09:00 AM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;