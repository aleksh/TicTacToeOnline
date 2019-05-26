import VOTicItem from "../VO/VOTicItem";

import Utils from "../utils/Utils";
import VOUser from "../VO/VOUser";

export default class PCPlayer {    

    public getStepId = (pItems:VOTicItem[][], pGameType:number, pUser:VOUser):number => {

        let pId:number = 1;
        switch (pUser.uid) {
            case "1":                
                pId = this._getEasyStep(pItems);
                break;
            case "2":                
                pId = this.getMiddleStep(pItems, pGameType);
                break;
            case "3":                
                pId = this.getHardStep(pItems, pGameType);
                break;            
        }
        return pId;  
    }

    private _getEasyStep = (pItems:VOTicItem[][]):number => {
        let pAvailableChoices:VOTicItem[] = [];

        pItems.forEach((row) => {
            pAvailableChoices.push(...row.filter((item) => item.isEmpty === true));
        });
           
        let pRandomId:number = pAvailableChoices[Utils.GetRandomInt(pAvailableChoices.length)].id;        
        return pRandomId;
    }

    private getMiddleStep = (pItems:VOTicItem[][], pGameType:number):number => {
    
        let index:number = Utils.GetRandomInt(2);
        
        if (index === 1) {            
            return this._getEasyStep(pItems);
        } else {
            return this.getHardStep(pItems, pGameType);
        }

    }

    private getHardStep = (pItems:VOTicItem[][], pGameType:number):number => {
        let pTopLeft:boolean = !pItems[0][0].isEmpty;
        let pTopRight:boolean = !pItems[0][pGameType-1].isEmpty;
        let pCenter:boolean = !pItems[Math.ceil(pGameType/2)-1][Math.ceil(pGameType/2)-1].isEmpty;
        let pBottomLeft:boolean = !pItems[pGameType-1][0].isEmpty;
        let pBottomRight:boolean = !pItems[pGameType-1][pGameType-1].isEmpty;       

        // check 1 empty cell for PC win
         //check rows to Win
         for(let i:number = 0; i < pItems.length; i++){
            let pRow:VOTicItem[] = pItems[i].filter((item) => item.isEmpty === false && !item.isAcross);
            let pEmptyRow:VOTicItem[] = pItems[i].filter((item) => item.isEmpty === true);
           
            if(pRow.length <= pGameType-1 && (pRow.length+pEmptyRow.length) === pGameType) {                
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

            let pFilteredCol:VOTicItem[] = pColumn.filter((item) => item.isEmpty === false && !item.isAcross);
            let pEmptyCol:VOTicItem[] = pColumn.filter((item) => item.isEmpty === true);

            if(pFilteredCol.length <= pGameType-1 && (pFilteredCol.length + pEmptyCol.length) === pGameType) {                
                let pEmptyItems:VOTicItem[] = pColumn.filter((item) => item.isEmpty === true);
                if(pEmptyItems.length === 1) {                    
                    return pEmptyItems[0].id;
                }                
            }   
        }

        ////////////////////////////////////////////////////////////

        // check col and rows for user Win
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
                
        if (!pTopLeft) return pItems[0][0].id;
        if (!pTopRight) return pItems[0][pGameType-1].id;
        if (!pBottomLeft) return pItems[pGameType-1][0].id;
        if (!pBottomRight) return pItems[pGameType-1][pGameType-1].id;
        

         //check rows to Win
         for(let i:number = 0; i < pItems.length; i++){
            let pRow:VOTicItem[] = pItems[i].filter((item) => item.isEmpty === false && !item.isAcross);
            let pEmptyRow:VOTicItem[] = pItems[i].filter((item) => item.isEmpty === true);
           
            if(pRow.length <= pGameType-1 && (pRow.length+pEmptyRow.length) === pGameType) {                
                let pEmptyItems:VOTicItem[] = pItems[i].filter((item) => item.isEmpty === true);
                if(pEmptyItems.length <= pGameType-1 && pEmptyItems.length > 0) {                    
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

            let pFilteredCol:VOTicItem[] = pColumn.filter((item) => item.isEmpty === false && !item.isAcross);
            let pEmptyCol:VOTicItem[] = pColumn.filter((item) => item.isEmpty === true);

            if(pFilteredCol.length <= pGameType-1 && (pFilteredCol.length + pEmptyCol.length) === pGameType) {                
                let pEmptyItems:VOTicItem[] = pColumn.filter((item) => item.isEmpty === true);
                if(pEmptyItems.length <= pGameType-1  && pEmptyItems.length > 0) {                    
                    return pEmptyItems[0].id;
                }                
            }   
        }


        ///// check for rows without Cross         
        for(let i:number = 0; i < pItems.length; i++){
            let pRow:VOTicItem[] = pItems[i].filter((item) => item.isEmpty === false && item.isAcross);
            if (pRow.length === 0) {
                let pEmptyRow:VOTicItem[] = pItems[i].filter((item) => item.isEmpty === true);
                if(pEmptyRow.length > 0) {                    
                    return pEmptyRow[0].id;
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
            if (pFilteredCol.length === 0) {
                let pEmptyCol:VOTicItem[] = pColumn.filter((item) => item.isEmpty === true);
                if(pEmptyCol.length > 0) {
                    return pEmptyCol[0].id;
                }
            }            
        }
        
        return this._getEasyStep(pItems);
    }
}