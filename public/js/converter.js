function convertImage(outputFormat, fileName) {
    var input = document.getElementById('imageInput');
    // console.log("Image: "+input);
    
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var img = new Image();
            img.src = e.target.result;
            img.onload = function () {
                var canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;

                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                var imageURL = canvas.toDataURL('image/' + outputFormat);

                // Get the CSRF token
                var csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;

                // Use jQuery AJAX to send the POST request
                $.ajax({
                    type: 'POST',
                    url: '/convert-image',
                    data: {
                        _token: csrfToken,
                        imageData: imageURL,
                        outputFormat: outputFormat,
                        fileName: fileName
                    },
                    success: function (response) {
                        alert(response.message);
                        // console.log("aaa_response: " + response.filePath);
                        var downloadLink = document.createElement('a');
                        downloadLink.href = response.filePath;
                        downloadLink.download = fileName;
                        downloadLink.click();
                    },
                    error: function (error) {
                        console.error('Error:', error);
                        // Handle the error
                    }
                });
            };
        };

        reader.readAsDataURL(input.files[0]);
    }
}

