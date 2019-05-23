import React from "react";
import Opponents from "./components/Opponents/Opponents";
import Game from "./components/Game/Game";
import User from "./components/User/User";

const App: React.FC = () => {
	return (
        <>            
            <div className="container-fluid">            
                <div className="row justify-content-center">
                    <User />                 
                    <Game />
                    <Opponents />                    
                </div>
            </div>        
        </>
	);
};

export default App;
