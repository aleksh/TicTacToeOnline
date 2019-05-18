import VOTicItem from "../VO/VOTicItem";

export const checkItemsForWin = (pItems:VOTicItem[], pByAcross:boolean, pGameType:number):boolean => {
    let pFilteredItems:VOTicItem[] = pItems.filter(item => item.isEmpty === false &&  item.isAcross === pByAcross);
    let isWin:boolean = pFilteredItems.length === pGameType;
    if(isWin) {
        console.log("Win By => "+pByAcross);
    }        
    return isWin;
}