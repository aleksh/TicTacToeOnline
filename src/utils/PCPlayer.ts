import VOTicItem from "../VO/VOTicItem";

import { getRandomInt } from "../utils/Utils";

export default class PCPlayer {    

    getEasyStep = (pItems:VOTicItem[][], pGameType:number):number => {
        let pAvailableChoices:VOTicItem[] = [];

        pItems.forEach((row) => {
            pAvailableChoices.push(...row.filter((item) => item.isEmpty === true));
        });
           
        let pRandomId:number = pAvailableChoices[getRandomInt(pAvailableChoices.length)].id;        
        return pRandomId;
    }

    getMiddleStep = (pItems:VOTicItem[][], pGameType:number):number => {
    
        let index:number = getRandomInt(2);
        
        if (index === 1) {            
            return this.getEasyStep(pItems, pGameType);
        } else {
            return this.getHardStep(pItems, pGameType);
        }

    }

    getHardStep = (pItems:VOTicItem[][], pGameType:number):number => {
        let pTopLeft:boolean = !pItems[0][0].isEmpty;
        let pTopRight:boolean = !pItems[0][pGameType-1].isEmpty;
        let pCenter:boolean = !pItems[Math.ceil(pGameType/2)-1][Math.ceil(pGameType/2)-1].isEmpty;
        let pBottomLeft:boolean = !pItems[pGameType-1][0].isEmpty;
        let pBottomRight:boolean = !pItems[pGameType-1][pGameType-1].isEmpty;       


        //check for rows
        for(let i:number = 0; i < pItems.length; i++){
            let pRow:VOTicItem[] = pItems[i].filter((item) => item.isEmpty === false && item.isAcross);
           
            if(pRow.length === pGameType-1) {                
                let pEmptyItems:VOTicItem[] = pItems[i].filter((item) => item.isEmpty === true);
                if(pEmptyItems.length === 1) {                    
                    return pEmptyItems[0].id;
                }                
            }        
        }

        // check For Columns
        for (let i: number = 0; i < pGameType; i++) {
            let pColumn: VOTicItem[] = [];

            for (let j: number = 0; j < pGameType; j++) {
                pColumn.push(pItems[j][i]);                
            }

            let pFilteredCol:VOTicItem[] = pColumn.filter((item) => item.isEmpty === false && item.isAcross);

            if(pFilteredCol.length === pGameType-1) {                
                let pEmptyItems:VOTicItem[] = pColumn.filter((item) => item.isEmpty === true);
                if(pEmptyItems.length === 1) {                    
                    return pEmptyItems[0].id;
                }                
            }   
        }

        // check center position and fill it if it's empty        
        if(!pCenter) return pItems[Math.ceil(pGameType/2)-1][Math.ceil(pGameType/2)-1].id;     
        
        if(pCenter) {
            if (!pTopLeft) return pItems[0][0].id;
            if (!pTopRight) return pItems[0][pGameType-1].id;
            if (!pBottomLeft) return pItems[pGameType-1][0].id;
            if (!pBottomRight) return pItems[pGameType-1][pGameType-1].id;
        }
        
        return this.getEasyStep(pItems, pGameType);
    }
}