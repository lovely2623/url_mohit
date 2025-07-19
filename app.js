import { readFile,writeFile } from "fs/promises";
import {createServer} from "http";
import path from "path";
import crypto from"crypto";
// import { writeFile } from "fs";
import { existsSync, mkdirSync } from "fs";
const PORT = 3001;

const DATA_FILE = path.join("data", "links.json");



const servefile = async ( res,filepath,contentType)=>{
    try{
    const data = await readFile(filepath);
res.writeHead(200, {"Content-Type": contentType});
    res.end(data);
 }catch(error){
                res.writeHead(404,{'Content-type':"text/plain"});
                res.end("404 page not found");}};



const loadlinks =async()=>{
    try{
       const data = await readFile(DATA_FILE , "utf-8");
       return JSON.parse(data); 

    }catch (error){
        if(error.code ==="ENOENT"){
          await writeFile(DATA_FILE, JSON.stringify({}));
          return {};
        }

    }
    throw error;
}



const savelinks = async (links)=>{
   await writeFile (DATA_FILE, JSON.stringify(links));

};
                
const server = createServer(async(req,res)=>{


if(req.method==="GET"){
              if(req.url==="/"){
              return servefile(res, path.join("public","index.html"), "text/html");
                }
                else if (req.url==="/style.css"){
               return servefile(res, path.join("public","style.css"), "text/css");
                }
                else if(req.url==="/links"){
                       const links = await loadlinks();
             res.writeHead(200, {"Content-Type": "application/json"});
             return res.end(JSON.stringify(links));

                }else{
                    const links = await loadlinks();
                   const shortcode = req.url.slice(1);
                   if(links[shortcode]){
                    res.writeHead(302, {location : links[shortcode]})
                    return res.end();   
                }
                 res.writeHead(400, {"Content-Type": "text/plain"});
            return res.end("Url is not found");  
                }
}

if(req.method==="POST" && req.url==="/shorten"){
     console.log("Received request at /shorten"); 

    const links = await loadlinks();

    let body ="";
    req.on("data", (chunk)=>{
       body += chunk;
    });
    req.on("end" ,async()=>{
        console.log(body)
        const{url,shortcode }= JSON.parse(body);
        

        if(!url){
            res.writeHead(400, {"Content-Type": "text/plain"});
            return res.end("Url is required");
        }

        const finalshortcode = shortcode || crypto.randomBytes(4).toString("hex");

        if(links[finalshortcode]){
            res.writeHead(400, {"Content-Type": "text/plain"});
            return res.end("short code already exits choose another");
        }
 
      links[finalshortcode]= url;
      await savelinks(links);

                  res.writeHead(200, {"Content-Type": "application/json"});
                  res.end(JSON.stringify({succesfull:true , shortcode:finalshortcode}));

 
    })
}




});






server.listen(PORT,()=>{
    console.log("server running 3001 local host ://")
});