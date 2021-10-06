echo "Starting Script"

sudo forever start ./app.js
sudo forever start ./API/app.js
sudo forever start ./Expo-Notification-Test/app.js
sudo forever start ./Phantom/app.js
sudo forever start ./Portfolio/app.js

sudo forever list

echo "Script Complete"