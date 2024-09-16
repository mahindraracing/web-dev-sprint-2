import { useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Eye, Users } from 'lucide-react'
import { streams } from '@/data/streams'

export default function StreamPage() {
    const { id } = useParams()
    const stream = streams.find(s => s.id === id)
  
    if (!stream) {
      return <div className="container mx-auto py-8 px-4">Stream not found</div>
    }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mb-8 overflow-hidden">
        <CardHeader className="relative p-0">
          <img src={stream.thumbnail} alt={stream.title} className="w-full h-[480px] object-cover" />
          <Badge className="absolute top-4 left-4 bg-red-600 text-lg py-1 px-3">LIVE</Badge>
          <Badge className="absolute top-4 right-4 bg-gray-800 text-lg py-1 px-3 flex items-center">
            <Eye className="w-5 h-5 mr-2" />
            {stream.viewers}
          </Badge>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex items-center mb-4">
            <Avatar className="h-12 w-12 mr-4">
              <AvatarImage src={stream.streamer.avatar} />
              <AvatarFallback>{stream.streamer.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800 mb-1">{stream.title}</CardTitle>
              <p className="text-lg text-gray-600">{stream.streamer.name}</p>
            </div>
          </div>
          <div className="flex items-center text-gray-500 mb-6">
            <Users className="w-5 h-5 mr-2" />
            <span className="mr-4">{stream.category}</span>
            <Eye className="w-5 h-5 mr-2" />
            <span>{stream.viewers} viewers</span>
          </div>
          <p className="text-gray-700">{stream.description}</p>
        </CardContent>
      </Card>
    </div>
  )
}