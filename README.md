# oneringmatch.com
This is an unofficial character generator to the game The One Ring 2ed.

## Back-end

### Configure Development Environment
```
cd back-end
pip install virtualenvwrapper-win
mkvirtualenv oneringmatch
pip install -r requirements.txt
```

### Other commands
```
pip freeze > requirements.txt
workon oneringmatch
rmvirtualenv oneringmatch
```

## Front-end

### Configure Development Environment
```
PATH=%PATH%;C:\dev\node\node-v20.11.1-win-x64
npm install @mui/material @mui/icons-material @fontsource/roboto @emotion/react @emotion/styled
npm install react-router react-router-dom
npm install axios
```

### Other commands
```
npm run start
npm run dev
npm run build
```
