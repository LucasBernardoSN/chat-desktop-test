export const encondeToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            let base64 = fileReader.result;
            if (typeof base64 === 'string') {
                base64 = base64.substring(base64.indexOf(',') + 1);
                resolve(base64);
            }
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};
