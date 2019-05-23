import React from "react";
import Opponents from "./components/Opponents/Opponents";
import Game from "./components/Game/Game";

const App: React.FC = () => {
	return (
        <>            
            <div className="container-fluid">            
                <div className="row justify-content-center">
                    <div className="bd-highlight">USER 1</div>				
                    <Game />
                    <Opponents />                    
                </div>
            </div>        
        </>
	);
};

export default App;
