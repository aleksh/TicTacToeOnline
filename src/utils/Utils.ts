import VOTicItem from "../VO/VOTicItem";

export const getRandomInt = (max:number) => {
    return Math.floor(Math.random() * Math.floor(max));
}

export const checkItemsForWin = (pItems: VOTicItem[], pByAcross: boolean, pGameType: number): boolean => {
    let pFilteredItems: VOTicItem[] = pItems.filter(item => item.isEmpty === false && item.isAcross === pByAcross);
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
            if (item.id === pId && item.isEmpty === true) {
                item.isEmpty = false;
                pIsUser ? (item.isAcross = true) : (item.isAcross = false);
            }

            if (item.isEmpty === true && isStepsExist === false) {
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
            if (!pLeftItem.isEmpty) { pLeftCross.push(pItems[i][i]); }

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