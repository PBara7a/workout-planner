const download = require("images-downloader").images;
const fs = require("fs");
const exercises = require("../../exercises.json");

// The file will be downloaded to this directory. For example: __dirname + '/mediatheque'
const dest = "C:/Users/pbara/OneDrive/Documents/Boolean/exercise/assets";

// An array of image(s) to download
const imageUrls = exercises.map((exercise) => exercise.gifUrl);

const downloadGifs = (startIndex, endIndex) => {
  for (let i = startIndex; i < endIndex; i++) {
    download([imageUrls[i]], dest)
      .then((result) => {
        console.log("Images downloaded", result);

        result.map((item) => {
          let pathPart1 = item.filename.split("/");
          pathPart1 = pathPart1.slice(0, pathPart1.length - 1).join("/");

          const pathPart2 = item.url.split("/").pop();

          fs.rename(item.filename, `${pathPart1}/${pathPart2}`, (err) => {
            if (err) {
              return console.error(err);
            }
          });
        });
      })
      .catch((error) => console.log("downloaded error", error));
  }
};

downloadGifs(1300, imageUrls.length - 1);
