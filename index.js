// cdn-server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const fs = require("fs");
const cdnfolder = "https://github.com/FloppaDev15/Websitefloppa/tree/3d2288477d3933605642172adeef024998045860/cdn";
// Serve static files from different "CDN" directories
app.use("/", express.static(path.join(__dirname, "public")))
app.use('/mp4', express.static(path.join(__dirname, 'cdn/mp4'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.mp4')) {
      res.setHeader('Content-Type', 'video/mp4');
      res.setHeader('Accept-Ranges', 'bytes');
    }
  }
}));

app.use('/wav', express.static(path.join(__dirname, 'cdn/wav'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.wav')) {
      res.setHeader('Content-Type', 'audio/wav');
      res.setHeader('Accept-Ranges', 'bytes');
    }
  }
}));

app.use('/img', express.static(path.join(__dirname, 'cdn/img'), {
  setHeaders: (res, path) => {
    const ext = path.toLowerCase().split('.').pop();
    const contentTypes = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'webp': 'image/webp',
      'svg': 'image/svg+xml',
      'ico': 'image/x-icon',
      'bmp': 'image/bmp'
    };
    
    if (contentTypes[ext]) {
      res.setHeader('Content-Type', contentTypes[ext]);
    }
  }
}));

fs.watch(cdnfolder, (eventType, fileName) => {
    if(eventType === "rename") {
        console.log(`${fileName} è stato aggiunto/eliminato`)
    }
})

// Enable CORS for cross-origin requests
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get("/trailer2")

app.listen(PORT, () => {
    console.log(`Local CDN running at http://localhost:${PORT}`);
});