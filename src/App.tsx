import GameScene from './components/GameScene';
import { GameContextProvider } from './context/GameContext';
import { GlobalContextProvider } from './context/GlobalContext';

const App = () => {
  return (
    <GlobalContextProvider>
      <GameContextProvider>
        <GameScene />
      </GameContextProvider>
    </GlobalContextProvider>
  );
};

export default App;
