import { Link } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Eye, Users } from 'lucide-react'
import { streams } from '@/data/streams'

export default function Lives() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Live Streams 🏎️</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {streams.map((stream) => (
          <Link to={`/stream/${stream.id}`} key={stream.id} className="no-underline">
            <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
              <CardHeader className="relative p-0">
                <img src={stream.thumbnail} alt={stream.title} className="w-full h-48 object-cover rounded-t-lg" />
                <Badge className="absolute top-2 left-2 bg-red-600">LIVE</Badge>
                <Badge className="absolute top-2 right-2 bg-gray-800 flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {stream.viewers}
                </Badge>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex items-center mb-2">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={stream.streamer.avatar} />
                    <AvatarFallback>{stream.streamer.name[0]}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg font-semibold text-gray-800">{stream.title}</CardTitle>
                </div>
                <p className="text-sm text-gray-600">{stream.streamer.name}</p>
              </CardContent>
              <CardFooter className="text-sm text-gray-500 flex items-center mt-auto">
                <Users className="w-4 h-4 mr-1" />
                {stream.category}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}