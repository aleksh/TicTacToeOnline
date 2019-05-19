import VOTicItem from "../VO/VOTicItem";

export const getRandomInt = (max:number) => {
    return Math.floor(Math.random() * Math.floor(max));
}

export const checkItemsForWin = (pItems: VOTicItem[], pByAcross: boolean, pGameType: number): boolean => {
    let pFilteredItems: VOTicItem[] = pItems.filter(item => !item.isEmpty && item.isAcross === pByAcross);
    let isWin: boolean = pFilteredItems.length === pGameType;
    if (isWin) {
     //   console.log("Win By => " + pByAcross);
    }
    return isWin;
}

export const setChoice = (pItems: VOTicItem[][], pId: number, pIsUser: boolean): boolean => {
    let isStepsExist: boolean = false;
    pItems.forEach(row => {
        row.forEach(item => {
            if (item.id === pId && item.isEmpty) {
                item.isEmpty = false;
                pIsUser ? (item.isAcross = true) : (item.isAcross = false);
            }

            if (item.isEmpty && !isStepsExist) {
                isStepsExist = true;
            }
        });
    });

    return isStepsExist;
}

export const isWinGame = (pItems: VOTicItem[][], pGameType: number): boolean => {
    let isWin: boolean = false;

    //check By X
    for (let i: number = 0; i < pItems.length; i++) {
        let pRow: VOTicItem[] = pItems[i];

        isWin = checkItemsForWin(pRow, true, pGameType);
        if (isWin) break;

        isWin = checkItemsForWin(pRow, false, pGameType);
        if (isWin) break;
    }

    // check By Y if no win
    if (!isWin) {
        for (let i: number = 0; i < pGameType; i++) {
            let pColumn: VOTicItem[] = [];

            for (let j: number = 0; j < pGameType; j++) {
                if (!pItems[j][i].isEmpty) {
                    pColumn.push(pItems[j][i]);
                }
            }

            if (pColumn.length === pGameType) {
                isWin = checkItemsForWin(pColumn, true, pGameType);
                if (isWin) break;

                isWin = checkItemsForWin(pColumn, false, pGameType);
                if (isWin) break;
            }
        }
    }

    //check By Cross
    if (!isWin) {
        let pLeftCross: VOTicItem[] = [];
        let pRightCross: VOTicItem[] = [];

        for (let i: number = 0; i < pGameType; i++) {
            let pLeftItem: VOTicItem = pItems[i][i];
            if (!pLeftItem.isEmpty) { pLeftCross.push(pLeftItem); }

            let pRightItem: VOTicItem = pItems[pGameType - 1 - i][i];
            if (!pRightItem.isEmpty) { pRightCross.push(pRightItem); }
        }

        // check Cross from left top TO right Bottom
        if (pLeftCross.length === pGameType) {
            isWin = checkItemsForWin(pLeftCross, true, pGameType);

            if (!isWin) {
                isWin = checkItemsForWin(pLeftCross, false, pGameType);
            }
        }

        if (!isWin && pRightCross.length === pGameType) {
            // check cross from bottom left to top right
            isWin = checkItemsForWin(pRightCross, true, pGameType);

            if (!isWin) {
                isWin = checkItemsForWin(pRightCross, false, pGameType);
            }
        }
    }

    return isWin;
}

export const checkDraw = (pItems: VOTicItem[][], pGameType: number): boolean => {
    let isDraw:boolean  = false;

    let rowsDraw:boolean[] = [];
    let colsDraw:boolean[] = [];

    let rowDraw:boolean = false;
    let colDraw:boolean = false;
    let crossLeftDraw:boolean = false;
    let crossRightDraw:boolean = false;
    
    //check rows
    for (let i:number = 0; i < pItems.length; i++){
        let pRow:VOTicItem[] = pItems[i];

        let pCrossRow:VOTicItem[] = pRow.filter((pItem) => !pItem.isEmpty && pItem.isAcross);
        let pCircleRow:VOTicItem[] = pRow.filter((pItem) => !pItem.isEmpty && !pItem.isAcross);

        if (pCrossRow.length > 0 && pCircleRow.length > 0) {
            rowsDraw.push(false);
        } else {
            rowsDraw.push(true);
        }        
    }
    console.log("rowsDraw");
    console.log(rowsDraw);


    //check cols
    for (let i: number = 0; i < pGameType; i++) {
        let pColumn: VOTicItem[] = [];
        
        for (let j: number = 0; j < pGameType; j++) {
            pColumn.push(pItems[j][i]);  
        }        

        let pCrossCol:VOTicItem[] = pColumn.filter((pItem) => !pItem.isEmpty && pItem.isAcross);
        let pCircleCol:VOTicItem[] = pColumn.filter((pItem) => !pItem.isEmpty && !pItem.isAcross);

        if (pCrossCol.length > 0 && pCircleCol.length > 0) {
            colsDraw.push(false);
        } else {
            colsDraw.push(true);
        }
    }

    console.log("colsDraw");
    console.log(colsDraw);
    //////////////


    ///check for Cross
    let pLeftCross: VOTicItem[] = [];
    let pRightCross: VOTicItem[] = [];

    for (let i: number = 0; i < pGameType; i++) {        
        pLeftCross.push(pItems[i][i]);
        pRightCross.push(pItems[pGameType - 1 - i][i]);
    }

    // left Cross
    let pLeftCrossCheck:VOTicItem[] = pLeftCross.filter((pItem) => !pItem.isEmpty && pItem.isAcross);
    let pLeftCircleCheck:VOTicItem[] = pLeftCross.filter((pItem) => !pItem.isEmpty && !pItem.isAcross);
    
    if (pLeftCrossCheck.length > 0 && pLeftCircleCheck.length > 0) {
        crossLeftDraw = true;
    } else {
        crossLeftDraw = false;
    }

    // right Cross
    let pRightCrossCheck:VOTicItem[] = pRightCross.filter((pItem) => !pItem.isEmpty && pItem.isAcross);
    let pRightCircleCheck:VOTicItem[] = pRightCross.filter((pItem) => !pItem.isEmpty && !pItem.isAcross);
    
    if (pRightCrossCheck.length > 0 && pRightCircleCheck.length > 0) {
        crossRightDraw = true;
    } else {
        crossRightDraw = false;
    }
        
    rowDraw = (rowsDraw.filter((item) => item === true).length > 0) ? false : true;
    colDraw = (colsDraw.filter((item) => item === true).length > 0) ? false : true;

   /* console.log("rowDraw => "+rowDraw);
    console.log("colDraw => "+colDraw);
    console.log("crossRightDraw => "+crossRightDraw);
    console.log("crossLeftDraw => "+crossLeftDraw);
*/
    isDraw = crossRightDraw && crossLeftDraw && rowDraw && colDraw;

  //  console.log("isDraw => "+isDraw);

    return isDraw;
}