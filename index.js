const express = require('express');
const http = require('node:http');
const { uvPath } = require('@titaniumnetwork-dev/ultraviolet');
const path = require('node:path');

const app = express();
const server = http.createServer(app);

// 1. 服務靜態首頁文件
app.use(express.static(path.join(__dirname, 'public')));

// 2. 服務 Ultraviolet 核心腳本
app.use('/uv/', express.static(uvPath));

// 3. 處理代理邏輯
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public/404.html'));
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Proxy is running on http://localhost:${port}`);
});
