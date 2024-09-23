import { Md5 } from 'ts-md5/dist/md5';

function getRandomIntNumber(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export function createHashMd5Id(): string {
    let aux_hashMessage = Md5.hashStr(
        getRandomIntNumber(1000, 9999).toString()
    );
    let aux2_hashMessage = Md5.hashStr(Date.now().toString());
    return aux_hashMessage + aux2_hashMessage;
}
