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

        if (lowerCaseMessage.includes('oi') || lowerCaseMessage.includes('olá') || lowerCaseMessage.includes('hey') || lowerCaseMessage.includes('bom dia') || lowerCaseMessage.includes('boa tarde') || lowerCaseMessage.includes('boa noite') || lowerCaseMessage.includes('hello')) {
            response = "Olá! Como posso ajudar você hoje? Se tiver alguma dúvida sobre a equipe ou a Fórmula E, estou aqui para ajudar!";
        } 

        else if (lowerCaseMessage.includes('equipe') || lowerCaseMessage.includes('pilotos') || lowerCaseMessage.includes('carro') || lowerCaseMessage.includes('mahindra') || lowerCaseMessage.includes('formula e')) {
            response = "A equipe Mahindra Racing compete na Fórmula E, a principal categoria de corridas de monolugares elétricos. Estamos comprometidos com a inovação e a sustentabilidade, e nossos pilotos são alguns dos melhores do grid.";
        } 

        else if (lowerCaseMessage.includes('piloto') || lowerCaseMessage.includes('quem são os pilotos') || lowerCaseMessage.includes('pilotos atuais')) {
            response = "Atualmente, nossos pilotos são Jake Dennis e Oliver Rowland. Eles trazem suas habilidades excepcionais para a pista e estão sempre prontos para conquistar ótimos resultados!";
        }

        else if (lowerCaseMessage.includes('corridas') || lowerCaseMessage.includes('próxima corrida') || lowerCaseMessage.includes('calendário')) {
            response = "Você pode conferir o calendário completo das corridas da Fórmula E no nosso site oficial. As corridas ocorrem em cidades incríveis ao redor do mundo!";
        }

        else if (lowerCaseMessage.includes('tecnologia') || lowerCaseMessage.includes('carro') || lowerCaseMessage.includes('bateria') || lowerCaseMessage.includes('motor elétrico')) {
            response = "Nossos carros de Fórmula E utilizam tecnologia de ponta, com motores elétricos avançados e baterias de última geração. Estamos constantemente inovando para garantir eficiência e desempenho.";
        }

        else if (lowerCaseMessage.includes('patrocinadores') || lowerCaseMessage.includes('patrocínio') || lowerCaseMessage.includes('parceiros')) {
            response = "Contamos com o apoio de diversos patrocinadores e parceiros renomados que ajudam a impulsionar nossa equipe em cada competição. Juntos, estamos moldando o futuro do automobilismo elétrico.";
        }

        else if (lowerCaseMessage.includes('eventos') || lowerCaseMessage.includes('ações') || lowerCaseMessage.includes('atividades')) {
            response = "Participamos de vários eventos ao longo do ano, incluindo encontros de fãs e lançamentos de carros. Acompanhe nossas redes sociais para saber mais sobre o que está por vir!";
        }

        else if (lowerCaseMessage.includes('história') || lowerCaseMessage.includes('origem') || lowerCaseMessage.includes('fundação')) {
            response = "A Mahindra Racing foi fundada em 2014 e desde então tem sido uma força inovadora na Fórmula E. Estamos comprometidos com a sustentabilidade e a excelência no automobilismo elétrico.";
        }

        else if (lowerCaseMessage.includes('sustentabilidade') || lowerCaseMessage.includes('meio ambiente') || lowerCaseMessage.includes('ecológico')) {
            response = "Estamos profundamente dedicados à sustentabilidade, trabalhando para reduzir nossa pegada de carbono e promover o uso de tecnologia limpa em todas as nossas operações.";
        }

        else if (lowerCaseMessage.includes('github')) {
            response = 'Você pode acessar nosso repositório no GitHub aqui: https://github.com/mahindraracing/web-dev-sprint-2. Sinta-se à vontade para explorar!';
        }

        else if (lowerCaseMessage.includes('suporte') || lowerCaseMessage.includes('problema') || lowerCaseMessage.includes('dificuldade') || lowerCaseMessage.includes('logar')) {
            response = "Se você está enfrentando problemas para logar ou precisa de assistência, entre em contato com nossa equipe de suporte. Estamos aqui para ajudar a resolver qualquer questão rapidamente.";
        }

        else if (lowerCaseMessage.includes('resultados') || lowerCaseMessage.includes('desempenho')) {
            response = "Os resultados das corridas são disponibilizados em nosso site logo após o término de cada evento. Siga-nos nas redes sociais para atualizações em tempo real!";
        }

        else if (lowerCaseMessage.includes('fan club') || lowerCaseMessage.includes('clube de fãs')) {
            response = "Junte-se ao nosso Fan Club! Oferecemos benefícios exclusivos, como acesso a eventos especiais e merchandise. Confira mais informações no nosso site.";
        }

        else if (lowerCaseMessage.includes('redes sociais') || lowerCaseMessage.includes('social media')) {
            response = "Você pode nos seguir no Instagram, Twitter e Facebook para acompanhar as últimas novidades e interagir com a equipe.";
        }

        else if (lowerCaseMessage.includes('vagas') || lowerCaseMessage.includes('trabalho') || lowerCaseMessage.includes('carreira')) {
            response = "Estamos sempre em busca de novos talentos! Visite a seção de carreiras em nosso site para descobrir as oportunidades disponíveis.";
        }

        else if (lowerCaseMessage.includes('entrevistas') || lowerCaseMessage.includes('entrevistas com pilotos')) {
            response = "Após cada corrida, realizamos entrevistas com nossos pilotos. Você pode assistir a todas elas no nosso canal do YouTube!";
        }

        else if (lowerCaseMessage.includes('tecnologia de carros elétricos') || lowerCaseMessage.includes('futuro dos carros elétricos')) {
            response = "Estamos na vanguarda da tecnologia de carros elétricos, desenvolvendo inovações que definirão o futuro do automobilismo sustentável.";
        }

        else if (lowerCaseMessage.includes('dicas') || lowerCaseMessage.includes('sugestões')) {
            response = "Agradecemos seu feedback! Estamos sempre abertos a sugestões e ideias. Por favor, compartilhe suas propostas conosco!";
        }

        else {
            response = "Desculpe, não entendi sua mensagem. Você poderia fornecer mais detalhes ou reformular sua pergunta? Estou aqui para ajudar!";
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