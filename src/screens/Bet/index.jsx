import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trophy, Megaphone, Wallet } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const carImages = {
    mahindra: '/mahindra.png',
    porsche: 'https://bandalheira.cdn.magazord.com.br/img/2022/05/produto/6758/plc-0507-placa-decorativa-porsche-logo-2.jpg?ims=fit-in/1200x1200',
    mercedes: 'https://www.fage.com.br/fx-files/images/small/plgProducts-3kyhoamosp.jpg',
};

const teams = [
    { name: 'Mahindra Racing', id: 'mahindra' },
    { name: 'Porsche', id: 'porsche' },
    { name: 'Mercedes', id: 'mercedes' },
];

const odds = {
    mahindra: 2.5,
    porsche: 3.0,
    mercedes: 4.0,
};

const BetPage = () => {
    const [selectedTeam, setSelectedTeam] = useState('');
    const [amount, setAmount] = useState('');
    const [bets, setBets] = useState([]);
    const [preview, setPreview] = useState('');
    const [balance, setBalance] = useState(100); 
    const [topUpAmount, setTopUpAmount] = useState(''); 
    const [errorMessage, setErrorMessage] = useState('');
    const [minesBet, setMinesBet] = useState('');
    const [minesResult, setMinesResult] = useState(null);

    const handleBet = (e) => {
        e.preventDefault();
        const betAmount = parseFloat(amount);
        if (selectedTeam && betAmount) {
            if (betAmount > balance) {
                setErrorMessage('Insufficient balance to place the bet.'); 
            } else {
                const payout = (betAmount * odds[selectedTeam]).toFixed(2);
                setBets([...bets, { team: selectedTeam, amount: betAmount, payout, image: carImages[selectedTeam] }]);
                setBalance(balance - betAmount); 
                setSelectedTeam('');
                setAmount('');
                setErrorMessage(''); 
            }
        }
    };

    const handleTopUp = (e) => {
        e.preventDefault();
        const topUp = parseFloat(topUpAmount);
        if (topUp > 0) {
            setBalance(balance + topUp); 
            setTopUpAmount(''); 
        }
    };

    const handleMinesBet = (e) => {
        e.preventDefault();
        const betAmount = parseFloat(minesBet);
        if (betAmount && betAmount <= balance) {
            const success = Math.random() > 0.4; // 40% de chance pra ganhar 
            const payout = success ? (betAmount * 2).toFixed(2) : 0;
            setMinesResult(success ? `You won! Payout: $${payout}` : "You lost!");
            setBalance(balance - betAmount);
            setMinesBet('');
        } else {
            setMinesResult("Invalid bet amount or insufficient balance.");
        }
    };

    return (
        <>
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-white p-4 sm:p-6">
            <main className="relative w-full max-w-3xl p-4 sm:p-6 mt-8 space-y-8 z-10">

            <Tabs defaultValue="wallet" className="max-w-[800px]">
                <TabsList>
                    <TabsTrigger value="wallet">Wallet</TabsTrigger>
                    <TabsTrigger value="bet">Bet</TabsTrigger>
                    <TabsTrigger value="mines">Mines Game</TabsTrigger> 
                </TabsList>
                
                <TabsContent value="wallet">
                    <motion.section 
                        className="space-y-6 mb-12"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card className="p-4 sm:p-6 bg-white shadow-lg rounded-xl">
                            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 flex items-center">
                                <Wallet className="mr-2 text-green-500" /> Wallet
                            </h2>
                            <p className="text-gray-700 text-sm sm:text-base">
                                Current Balance: ${balance.toFixed(2)}
                            </p>
                            <form onSubmit={handleTopUp} className="space-y-4 mt-4">
                                <Input
                                    type="number"
                                    value={topUpAmount}
                                    onChange={(e) => setTopUpAmount(e.target.value)}
                                    placeholder="Enter amount to add"
                                    className="border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                                />
                                <Button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300">
                                    Add to Wallet
                                </Button>

                                {errorMessage && (
                                    <motion.section 
                                        className="space-y-6 mb-12"
                                        initial={{ opacity: 0, y: -30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <Card className="p-4 sm:p-6 bg-red-100 border border-red-300 rounded-xl">
                                            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-red-800">Error</h2>
                                            <p className="text-red-700 text-sm sm:text-base">{errorMessage}</p>
                                        </Card>
                                    </motion.section>
                                )}

                                <motion.section 
                                    className="space-y-6 mb-12"
                                    initial={{ opacity: 0, y: -30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <Card className="p-4 sm:p-6 bg-white shadow-lg rounded-xl">
                                        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 flex items-center">
                                            <Megaphone className="mr-2 text-blue-500" /> How to Place a Bet
                                        </h2>
                                        <p className="text-gray-700 text-sm sm:text-base">
                                            1. Select your team from the dropdown menu.
                                            <br />
                                            2. Enter the amount you wish to bet.
                                            <br />
                                            3. Click &apos;Place Bet&apos; to submit your bet.
                                            <br />
                                            <strong>Note:</strong> Your potential payout will be displayed based on the odds of the selected team.
                                        </p>
                                    </Card>
                                </motion.section>
                            </form>
                        </Card>
                    </motion.section>
                </TabsContent>

                <TabsContent value="bet">
                    <motion.div 
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card className="p-4 sm:p-6 bg-white shadow-lg rounded-xl">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Place Your Bet</h2>
                            <form onSubmit={handleBet} className="space-y-6">
                                <div>
                                    <label className="block text-gray-700 text-sm sm:text-lg">Select Team:</label>
                                    <select
                                        value={selectedTeam}
                                        onChange={(e) => {
                                            setSelectedTeam(e.target.value);
                                            setPreview(carImages[e.target.value]);
                                        }}
                                        className="border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    >
                                        <option value="" disabled>Select a team</option>
                                        {teams.map((team) => (
                                            <option key={team.id} value={team.id}>
                                                {team.name} - Odds: {odds[team.id]}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {preview && (
                                    <motion.div
                                        className="mb-4 flex justify-center"
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <img
                                            src={preview}
                                            alt={teams.find(team => team.id === selectedTeam)?.name}
                                            className="w-full max-w-xs h-auto object-cover rounded-lg shadow-md"
                                        />
                                    </motion.div>
                                )}

                                <div>
                                    <label className="block text-gray-700 text-sm sm:text-lg">Bet Amount:</label>
                                    <Input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="Enter amount"
                                        className="border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300">
                                    Place Bet
                                </Button>
                            </form>
                        </Card>
                    </motion.div>

                    <motion.section 
                        className="space-y-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <Card className="p-4 sm:p-6 bg-white shadow-lg rounded-xl mt-2">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">Your Bets</h2>
                            <ul className="space-y-4">
                                {bets.map((bet, index) => (
                                    <motion.li 
                                        key={index} 
                                        className="p-4 border border-gray-200 rounded-lg shadow-md bg-white flex items-center space-x-4"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <img
                                            src={bet.image}
                                            alt={teams.find(team => team.id === bet.team)?.name}
                                            className="w-16 h-16 object-cover rounded-lg shadow-md"
                                        />
                                        <div className='mt-2'>
                                            <p className="text-lg font-semibold text-gray-700">Team: {teams.find(team => team.id === bet.team)?.name}</p>
                                            <p className="text-lg">Amount: ${bet.amount}</p>
                                            <p className="text-lg font-bold text-green-600">Potential Payout: ${bet.payout}</p>
                                        </div>
                                    </motion.li>
                                ))}
                            </ul>
                        </Card>
                    </motion.section>

                </TabsContent>

                <TabsContent value="mines">
                    <motion.section 
                        className="space-y-6 mb-12"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card className="p-4 sm:p-6 bg-white shadow-lg rounded-xl">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">Mines Game</h2>
                            <p className="text-gray-700 mb-4">
                                Place your bet and try to avoid the mines! You have a 50% chance to win double your bet.
                            </p>
                            <form onSubmit={handleMinesBet} className="space-y-4">
                                <Input
                                    type="number"
                                    value={minesBet}
                                    onChange={(e) => setMinesBet(e.target.value)}
                                    placeholder="Enter bet amount"
                                    className="border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300">
                                    Play Mines
                                </Button>
                            </form>
                            {minesResult && (
                                <p className="mt-4 text-lg font-bold text-gray-800">{minesResult}</p>
                            )}
                        </Card>
                    </motion.section>
                </TabsContent>

            </Tabs>

            <motion.section 
                className="space-y-6 mb-12"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Card className="p-4 sm:p-6 bg-white shadow-lg rounded-xl">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 flex items-center">
                        <Trophy className="mr-2 text-yellow-500" /> Latest Announcements
                    </h2>
                    <ul className="space-y-4 text-sm sm:text-base">
                        <li className="text-gray-700">
                            <strong>New Season Announcement:</strong> The new Formula E season starts next month with exciting changes!
                        </li>
                        <li className="text-gray-700">
                            <strong>Mercedes Update:</strong> Mercedes has introduced a new car model with improved performance.
                        </li>
                    </ul>
                </Card>
            </motion.section>
            </main>
        </div>
        </>
    );
};

export default BetPage;
