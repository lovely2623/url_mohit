// import { readFile } from "fs/promises";
// import {createServer} from "http";
// import path from "path";


// const PORT = 3000;
// const server = createServer(async(req,res)=>{
//     console.log(req.url)
// if(req.method==="GET"){
//     if(req.url==="/"){
//         try{
//             const data = await readFile(path.join("public","index.html"));
//             res.writeHead(200,{"Content-type": "text/html"});
//             res.end(data);
//         }
//            catch(error){
//               res.writeHead(404,{'Content-type':"text/html"});
//                 res.end("404 page not found");
            
//            }
//     }
//     else if (req.method==="GET"){
//     if(req.url==="/style.css"){
//         try{
//             const data = await readFile(path.join("public","style.css"));
//             res.writeHead(200,{"Content-type": "text/css"});
//             res.end(data);
//         }
//            catch(error){
//               res.writeHead(404,{'Content-type':"text/html"});
//                 res.end("404 page not found");
            
//            }
//     }}
// }
// });

// server.listen(PORT,()=>{
//     console.log("server running 3000 local host ://")
// });