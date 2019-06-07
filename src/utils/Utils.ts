export default class Utils {

    static GetRandomInt = (max: number): number => {
        return Math.floor(Math.random() * Math.floor(max));
    }

    static CutString = (pStr: string, maxLetters: number = 18, end: string = "..."): string => {
        if(!pStr) return "";
        
        let newStr: string = "";
        let strArr: string[] = pStr.split(" ");

        for (let i: number = 0; i < strArr.length; i++) {
            let str: string = strArr[i];

            if (str.length > maxLetters) {
                return str.substr(0, maxLetters) + end;
            }

            if (newStr.length < (maxLetters + 1) && (str.length + newStr.length) < (maxLetters + 1)) {
                newStr += " " + str;
            } else {
                newStr += end;
                return newStr;
            }
        }

        return newStr;
    }

    static IsImageFile = (fileName: string) => {
        var extension = fileName.substr((fileName.lastIndexOf('.') + 1))
        if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
            return true;
        } else {
            return false;
        }
    }

    static GetImageExtensions = (fileName: string) => {
        return fileName.substr((fileName.lastIndexOf('.') + 1))
    }

    static GetResizedImage = (file: any, maxWidth: number, maxHeight: number) => {

        return new Promise(resolve => {
            const reader = new FileReader();

            reader.onload = () => {
                var image = new Image();
                image.onload = () => {
                    resolve(Utils.ResizeImage(
                        image,
                        maxWidth,
                        maxHeight
                    ));

                };
                image.src = String(reader.result);
            };
            reader.readAsDataURL(file);
        });
    }

    static ResizeImage(image: any, maxWidth: number, maxHeight: number, quality: number = 1) {
        const canvas = document.createElement('canvas');
        let width = image.width;
        let height = image.height;

        if (width > height) {
            if (width > maxWidth) {
                height = Math.round(height * maxWidth / width);
                width = maxWidth;
            }
        } else {
            if (height > maxHeight) {
                width = Math.round(width * maxHeight / height);
                height = maxHeight;
            }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
        ctx.drawImage(image, 0, 0, width, height);


        return canvas.toDataURL("image/jpeg", quality);
    }
}





