cd this/misc

if [ ! -d bare ]
then
    git clone https://github.com/tomphttp/bare-client bare
fi

cd bare

git pull

npm install
npm run build