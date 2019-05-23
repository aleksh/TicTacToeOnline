import React from "react";
import Opponents from "./components/Opponents/Opponents";
import Game from "./components/Game/Game";
import CurrentUser from "./components/CurrentUser/CurrentUser";

const App: React.FC = () => {
	return (
        <>            
            <div className="container-fluid">            
                <div className="row justify-content-center">
                    <CurrentUser />                    
                    <Game />
                    <Opponents />                    
                </div>
            </div>        
        </>
	);
};

export default App;
