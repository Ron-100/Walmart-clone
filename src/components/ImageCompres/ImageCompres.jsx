import React from 'react'

export const ImageCompres = (file, maxWidth = 400, maxHeight = 400, quality = 0.7) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = event => {
            const img = new Image();
            img.src = event.target.result;

            img.onload = () => {
                let canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height = height * (maxWidth / width);
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = width * (maxHeight / height);
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob(blob => {
                    if (blob) {
                        const resizedFile = new File([blob], file.name, { type: file.type });

                        // ✅ Log size in KB
                        // const sizeInKB = (resizedFile.size / 1024).toFixed(2);
                        // console.log(`Resized image size: ${sizeInKB} KB`);

                        resolve(resizedFile);
                    } else {
                        reject("Resize failed");
                    }
                }, file.type, quality);
            };

            img.onerror = error => reject(error);
        };
        reader.onerror = error => reject(error);
    });
};

