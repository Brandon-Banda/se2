# Software Engineering 2 Group C

Brandon Banda  
Daniel Avendano  
Rolando Garcia  
Carlos Martinez  

Good refs:  
- https://www.youtube.com/watch?v=fPuLnzSjPLE&t=619s  
- https://www.youtube.com/watch?v=Hej48pi_lOc  
- https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server  
- https://www.youtube.com/watch?v=Q3ixb1w-QaY  

### Packages:  
Vite, Express, Mysql12, cors,

## Init

1. Download and silently install NodeJS

```
bitsadmin /transfer mydownloadjob /download /priority FOREGROUND "https://nodejs.org/dist/v20.8.1/node-v20.8.1-x64.msi" "%USERPROFILE%\Downloads\nodeJS.msi" && MsiExec.exe /i %USERPROFILE%\Downloads\nodeJS.msi /qn
```
2. Download and silently install Git

```
bitsadmin /transfer mydownloadjob /download /priority FOREGROUND "https://github.com/git-for-windows/git/releases/download/v2.42.0.windows.2/Git-2.42.0.2-64-bit.exe" "%USERPROFILE%\Downloads\git.exe" && "%USERPROFILE%\Downloads\gitsetup.exe" && gitsetup.exe /VERYSILENT
```

3. Pull from repository and install modules  

git pull https://github.com/Brandon-Banda/se2.git  
cd SE2/backend && npm i  
cd SE2/frontend && npm i  

2 new terminals for runtime, 2 more terminals for command execution.  
npm start - start backend local development
npm run dev - start frontend local dev