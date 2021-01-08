//*************Functionalities */
function listS2H(array) {
  var htmlTable =
    "<thead><tr><th>Nome</th><th>Apelido</th><th>Gênero</th><th>Time</th><th>Número</th><th>Nacionalidade</th><th>G</th> <th>A</th> <th>D</th> <th>Jogos</th> <th>Gm</th> <th>Am</th> <th>Dm</th>  <th>MVP</th> </tr></thead>";
  htmlTable += "<tbody>";
  array.forEach(function (element) {
    htmlTable += "       <tr>";
    for (var prop in element) {
      htmlTable += "<td>";
      htmlTable += element[prop];
      htmlTable += "</td>";
    }
    htmlTable += "</tr>";
  });
  htmlTable += "</tbody>";
  return htmlTable;
}


function logS2H(array){
  
}


function listM2H(array) {
  var htmlTable =
    "<thead><tr><th>Nome</th><th>Apelido</th><th>Gênero</th><th>Time</th><th>Número</th><th>Nacionalidade</th><th>G</th> <th>A</th> <th>D</th> <th>Jogos</th> <th>Gm</th> <th>Am</th> <th>Dm</th>  <th>MVP</th> </tr></thead>";
  htmlTable += "<tbody>";
  console.log("array:"+array);
  array.forEach(function (element) {
    htmlTable += '<tr><td><a href="/player-' + element._id + '">';
    htmlTable += element.name;
    htmlTable += "<a></td><td>";
    htmlTable += element.nickname;
    htmlTable += "</td><td>";
    htmlTable += element.gender;
    htmlTable += "</td><td>";
    htmlTable += '<a href="/team-' + element.team + '">' + element.team;
    htmlTable += "</td><td>";
    htmlTable += element.number;
    htmlTable += "</td><td>";
    htmlTable += element.country;
    htmlTable += "</td><td>";
    htmlTable += element.goals;
    htmlTable += "</td><td>";
    htmlTable += element.defenses;
    htmlTable += "</td><td>";
    htmlTable += element.assists;
    htmlTable += "</td><td>";
    htmlTable += element.games;
    htmlTable += "</td><td>";
    htmlTable += element.goalsAv;
    htmlTable += "</td><td>";
    htmlTable += element.defensesAv;
    htmlTable += "</td><td>";
    htmlTable += element.assistsAv;
    htmlTable += "</td><td>";
    htmlTable += element.MVP;
    htmlTable += "</td></tr>";
  });
  htmlTable += "</tbody>";
  return htmlTable;
}


/*******************************/

function scheduleS2H(array) {
  var htmlTable =
    "<thead><tr><th>Jogo</th><th>Campo </th><th>Time A</th><th>Gols A</th><th>Gols B</th><th>Time B</th><th>Data</th> </tr></thead>";
  htmlTable += "<tbody>";
  array.forEach(function (element) {
    htmlTable += "       <tr>";
    for (var prop in element) {
      htmlTable += "<td>";
      htmlTable += element[prop];
      htmlTable += "</td>";
    }
    htmlTable += "</tr>";
  });
  htmlTable += "</tbody>";
  return htmlTable;
}