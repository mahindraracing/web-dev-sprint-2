import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, ChevronLeft, ChevronRight, Calendar, Users, Car, Trophy, Mail, Zap, CircleHelp } from 'lucide-react';
import { AccordionSustentability } from '@/components/FaqSustentability';
import { AccordionHistory } from '@/components/FaqHistory';
import { Youtube } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const drivers = [
  { name: "Nyck De Vries", image: "https://www.gpemcasa.com.br/newsimg/3d7b08671f43ff64954ecc5248d5df2d.webp", number: 21 },
  { name: "Edoardo Mortara", image: "/edoardo.png", number: 48 },
];

const races = [
  { name: "Berlin E-Prix", date: "2023-05-14", location: "Berlin, Germany" },
  { name: "Jakarta E-Prix", date: "2023-06-04", location: "Jakarta, Indonesia" },
  { name: "Portland E-Prix", date: "2023-06-24", location: "Portland, USA" },
  { name: "Rome E-Prix", date: "2023-07-15", location: "Rome, Italy" },
  { name: "London E-Prix", date: "2023-07-29", location: "London, UK" },
  { name: "New York City E-Prix", date: "2023-08-13", location: "New York, USA" }, 
];


const carViews = [
  { name: "Front", image: "https://resources.formula-e.pulselive.com/photo-resources/2023/02/11/bf21a320-374d-4f49-a748-a29d5ccb91de/Mahindra-Hyderabad-on-track.jpg?width=1440&height=810" },
  { name: "Side", image: "https://resources.formula-e.pulselive.com/photo-resources/2023/12/12/1db5e5a8-79de-4c4e-9464-858ae488412f/LJP-Mahindra-S10-Livery-Launch-10-3-.jpg?width=1440&height=810" },
  { name: "Top", image: "https://cdn-7.motorsport.com/images/amp/254gVKE0/s6/lucas-di-grassi-mahindra-racin.jpg" },
];

function HomePage() {
  const [currentCarView, setCurrentCarView] = useState(0);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <img src="/mahindra.png" alt="Mahindra Racing Logo" className="w-20 h-20 mr-4" />
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Mahindra Racing</h1>
              <p className="text-lg sm:text-xl text-red-600">Powering the future of electric racing</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <Link to="/register">
              <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                <Users className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </Link>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Zap className="mr-2 h-4 w-4" />
              Join Now
            </Button>
          </div>
        </header>

        <main>
          
          <motion.section className="mb-12" initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.5 }}>
            <Card className="overflow-hidden">
              <CardContent className="p-0 relative">
                <img 
                  src="https://cdn-9.motorsport.com/images/amp/6n9EZ8gY/s6/mahindra-gen3-1.jpg" 
                  alt="Mahindra Racing car in action" 
                  className="w-full h-[300px] sm:h-[400px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Next Race: Berlin E-Prix</h2>
                  <p className="text-sm sm:text-base text-white mb-4">Join us for an electrifying race through the streets of Berlin!</p>
                  <Link to="/stream">
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      <Play className="mr-2 h-4 w-4" /> Watch Live
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          <motion.section className="mb-12" initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl text-gray-900 flex items-center">
                  <Calendar className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                  Race Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {races.map((race, index) => (
                    <motion.div key={index} initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.5, delay: index * 0.1 }}>
                      <Card className="bg-gray-50">
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-base sm:text-lg">{race.name}</h3>
                          <p className="text-xs sm:text-sm text-gray-600 flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-red-600" />
                            {race.date}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600 flex items-center">
                            <Trophy className="mr-2 h-4 w-4 text-red-600" />
                            {race.location}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.section>

          <motion.section className="mb-12" initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl text-gray-900 flex items-center">
                  <Users className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                  Our Drivers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {drivers.map((driver, index) => (
                    <motion.div key={index} initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.5, delay: index * 0.1 }} className="flex items-center space-x-4">
                      <img src={driver.image} alt={driver.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover" />
                      <div>
                        <h3 className="font-semibold text-base sm:text-lg">{driver.name}</h3>
                        <p className="text-red-600 font-bold flex items-center">
                          <Car className="mr-2 h-4 w-4" />
                          #{driver.number}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.section>

          <motion.section className="mb-12" initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl text-gray-900 flex items-center">
                  <Car className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                  Our Car: M9Electro
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <img 
                    src={carViews[currentCarView].image}
                    alt={`M9Electro ${carViews[currentCarView].name} View`} 
                    className="w-full h-[300px] sm:h-[400px] object-cover rounded-lg"
                  />
                  <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2">
                    <Button 
                      variant="outline" 
                      className="bg-white/80 hover:bg-white"
                      onClick={() => setCurrentCarView((prev) => (prev - 1 + carViews.length) % carViews.length)}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button 
                      variant="outline" 
                      className="bg-white/80 hover:bg-white"
                      onClick={() => setCurrentCarView((prev) => (prev + 1) % carViews.length)}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
                <div className="mt-4 flex justify-center flex-wrap">
                  {carViews.map((view, index) => (
                    <Button
                      key={view.name}
                      variant={currentCarView === index ? "default" : "outline"}
                      className={`mx-1 ${currentCarView === index ? 'bg-red-600 text-white' : 'text-red-600 border-red-600'}`}
                      onClick={() => setCurrentCarView(index)}
                    >
                      {view.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.section>

          <motion.section className="mb-12" initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl text-gray-900 flex items-center">
                  <CircleHelp className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-red-600"/>
                  FAQ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overall" className="w-full">
                  <TabsList>
                    <TabsTrigger value="overall">Overall</TabsTrigger>
                    <TabsTrigger value="sector1">Sustentability</TabsTrigger>
                    <TabsTrigger value="sector2">History</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overall">
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <p className="text-center text-lg font-semibold"><AccordionDemo/></p>
                    </div>
                  </TabsContent>
                  <TabsContent value="sector1">
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <p className="text-center text-lg font-semibold"><AccordionSustentability/></p>
                    </div>
                  </TabsContent>
                  <TabsContent value="sector2">
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <p className="text-center text-lg font-semibold"><AccordionHistory/></p>
                    </div>
                  </TabsContent>
                  <TabsContent value="sector3">
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <p className="text-center text-lg font-semibold">Live timing data for Sector 3</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.section>

          <motion.section className="mb-12" initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl text-gray-900 flex items-center">
                  <Play className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                  Mahindra Racing TV
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                  <iframe width="100%" height="100%" src="https://www.youtube.com/embed/Kc1-Hlxncrs?si=LjupT3-eeIuVkToi" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  <Play className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">Live: Pre-Race Analysis</h3>
                <p className="mb-4 text-gray-600">Our experts break down the strategies for today&apos;s race.</p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Play className="mr-2 h-4 w-4" /> <a href="https://www.youtube.com/watch?v=Kc1-Hlxncrs">Watch Video</a>
                  </Button>
                  <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                    <Youtube className="mr-2 h-4 w-4" /> <a href="https://www.youtube.com/@mahindraracing">YouTube Channel</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          <motion.section className="mb-12" initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl text-gray-900 flex items-center">
                  <Mail className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                  Stay Updated
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-600">Subscribe to our newsletter for the latest Mahindra Racing news and exclusive content.</p>
                <form className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-grow"
                  />
                  <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
                    <Mail className="mr-2 h-4 w-4" />
                    Subscribe
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.section>
        </main>

        <footer className="py-8 text-center text-gray-600">
          <p>&copy; 2024 Mahindra Racing. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Mahindra Racing?</AccordionTrigger>
        <AccordionContent>
        Mahindra Racing is the motorsport division of Mahindra Group, focusing on electric racing to promote sustainability and innovation.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What series does Mahindra Racing participate in?</AccordionTrigger>
        <AccordionContent>
          Mahindra Racing competes in the FIA Formula E Championship, a global series for fully electric single-seater cars.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Where can I watch Mahindra Racing events?</AccordionTrigger>
        <AccordionContent>
        Mahindra Racing events can be watched on various sports networks, streaming platforms, and the official Formula E website.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

