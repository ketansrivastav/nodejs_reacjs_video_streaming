
const {frontend_src,dev_www} = require('./paths.js')
const path = require('path');

module.exports = {
    
        // Configuration Object  
    
           
            context: path.resolve('.'),
            entry: {
                app:[frontend_src + '/app.js']
            },
    
            output: {
    
              path: dev_www + '/',
              publicPath: dev_www + '/',
              filename: "bundle.js"
    
            },
    
            module:{
    
              rules:[
    
                //   {
    
                //       test:/\.css$/,
    
                //       use:['style-loader','css-loader']
    
                //   }
    
                
                    {
                      test: /\.js$/,
                      exclude: /node_modules/,
                      use: {
                        loader: "babel-loader",
                     
                      query : {
                        presets: ["env", "react"],
                        
                        
                      }
                    }, 
                    }
                  
    
             ],
    
          },
    
                
    
      }