# HISTORY ...

# npm setup
sudo rm -rf /usr/local/lib/node_modules/npm
brew reinstall node
npm uninstall -g create-react-app
npx create-react-app vitaledge-frontend
less nginx.conf

# Installing packages
npm install react-router-dom
npm install axios
npm install @mui/material @emotion/react @emotion/styled

npm audit
npm audit fix

# Git and directory structure
diff HEAD src/App.js
remote get-url --push origin
tree .

# Starting and stopping the frontend React application
npm start
# ^C to stop

# Docker build, run, stop
docker build -t vitalegde-frontend .

docker run -d -p 3000:80 vitalegde-frontend
docker run --rm -d -p 3000:80 vitalegde-frontend

docker ps
docker stop 154e7964661adda759313ff5396c440fc520c9a3b2ccea61f555b4b7b4eee8c5

lsof -i :3000

# Last working environment:
node --version      # v22.10.0
npm --version       # 10.9.0

docker --version    # Docker version 20.10.11, build dea9396



# XR:

# Setup
npm install aframe