echo "Starting Script"

sudo yarn
sudo forever start ./app.js
sudo forever start ./API/app.js
sudo forever start ./Phantom/app.js
sudo forever start ./Storage/app.js
sudo forever start ./Home-Management/Home-Management-Web/app.js

sudo forever list

echo "Script Complete"