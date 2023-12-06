# Software Engineering 2 Group C

Brandon Banda  
Daniel Avendano  
Rolando Garcia  
Carlos Martinez

# General Use

Home page shows the full list of entries that can be searched through via the Search button. You may also update data here.

Clicking Add/Delete routes you to a separate page in which you can fill out a form to create an entry on submission.

You may also delete an entry on this page using a unique CRN. Home button takes you back to view the DB.

### Packages:

Vite, Express, Mysql12, cors,

## Initialization

1. Download and silently install NodeJS

https://nodejs.org/en/about

```
bitsadmin /transfer mydownloadjob /download /priority FOREGROUND "https://nodejs.org/dist/v20.8.1/node-v20.8.1-x64.msi" "%USERPROFILE%\Downloads\nodeJS.msi" && MsiExec.exe /i %USERPROFILE%\Downloads\nodeJS.msi /qn
```

2. Download and silently install Git

```
bitsadmin /transfer mydownloadjob /download /priority FOREGROUND "https://github.com/git-for-windows/git/releases/download/v2.42.0.windows.2/Git-2.42.0.2-64-bit.exe" "%USERPROFILE%\Downloads\gitsetup.exe" && "%USERPROFILE%\Downloads\gitsetup.exe" && gitsetup.exe /VERYSILENT
```

3. Incase you dont have VSCode

```
bitsadmin /transfer mydownloadjob1 /download /priority FOREGROUND "https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user" "%USERPROFILE%\Desktop\Code.exe" && %USERPROFILE%\Desktop\Code.exe /VERYSILENT /NORESTART /MERGETASKS=!runcode,associatewithfiles
```

4. Clone from repository and install modules

Open terminal and CD to a path you would like to create a folder inside of

```
git clone https://github.com/Brandon-Banda/se2.git
```

```
cd se2/backend && npm i
```

```
cd..\frontend\ && npm i
```

5. Create a .env file inside /se2 and enter the connection information

2 new terminals for runtime, 2 more terminals for command execution.

In terminal 1 for Backend:

```
cd backend && npm start
```

In terminal 2 for Frontend:

```
cd frontend && npm run dev
```

Good refs:

- https://www.youtube.com/watch?v=fPuLnzSjPLE&t=619s
- https://www.youtube.com/watch?v=Hej48pi_lOc
- https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
- https://www.youtube.com/watch?v=Q3ixb1w-QaY
- https://www.youtube.com/watch?v=jb0aK1d38VM
