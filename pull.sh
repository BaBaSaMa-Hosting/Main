echo 'Starting Git Pull'

sudo git pull
sudo git submodule update
sudo yarn
sudo forever restartall
sudo forever list

echo 'Finish Git Pull'