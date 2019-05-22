import React from "react";
import Opponents from "./components/Opponents/Opponents";
import Game from "./components/Game/Game";
import ModalInfo from "./components/Modals/ModalInfo/ModalInfo";

const App: React.FC = () => {
	return (
        <>
            
            <div className="container-fluid">
            <div className="row">
                <ModalInfo />
                </div>
                <div className="row">
                    <div className="col-2 bd-highlight">USER 1</div>				
                    <Game />
                    <Opponents />
                    
                </div>
            </div>        
        </>
	);
};

export default App;
