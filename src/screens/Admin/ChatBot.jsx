import { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const StreamingChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const simulateStreaming = async (message) => {
    setIsStreaming(true);
    const words = message.split(' ');
    for (let i = 0; i < words.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setMessages(prev => {
        const newMessages = [...prev];
        if (i === 0) {
          newMessages.push({ text: words[i], isUser: false });
        } else {
          newMessages[newMessages.length - 1].text += ' ' + words[i];
        }
        return newMessages;
      });
    }
    setIsStreaming(false);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      setMessages(prev => [...prev, { text: inputMessage, isUser: true }]);
      setInputMessage('');
      
      let response = '';
      const lowerCaseMessage = inputMessage.toLowerCase();
  
      if (lowerCaseMessage.includes('oi') || lowerCaseMessage.includes('olá') || lowerCaseMessage.includes('hey') || lowerCaseMessage.includes('ola') || lowerCaseMessage.includes('bom dia') || lowerCaseMessage.includes('boa tarde') || lowerCaseMessage.includes('boa noite')) {
        response = "Olá! Como posso ajudar você hoje?";
      }
  
      else if (lowerCaseMessage.includes('equipe') || lowerCaseMessage.includes('pilotos') || lowerCaseMessage.includes('carro') || lowerCaseMessage.includes('mahinra') || lowerCaseMessage.includes('formula e')) {
        response = "A equipe Mahindra Racing compete na Fórmula E, a principal categoria de corridas de monolugares elétricos. Nossos pilotos são os melhores no grid e estamos comprometidos com a inovação e o desenvolvimento de tecnologia sustentável.";
      }
  
      else if (lowerCaseMessage.includes('piloto') || lowerCaseMessage.includes('quem são os pilotos') || lowerCaseMessage.includes('pilotos atuais')) {
        response = "Atualmente, nossos pilotos são Jake Dennis e Oliver Rowland. Eles estão competindo com entusiasmo e habilidade para trazer ótimos resultados para a equipe.";
      }
  
      else if (lowerCaseMessage.includes('corridas') || lowerCaseMessage.includes('próxima corrida') || lowerCaseMessage.includes('calendário')) {
        response = "Você pode conferir o calendário completo das corridas da Fórmula E no nosso site oficial. As corridas são realizadas em circuitos urbanos em cidades ao redor do mundo.";
      }
  
      else if (lowerCaseMessage.includes('tecnologia') || lowerCaseMessage.includes('carro') || lowerCaseMessage.includes('bateria') || lowerCaseMessage.includes('motor elétrico')) {
        response = "Nossos carros de Fórmula E são equipados com motores elétricos avançados e baterias de última geração. Estamos constantemente inovando para melhorar a eficiência e o desempenho dos nossos veículos.";
      }
  
      else if (lowerCaseMessage.includes('patrocinadores') || lowerCaseMessage.includes('patrocínio') || lowerCaseMessage.includes('parceiros')) {
        response = "A Mahindra Racing conta com o apoio de diversos patrocinadores e parceiros, incluindo grandes marcas do setor de tecnologia e automotivo. Eles ajudam a tornar nossas competições possíveis e bem-sucedidas.";
      }

      else if (lowerCaseMessage.includes('eventos') || lowerCaseMessage.includes('ações') || lowerCaseMessage.includes('atividades')) {
        response = "Participamos de vários eventos e ações ao longo do ano, incluindo eventos de fãs, lançamentos de carros e sessões de autógrafos. Fique atento às nossas redes sociais para mais informações sobre eventos futuros.";
      }
  
      else if (lowerCaseMessage.includes('história') || lowerCaseMessage.includes('origem') || lowerCaseMessage.includes('fundação')) {
        response = "A Mahindra Racing foi fundada em 2014 e desde então tem sido uma força importante na Fórmula E. Estamos comprometidos com a sustentabilidade e a inovação no automobilismo elétrico.";
      }

      else if (lowerCaseMessage.includes('sustentabilidade') || lowerCaseMessage.includes('meio ambiente') || lowerCaseMessage.includes('ecológico')) {
        response = "A Mahindra Racing está dedicada à sustentabilidade. Trabalhamos para reduzir nossa pegada de carbono e promovemos o uso de tecnologia limpa e eficiente em todos os aspectos das nossas operações.";
      }

      else if (lowerCaseMessage.includes('github')) {
        response = 'O nosso repositório do Github é esse: https://github.com/mahindraracing/web-dev-sprint-2';
      }

      else if (lowerCaseMessage.includes('problema') || lowerCaseMessage.includes('problemas') || lowerCaseMessage.includes('logar')) {
        response = "Está tendo problemas para logar? Contate o suporte para ver o seu Login de admin.";
      }
  
      else {
        response = "Desculpe, não entendi sua mensagem. Você pode fornecer mais detalhes ou reformular sua pergunta?";
      }

      simulateStreaming(response);
    }
  };

  return (
    <div className="w-full max-w-md bg-white-800 border-red-600 border-2 rounded-lg overflow-hidden mt-4">
      <ScrollArea className="h-64 p-4" ref={scrollAreaRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.isUser ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${msg.isUser ? 'bg-red-600 text-white' : 'bg-gray-400 text-white'}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </ScrollArea>
      <div className="p-4 border-t border-white-700">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-grow bg-white-700 text-gray-700 border-gray-600 focus:border-red-600"
          />
          <Button
            onClick={handleSendMessage}
            disabled={isStreaming}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StreamingChat;