import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ChevronRight, Mail, Phone, MapPin } from 'lucide-react'

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <>
    <header className="bg-red-700 py-4 px-6 shadow-md">
  <div className="flex items-center justify-between max-w-screen-xl mx-auto">
    <a href="/" className="text-white text-2xl font-bold hover:underline">
      <span className="text-red-400">Ma</span>hindra
    </a>
    <nav>
      <ul className="flex space-x-6">
        <li>
          <a href="/" className="text-white hover:text-orange-300 transition-colors duration-300">Home</a>
        </li>
        <li>
          <a href="/admin" className="text-white hover:text-orange-300 transition-colors duration-300">Admin</a>
        </li>
        <li>
          <a href="/contact" className="text-white hover:text-orange-300 transition-colors duration-300">Contact</a>
        </li>
      </ul>
    </nav>
  </div>
</header>
<div className="min-h-screen bg-white text-gray-800 overflow-hidden">
      <div className="absolute z-0">
        <div className="absolute bg-white opacity-20" /> 
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-8 text-center">
            Contact <span className="text-red-600">Mahindra Racing</span>
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">Get in Touch</CardTitle>
                <CardDescription className="text-gray-600">We'd love to hear from you!</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-700">Name</Label>
                    <Input id="name" placeholder="Your Name" className="bg-gray-50 border-gray-300" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-700">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" className="bg-gray-50 border-gray-300" />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-gray-700">Message</Label>
                    <Textarea id="message" placeholder="Your message here..." className="bg-gray-50 border-gray-300" />
                  </div>
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
                    Send Message
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
                {isSubmitted && (
                  <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md animate-fade-in-down">
                    Thank you for your message! We'll get back to you soon.
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="space-y-8">
              <Card className="bg-white border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Mail className="h-6 w-6 text-red-600" />
                    <span className="text-gray-700">contact@mahindraracing.com</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className="h-6 w-6 text-red-600" />
                    <span className="text-gray-700">+44 20 1234 5678</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MapPin className="h-6 w-6 text-red-600" />
                    <span className="text-gray-700">123 Racing Street, London, UK</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200 shadow-lg overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800">Follow Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center space-x-4">
                    {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                      <Button key={social} variant="outline" size="icon" className="bg-white text-black border-gray-300 hover:bg-red-600 hover:text-white transition-colors">
                        <span className="sr-only">{social}</span>
                        <i className={`fab fa-${social} z-10`}></i>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    
  )
}