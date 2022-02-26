# image proccesing api
## to install packages run `npm install`
## scripts 
    "prettier": will run prettier on the code
    "lint": will run eslint on the code
    "jasmine": run tests functions
    "start": will listen to changes in ts and json file and then run prettier and start the server
    "build": build to js and then start
    "test":  build to js and then test
    "testCont":will listen to changes in ts and json file and then build to js and then test 

## Features

- Add image to full folder(using front end) 
-- api:( / )
-- example : http://localhost:3000/
--- 
- resize image['.jpeg', '.png', '.jpg'] from the full images 
-- api:( /resize?imgName=NAME&width=NUMBER&height=NUMBER )
--example : http://localhost:3000/resize?imgName=encenadaport.jpg&width=200&height=200
--- 
- show image from the path 
-- api( /showImage?imgPath=(absuolte path of the image) )
-- example : /showImage?imgPath=C:\Users\zezo_\Desktop\WebDev\image api\Images\Full\encenadaport.jpg
---
- /resizeForm used to transform resize from form to query strings
