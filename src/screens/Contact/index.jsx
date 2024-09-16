import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChevronRight, Mail, Phone, MapPin } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext'; 

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { theme } = useTheme(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'} overflow-hidden`}>
      <div className="absolute z-0">
        <div className={`absolute ${theme === 'dark' ? 'bg-gray-800 opacity-20' : 'bg-white opacity-20'}`} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-5xl font-bold mb-8 text-center ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
            Contact <span className="text-red-600">Mahindra Racing</span>
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className={`bg-${theme === 'dark' ? 'gray-800' : 'white'} border-${theme === 'dark' ? 'gray-700' : 'gray-200'} shadow-lg`}>
              <CardHeader>
                <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>Get in Touch</CardTitle>
                <CardDescription className={`text-${theme === 'dark' ? 'gray-400' : 'gray-600'}`}>We&apos;d love to hear from you!</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className={`text-${theme === 'dark' ? 'gray-300' : 'gray-700'}`}>Name</Label>
                    <Input id="name" placeholder="Your Name" className={`bg-${theme === 'dark' ? 'gray-700' : 'gray-50'} border-${theme === 'dark' ? 'gray-600' : 'gray-300'}`} />
                  </div>
                  <div>
                    <Label htmlFor="email" className={`text-${theme === 'dark' ? 'gray-300' : 'gray-700'}`}>Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" className={`bg-${theme === 'dark' ? 'gray-700' : 'gray-50'} border-${theme === 'dark' ? 'gray-600' : 'gray-300'}`} />
                  </div>
                  <div>
                    <Label htmlFor="message" className={`text-${theme === 'dark' ? 'gray-300' : 'gray-700'}`}>Message</Label>
                    <Textarea id="message" placeholder="Your message here..." className={`bg-${theme === 'dark' ? 'gray-700' : 'gray-50'} border-${theme === 'dark' ? 'gray-600' : 'gray-300'}`} />
                  </div>
                  <Button type="submit" className={`w-full bg-red-600 hover:bg-red-700 text-white`}>
                    Send Message
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
                {isSubmitted && (
                  <div className={`mt-4 p-4 ${theme === 'dark' ? 'bg-green-800 text-green-100' : 'bg-green-100 text-green-800'} rounded-md animate-fade-in-down`}>
                    Thank you for your message! We&apos;ll get back to you soon.
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="space-y-8">
              <Card className={`bg-${theme === 'dark' ? 'gray-800' : 'white'} border-${theme === 'dark' ? 'gray-700' : 'gray-200'} shadow-lg`}>
                <CardHeader>
                  <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Mail className={`h-6 w-6 ${theme === 'dark' ? 'text-red-500' : 'text-red-600'}`} />
                    <span className={`text-${theme === 'dark' ? 'gray-300' : 'gray-700'}`}>contact@mahindraracing.com</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className={`h-6 w-6 ${theme === 'dark' ? 'text-red-500' : 'text-red-600'}`} />
                    <span className={`text-${theme === 'dark' ? 'gray-300' : 'gray-700'}`}>+44 20 1234 5678</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MapPin className={`h-6 w-6 ${theme === 'dark' ? 'text-red-500' : 'text-red-600'}`} />
                    <span className={`text-${theme === 'dark' ? 'gray-300' : 'gray-700'}`}>123 Racing Street, London, UK</span>
                  </div>
                </CardContent>
              </Card>

              <Card className={`bg-${theme === 'dark' ? 'gray-800' : 'white'} border-${theme === 'dark' ? 'gray-700' : 'gray-200'} shadow-lg overflow-hidden`}>
                <CardHeader>
                  <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>Follow Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center space-x-4">
                    {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                      <Button key={social} variant="outline" size="icon" className={`bg-${theme === 'dark' ? 'gray-700' : 'white'} text-${theme === 'dark' ? 'gray-100' : 'black'} border-${theme === 'dark' ? 'gray-600' : 'gray-300'} hover:bg-red-600 hover:text-white transition-colors`}>
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
  );
}
