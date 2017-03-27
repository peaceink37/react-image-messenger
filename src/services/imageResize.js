// ./src/services/imageResize
// utility to tranform freshly grabbed images into
// base64 and png or jpg format

export const ProcessImage = (dataURL, fileType, callback) => {
    let maxWidth = 800;
    let maxHeight = 800;

    let image = new Image();
    image.src = dataURL;

    image.onload = function () {
        let width = image.width;
        let height = image.height;
        let shouldResize = (width > maxWidth) || (height > maxHeight);

        let newWidth;
        let newHeight;

        if (width > height) {
            newHeight = height * (maxWidth / width);
            newWidth = maxWidth;
        } else {
            newWidth = width * (maxHeight / height);
            newHeight = maxHeight;
        }

        let canvas = document.createElement('canvas');

        canvas.width = newWidth;
        canvas.height = newHeight;

        let context = canvas.getContext('2d');

        context.drawImage(this, 0, 0, newWidth, newHeight);

        let dUrl = canvas.toDataURL('image/jpeg',0.8);
        let dSub = dUrl.substr(0, 200);
        console.log(" data url value in process method ",typeof dUrl," substring "+dSub);

        callback(dUrl);
        // free canvas from memory after image is processed
        canvas = null;
    };

    image.onerror = function () {
        alert('There was an error processing your file!');
    };
}