export default class Utils {

    static GetRandomInt = (max: number): number => {
        return Math.floor(Math.random() * Math.floor(max));
    }

    static CutString = (pStr: string, maxLetters: number = 18, end: string = "..."): string => {
        let newStr: string = "";
        let strArr: string[] = pStr.split(" ");

        for (let i: number = 0; i < strArr.length; i++) {
            let str: string = strArr[i];

            if (newStr.length < (maxLetters + 1) && (str.length + newStr.length) < (maxLetters + 1)) {
                newStr += " " + str;
            } else {
                newStr += end;
                return newStr;
            }
        }

        return newStr;
    }
}





