/************* Functionalities *************/

function list2H(array) {
  console.log("list2h");
  var htmlTable =
    "<thead><tr><th>Nome</th><th>Apelido</th><th>Gênero</th><th>Time</th><th>Número</th><th>Nacionalidade</th><th>G</th> <th>A</th> <th>D</th> <th>Jogos</th> <th>Gm</th> <th>Am</th> <th>Dm</th>  <th>MVP</th> </tr></thead>";
  htmlTable += "<tbody>";
  array.forEach(function (element) {
    if (element._id) {
      htmlTable += '<tr><td><a href="/player-' + element._id + '">';
      htmlTable += element.name;
      htmlTable += "</a></td><td>";
    } else {
      htmlTable += "<tr><td>";
      htmlTable += element.name;
      htmlTable += "</td><td>";
    }

    htmlTable += element.nickname;
    htmlTable += "</td><td>";
    htmlTable += element.gender;
    htmlTable += "</td><td>";
    htmlTable += '<a href="/team-' + element.team + '">';
    htmlTable += element.team + "</a>";
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

function schedule2H(array) {
  var htmlTable =
    "<thead><tr><th>Jogo</th><th>Hora</th><th>Campo</th><th>Time A</th><th>Gols A</th><th>Gols B</th><th>Time B</th></tr></thead>";
  htmlTable += "<tbody>";
  console.log("array:" + array);
  array.forEach(function (element) {
    htmlTable += '<tr><td><a href="/game-' + element.game + '">';
    htmlTable += element.game + "</a>";
    htmlTable += "</td><td>";
    htmlTable += element.date;
    htmlTable += "</td><td>";
    htmlTable += element.field;
    htmlTable += "</td><td>";
    htmlTable += '<a href="/team-' + element.teamA + '">';
    htmlTable += element.teamA + "</a>";
    htmlTable += "</td><td>";
    htmlTable += element.scoreA;
    htmlTable += "</td><td>";
    htmlTable += element.scoreB;
    htmlTable += "</td><td>";
    htmlTable += '<a href="/team-' + element.teamB + '">';
    htmlTable += element.teamB + "</a>";
    htmlTable += "</td></tr>";
  });
  htmlTable += "</tbody>";
  return htmlTable;
}

function log2H(array) {
  var htmlTable =
    "<thead><tr><th>Ocorrência</th><th>Jogo</th><th>Data</th><th>Tempo</th><th>Time A</th><th>Placar A</th><th>Placar B</th><th>Time B</th><th>Time</th><th>J1 (As)</th><th>J2(Ar)</th> </tr></thead>";
  htmlTable += "<tbody>";
  array.forEach(function (element) {
    if (element.id) {
      htmlTable += '<tr><td><a href="/ocorrence-' + element._id + '">';
      htmlTable += element.ocorrence + "</a>";
    } else {
      htmlTable += "<tr><td>";
      htmlTable += element.ocorrence;
    }
    htmlTable += "</td><td>";
    htmlTable += '<a href="/game-' + element.game + '">';
    htmlTable += element.game + "</a>";
    htmlTable += "</td><td>";
    htmlTable += element.date;
    htmlTable += "</td><td>";
    htmlTable += element.elapsed;
    htmlTable += "</td><td>";
    htmlTable += '<a href="/team-' + element.teamA + '">';
    htmlTable += element.teamA + "</a>";
    htmlTable += "</td><td>";
    htmlTable += element.scoreA;
    htmlTable += "</td><td>";
    htmlTable += element.scoreB;
    htmlTable += "</td><td>";
    htmlTable += '<a href="/team-' + element.teamB + '">';
    htmlTable += element.teamB + "</a>";
    htmlTable += "</td><td>";
    htmlTable += '<a href="/team-' + element.teamO + '">';
    htmlTable += element.teamO + "</a>";
    htmlTable += "</td><td>";
    htmlTable += '<a href="/player-' + element.player1._id + '">';
    htmlTable += element.player1.name + "</a>";
    htmlTable += "</td><td>";
    htmlTable += '<a href="/team-' + element.player2._id + '">';
    htmlTable += element.player2.name + "</a>";
    htmlTable += "</td></tr>";
  });

  htmlTable += "</tbody>";
  return htmlTable;
}
