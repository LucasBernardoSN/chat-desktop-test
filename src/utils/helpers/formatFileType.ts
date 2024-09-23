export const formatFileType = (fileExtension: string): string => {
    let fileType: string = '';

    switch (fileExtension) {
        case 'css':
        case 'csv':
        case 'exe':
        case 'html':
        case 'json':
        case 'mp3':
        case 'mp4':
        case 'pdf':
        case 'txt':
        case 'xml':
        case 'zip':
        case 'rar':
            fileType = fileExtension;
            break;
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'btm':
            fileType = 'thumb';
            break;
        case 'jfif':
        case 'svg':
        case 'gif':
        case 'avif':
            fileType = 'image';
            break;
        case 'js':
        case 'jsx':
        case 'ts':
        case 'tsx':
            fileType = 'js';
            break;
        case 'doc':
        case 'docx':
            fileType = 'doc';
            break;
        case 'xls':
        case 'xlsx':
            fileType = 'xls';
            break;
        case 'ppt':
        case 'pptx':
            fileType = 'ppt';
            break;
        default:
            fileType = 'standart';
            break;
    }

    return fileType;
};
