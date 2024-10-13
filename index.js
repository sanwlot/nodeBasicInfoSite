const http = require("http")
const fs = require("fs")
const path = require("path")

const server = http.createServer((req, res) => {
  const filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  )
  const extName = path.extname(filePath)
  let contentType = "text/html"
  switch (extName) {
    case ".js":
      contentType = "text/javascript"
      break
    case ".css":
      contentType = "text/css"
      break
    case ".json":
      contentType = "application/json"
      break
    case ".png":
      contentType = "image/png"
      break
    case ".jpg":
      contentType = "image/jpg"
      break
  }
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(200, { "Content-Type": "text/html" })
            res.end(content, "utf8")
          }
        )
      } else {
        res.writeHead(500)
        res.end("SERVER ERROR", err.code)
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType })
      res.end(content)
    }
  })
})

const PORT = process.env.PORT || 9100
server.listen(PORT, () => console.log(`server is listening at port ${PORT}`))
