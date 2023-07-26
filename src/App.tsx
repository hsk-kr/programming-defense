import GameScene from './components/GameScene';
import { GameContextProvider } from './context/GameContext';
import { TooltipContextProvider } from './context/TooltipContext';

const App = () => {
  return (
    <TooltipContextProvider>
      <GameContextProvider>
        <GameScene />
      </GameContextProvider>
    </TooltipContextProvider>
  );
};

export default App;
