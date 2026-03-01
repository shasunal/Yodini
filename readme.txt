one time setup:
check what branch you are on: git branch
switch to main: git checkout main
pull from main updates: git pull origin main
create your branch: git checkout -b your-name-branch
do this one time to connect your branch to github: git push -u origin your-branch-name

for all future updates:
update yourself:
switch to your branch: git checkout your-name-branch
pulls latest from your branch: git pull
pulls main into your branch: git pull origin main
push worK:
...do work...
git add .
git commit -m ""
git push

go to github and do new pull request, choose yourself, and merge