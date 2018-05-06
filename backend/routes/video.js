const express = require('express');
const {assets_path} = require('../../bin/config/paths')
const fs = require('fs');
const route = express.Router() ;

//object contains all the video id and their paths.
const videoMap = new Object();
videoMap['001'] = "secret_video_name.m4v";

//filesysyem function to check if the given video file exists or not
function checkFileExists(filepath){
    return new Promise((resolve, reject) => {
      fs.access(filepath, fs.F_OK, error => {
        resolve(!error);
      });
    });
  }


//error object
const error = new Object();

//return this json object when the requested video doesnt not exist
error['fileDoesntExist'] = {
    code:1,
    message:"Video Doesn't Exist"
}

//express route for our videos. the param videoid is required.
route.get('/:videoid',async (req,res)=>{

    //get the fill path to the video file
    const videoPath = assets_path + '/' + videoMap[req.params.videoid]

    //check if the file exist
    const data = await checkFileExists(videoPath);
    if(data) {
        //if the file exists stream it
        await stream(videoPath,res,req);
    }
    else {
        //if the file doesnt exist then send the error JSON
        res.send(error['fileDoesntExist']);
    }


 
   
});

//function which streams a video file. Required parameters: videoPath, request, resolve.
 const stream = async (videoPath,res,req) => {

    //inner function to get the stat of the video file
    const stat = (videoPath )=> new Promise ((resolve,rej)=>{
       
        fs.stat(videoPath,(error,data)=>{
            
            resolve(data)});
    });

const statOfFile = await stat(videoPath);
const fileSize = statOfFile.size
//header range
const range = req.headers.range
//prepare packet
if (range) {
  const parts = range.replace(/bytes=/, "").split("-")
  const start = parseInt(parts[0], 10)
  const end = parts[1] 
    ? parseInt(parts[1], 10)
    : fileSize-1
  const chunksize = (end-start)+1
  const file = fs.createReadStream(videoPath, {start, end})
  const head = {
    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': chunksize,
    'Content-Type': 'video/m4v',
  }
  //send header
  res.writeHead(206, head);
  //stream
  file.pipe(res);
} else {
    //for first response
  const head = {
    'Content-Length': fileSize,
    'Content-Type': 'video/m4v',
  }
  res.writeHead(200, head)
  fs.createReadStream(videoPath).pipe(res)
}




        
 
};
module.exports = route;