import { Area } from 'react-easy-crop/types';

export default function useGetCroppedImg() {
    const createImage = async (url: string) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => resolve(image));
            image.addEventListener('error', (error) => reject(error));
            image.setAttribute('crossOrigin', 'anonymous');
            image.src = url;
        });
    };

    async function getCroppedImg(imageSrc: string, pixelCrop: Area) {
        const image = await createImage(imageSrc);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            return null;
        }

        canvas.width = image.width;
        canvas.height = image.height;

        ctx.drawImage(image, 0, 0);

        // extract the cropped image using these values
        const data = ctx.getImageData(
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height
        );

        // set canvas width to final desired crop size - this will clear existing context
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        // paste generated rotate image at the top left corner
        ctx.putImageData(data, 0, 0);

        canvas;

        const urlProfileImage = await new Promise<string>((resolve, reject) => {
            canvas.toBlob((file) => {
                resolve(URL.createObjectURL(file as Blob));
            }, 'image/jpeg');
        });

        return { urlProfileImage };
    }

    return { getCroppedImg, createImage };
}
