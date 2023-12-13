# QuizMasters


******************GITGUIDE**************************

---------Lite kommandon-------------

git add . --- Lägg till allt till att bli committat

git commit -m "Mitt meddelande" --- commitar ändringarna lokalt

git push --- laddar upp ändringar.

git switch 'BranchName' --- byt Branch 

git merge 'BranchName' --- mergar branchen du är på, med branchen du väljer i BranchName

git pull --- laddar ned senaste uppdateringar för branchen du är på.


---------standard procedure för att merga med main-------------

Va på din egna branch och commita och pusha in allt först.

  "git add .", "git commit -m <meddelande som beskriver vad du gjort förhoppningsvis>" och "git push" så finns allt i din egna branch.
  
Byt till main och pulla ned senaste main.

  "git switch main", "git pull"
  
Byt tillbaka till din egna branch och merga

  "git switch <din branch>", "git merge main". Blir det konflikt så lös dem här först. Så att när du mergar in din branch i mainen så vet man att det funkar.
  
Om det är noll konflikter, byt till main igen och merga in din egna branch, och pusha ny main.

  "git switch main", "git merge <din branch>", "git push"

--->Alternativ på sista steget:
Om du vill göra pull request istället för att merga in i mainen (Mer som det kommer va på riktigt)

Istället för sista steget, efter att man mergat main in i sin egna branch och löst konflikter, så får man gå via hemsidan.

  På repositoryt (QuizMasters) tryck på "Pull requests", sedan "New pull request" till höger på sidan. 
  
  Så kan du välja din egna branch, create pull request och sen tror jag du kan godkänna den själv direkt efter.
  
  Den måste godkännas för att åka in i main.

---> Enklaste vägen för alltihop:
1. git add .
2. git commit -m "min uppdatering är så bra"
3. git switch main
4. git pull
5. git switch <din branch>
6. git merge main
  6.1. Lös alla konflikter(Om det finns några)
7. git push
8. Gör en pull request på hemsidan
