import VOTicItem from "../VO/VOTicItem";
import VOUser from "../VO/VOUser";

export default class GameUtils {


    static CheckItemsForWin = (pItems: VOTicItem[], pByAcross: boolean, pGameType: number): boolean => {
        let pFilteredItems: VOTicItem[] = pItems.filter(item => !item.isEmpty && item.isAcross === pByAcross);
        let isWin: boolean = pFilteredItems.length === pGameType;
        if (isWin) {
            pFilteredItems.forEach((item) => { item.done = true; })
        }
        return isWin;
    }

    static SetChoice = (pItems: VOTicItem[][], pId: number, pIsUser: boolean = false): boolean => {
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

    static IsWinGame = (pItems: VOTicItem[][], pGameType: number): boolean => {
        let isWin: boolean = false;

        //check By X
        for (let i: number = 0; i < pItems.length; i++) {
            let pRow: VOTicItem[] = pItems[i];

            isWin = GameUtils.CheckItemsForWin(pRow, true, pGameType);
            if (isWin) break;

            isWin = GameUtils.CheckItemsForWin(pRow, false, pGameType);
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
                    isWin = GameUtils.CheckItemsForWin(pColumn, true, pGameType);
                    if (isWin) break;

                    isWin = GameUtils.CheckItemsForWin(pColumn, false, pGameType);
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
                isWin = GameUtils.CheckItemsForWin(pLeftCross, true, pGameType);

                if (!isWin) {
                    isWin = GameUtils.CheckItemsForWin(pLeftCross, false, pGameType);
                }
            }

            if (!isWin && pRightCross.length === pGameType) {
                // check cross from bottom left to top right
                isWin = GameUtils.CheckItemsForWin(pRightCross, true, pGameType);

                if (!isWin) {
                    isWin = GameUtils.CheckItemsForWin(pRightCross, false, pGameType);
                }
            }
        }

        return isWin;
    }

    static CheckDraw = (pItems: VOTicItem[][], pGameType: number): boolean => {
        let isDraw: boolean = false;

        let rowsDraw: boolean[] = [];
        let colsDraw: boolean[] = [];

        let rowDraw: boolean = false;
        let colDraw: boolean = false;
        let crossLeftDraw: boolean = false;
        let crossRightDraw: boolean = false;

        //check rows
        for (let i: number = 0; i < pItems.length; i++) {
            let pRow: VOTicItem[] = pItems[i];

            let pCrossRow: VOTicItem[] = pRow.filter((pItem) => !pItem.isEmpty && pItem.isAcross);
            let pCircleRow: VOTicItem[] = pRow.filter((pItem) => !pItem.isEmpty && !pItem.isAcross);

            if (pCrossRow.length > 0 && pCircleRow.length > 0) {
                rowsDraw.push(false);
            } else {
                rowsDraw.push(true);
            }
        }


        //check cols
        for (let i: number = 0; i < pGameType; i++) {
            let pColumn: VOTicItem[] = [];

            for (let j: number = 0; j < pGameType; j++) {
                pColumn.push(pItems[j][i]);
            }

            let pCrossCol: VOTicItem[] = pColumn.filter((pItem) => !pItem.isEmpty && pItem.isAcross);
            let pCircleCol: VOTicItem[] = pColumn.filter((pItem) => !pItem.isEmpty && !pItem.isAcross);

            if (pCrossCol.length > 0 && pCircleCol.length > 0) {
                colsDraw.push(false);
            } else {
                colsDraw.push(true);
            }
        }


        ///check for Cross
        let pLeftCross: VOTicItem[] = [];
        let pRightCross: VOTicItem[] = [];

        for (let i: number = 0; i < pGameType; i++) {
            pLeftCross.push(pItems[i][i]);
            pRightCross.push(pItems[pGameType - 1 - i][i]);
        }

        // left Cross
        let pLeftCrossCheck: VOTicItem[] = pLeftCross.filter((pItem) => !pItem.isEmpty && pItem.isAcross);
        let pLeftCircleCheck: VOTicItem[] = pLeftCross.filter((pItem) => !pItem.isEmpty && !pItem.isAcross);

        if (pLeftCrossCheck.length > 0 && pLeftCircleCheck.length > 0) {
            crossLeftDraw = true;
        } else {
            crossLeftDraw = false;
        }

        // right Cross
        let pRightCrossCheck: VOTicItem[] = pRightCross.filter((pItem) => !pItem.isEmpty && pItem.isAcross);
        let pRightCircleCheck: VOTicItem[] = pRightCross.filter((pItem) => !pItem.isEmpty && !pItem.isAcross);

        if (pRightCrossCheck.length > 0 && pRightCircleCheck.length > 0) {
            crossRightDraw = true;
        } else {
            crossRightDraw = false;
        }

        rowDraw = (rowsDraw.filter((item) => item === true).length > 0) ? false : true;
        colDraw = (colsDraw.filter((item) => item === true).length > 0) ? false : true;

        isDraw = crossRightDraw && crossLeftDraw && rowDraw && colDraw;

        return isDraw;
    }


    static InitGameItems = (pCellNum: number): VOTicItem[][] => {
        let items: any[] = [];
        let id: number = 1;

        for (let i = 0; i < pCellNum; i++) {
            let pRow: VOTicItem[] = [];

            for (let j = 1; j <= pCellNum; j++) {
                pRow.push(new VOTicItem(id));
                id++;
            }

            items.push(pRow);
        }

        return items;
    }

    static GetEndGameMessage = (isDraw: boolean, isWin: boolean, isMyTurn: boolean): string => {
        let message: string = "";
        isDraw
            ? (message = "DRAW !!!!")
            : isWin && isMyTurn
                ? (message = "YOU WIN !!!!")
                : (message = "YOU LOSE !!!");

        return message;
    }

    static GetInviteMessage = (pUser: VOUser): string => {
        const message: string = `Do you want to play with ${pUser.displayName}`;
        return message;
    }

    static GetWaitOpponentMessage = (pUser: VOUser): string => {
        const message: string = `Waiting for  ${pUser.displayName}`;
        return message;
    }


    static GetInviteButtonLabel = (pIsPC: boolean): string => {
        const message: string = pIsPC ? "Play With Me" : "Invite Me to Play";
        return message;
    }

}