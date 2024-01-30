# MERN Stack Blog article Frontend 
This is the frontend UI code for the https://mern-blog-app.netlify.app/. 


## You can test this app with just a few steps, clone this git repository and follow the following steps
                
1.  install NodeJS.
2.  install dependencies  
`$ npm install`
3. Create an TinyMCE account for rich text editor and generate the secret key.
4. After you have installed the dependencies, create `.env` file on the root of the project `/` with following variables
  
  ```javascript
VITE_backend=http://localhost:5000
VITE_tiny="<TinyMCE secret key>"
  ```
4. run `$ npm run dev`
5. enjoy the frontend
