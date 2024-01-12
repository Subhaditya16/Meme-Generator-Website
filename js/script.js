function generateMeme(img, topText, bottomText, topTextSize, bottomTextSize) {
  const canvas = document.getElementById("meme-canvas");
  const ctx = canvas.getContext("2d");

  // Size canvas to image
  canvas.width = img.width;
  canvas.height = img.height;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw main image
  ctx.drawImage(img, 0, 0);

  // Text style: white with black borders
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.textAlign = "center";

  // Top text font size
  let fontSize = canvas.width * topTextSize;
  ctx.font = `${fontSize}px Impact`;
  ctx.lineWidth = fontSize / 20;

  // Draw top text
  ctx.textBaseline = "top";
  topText.split("\n").forEach((t, i) => {
    ctx.fillText(t, canvas.width / 2, i * fontSize, canvas.width);
    ctx.strokeText(t, canvas.width / 2, i * fontSize, canvas.width);
  });

  // Bottom text font size
  fontSize = canvas.width * bottomTextSize;
  ctx.font = `${fontSize}px Impact`;
  ctx.lineWidth = fontSize / 20;

  // Draw bottom text
  ctx.textBaseline = "bottom";
  bottomText
    .split("\n")
    .reverse()
    .forEach((t, i) => {
      // .reverse() because it's drawing the bottom text from the bottom up
      ctx.fillText(
        t,
        canvas.width / 2,
        canvas.height - i * fontSize,
        canvas.width
      );
      ctx.strokeText(
        t,
        canvas.width / 2,
        canvas.height - i * fontSize,
        canvas.width
      );
    });
}
window.addEventListener("DOMContentLoaded", (event) => {
  // Initialize variables
  const topTextInput = document.getElementById("top-text");
  const bottomTextInput = document.getElementById("bottom-text");
  const topTextSizeInput = document.getElementById("top-text-size-input");
  const bottomTextSizeInput = document.getElementById("bottom-text-size-input");
  const imageInput = document.getElementById("image-input");
  const generateBtn = document.getElementById("generate-btn");
  // Default/Demo text
  topTextInput.value = "Top\nValue";
  bottomTextInput.value = "Bottom\nValue";
  // Generate button click listener
  generateBtn.addEventListener("click", () => {
    // Read image as DataURL using the FileReader API
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        generateMeme(
          img,
          topTextInput.value,
          bottomTextInput.value,
          topTextSizeInput.value,
          bottomTextSizeInput.value
        );
      };
    };
    reader.readAsDataURL(imageInput.files[0]);
  });
});
// API call for getting Templates
function getTemplates() {
  fetch("https://api.imgflip.com/get_memes")
    .then((response) => response.json())
    .then((response) => {
      const { memes } = response.data;
      let html = '<div class="container">'; // Start with a container

      for (var i = 0; i < memes.length; i++) {
        // Add a new row for every third element
        if (i % 3 === 0) {
          html += '</div><div class="row">';
        }

        let htmlSegment = `<div class="col mb-4">
                          <div class="card" style="width: 18rem;">
                            <img src="${memes[i].url}" class="card-img-top">
                            <div class="card-body">
                              <h5 class="mt-0 mb-1">${memes[i].name}</h5>
                            </div>
                          </div>
                       </div>`;
        html += htmlSegment;
      }

      html += "</div>"; // Close the last row
      html += "</div>"; // Close the container

      let container = document.getElementById("templates");
      container.innerHTML = html;
    });
}

getTemplates();
