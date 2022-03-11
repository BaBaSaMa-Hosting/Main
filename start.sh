echo "Starting Script"

sudo yarn
sudo forever start ./app.js
sudo forever list

echo "Script Complete"