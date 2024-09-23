import axios, { AxiosRequestConfig } from 'axios';
import { format } from 'date-fns';
import React, { useState } from 'react';

export default function useDownloadFile() {
    const [istDowloading, setIstDowloading] = useState(false);
    const [downloadInfo, setDownloadInfo] = useState({
        progress: 0,
        completed: false,
        total: 0,
        loaded: 0,
    });

    async function downloadFile(downloadLink: string, fileName?: string) {
        setIstDowloading(true);

        const options: AxiosRequestConfig = {
            onDownloadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                setDownloadInfo({
                    progress: Math.floor((loaded * 100) / total),
                    loaded,
                    total,
                    completed: false,
                });
            },
        };

        await axios
            .get(downloadLink, {
                responseType: 'blob',
                ...options,
            })
            .then((response) => {
                const url = window.URL.createObjectURL(
                    new Blob([response.data], {
                        type: response.headers['content-type'],
                    })
                );

                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(
                    'download',
                    fileName
                        ? fileName
                        : `image_${format(new Date(), 'ddMMyyyyHHmm')}`
                );
                document.body.appendChild(link);
                link.click();
                setDownloadInfo((info) => ({
                    ...info,
                    completed: true,
                }));
            });

        setTimeout(() => {
            setIstDowloading(false);
            setDownloadInfo({
                progress: 0,
                completed: false,
                total: 0,
                loaded: 0,
            });
        }, 2000);
    }

    return { downloadFile, istDowloading, downloadInfo };
}
