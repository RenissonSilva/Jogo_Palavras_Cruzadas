const http = require('http');
const url = require('url');
const express = require('express');
const session = require('express-session');
const app = express();
var path = require("path");
var parts;
var letras;
var valorInput;
var pergunta;
var branco = 'white';
var num = 1;

    var array = [
[0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,7],
[0,0,2,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,8,0,0,-1],
[0,0,0,-1,0,5,0,0,0,0,0,0,6,0,-1,0,14,-1],
[0,0,4,-1,-1,-1,-1,-1,-1,-1,-1,0,-1,-1,-1,-1,-1,-1],
[0,0,10,-1,0,-1,0,9,0,0,0,0,-1,0,-1,0,-1,-1],
[0,0,-1,0,0,-1,0,-1,0,0,0,0,-1,0,-1,0,-1,0],
[0,0,-1,0,0,-1,0,-1,0,0,13,0,0,0,-1,0,-1,0],
[0,0,-1,0,12,-1,-1,-1,-1,-1,-1,0,-1,0,-1,0,-1,0],
[0,0,-1,0,0,-1,0,-1,0,0,-1,0,-1,0,-1,0,0,0],
[11,-1,-1,-1,-1,-1,-1,0,0,0,-1,0,-1,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0,0,0]
];

    var gabarito = [
['','','','','','','','','','','','','','','','','',''],
['','', '','f','r','i','e','n','d','s','','','','','','','',''],
['','','','l','u','c','i','f','e','r','','','','','','','','l'],
['','','','a','','','','','','','','','','','v','','','o'],
['','','','s','t','r','a','n','g','e','r','','t','h','i','n','g','s'],
['','','','h','','e','','','','','','','h','','k','','r','t'],
['','','e','','','v','','d','','','','','e','','i','','i',''],
['','','l','','','e','','a','','','','','','','n','','m',''],
['','','i','','','n','a','r','c','o','s','','1','','g','','m',''],
['','','t','','','g','','k','','','u','','0','','s','','',''],
['','s','e','n','s','e','8','','','','i','','0','','','','',''],
['','','','','','','','','','','t','','','','','','',''],
['','','','','','','','','','','s','','','','','','','']
];

var array2 =[
[0,0,1,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0],
[0,0,-1,0,0,0,3,0,0,0,-1,0,0,0,0,0,0,0],
[0,2,-1,-1,-1,-1,-1,-1,14,-1,-1,-1,-1,0,-1,-1,-1,0],
[0,0,-1,0,0,0,-1,0,0,0,-1,0,0,0,0,0,0,0],
[0,0,-1,0,0,0,-1,0,0,0,-1,0,0,0,0,0,0,0],
[0,0,-1,0,4,0,-1,0,6,0,-1,0,0,0,0,0,0,0],
[0,0,0,0,-1,5,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0],
[0,0,-1,0,-1,0,-1,0,-1,0,-1,0,0,0,0,0,0,0],
[0,0,-1,0,-1,0,-1,0,-1,0,0,12,0,0,0,0,0,0],
[0,0,-1,0,-1,0,0,11,-1,-1,-1,-1,-1,0,0,0,0,0],
[0,0,-1,0,-1,0,0,0,0,0,0,-1,0,0,0,0,0,0],
[7,-1,-1,-1,-1,-1,0,0,0,0,0,-1,0,0,0,0,0,0],
[0,0,-1,10,-1,-1,-1,-1,0,0,13,-1,-1,-1,-1,-1,-1,-1],
[0,0,8,-1,-1,-1,0,-1,-1,-1,0,-1,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0,0]
];
var gabFilmes =[
['','','','','','','','','','','','','','','','','',''],
['','','h','','','','','','','','t','','','','','','',''],
['','','a','v','a','t','a','r','','k','i','c','k','','a','s','s',''],
['','','r','','','','q','','','','t','','','','','','',''],
['','','r','','','','u','','','','a','','','','','','',''],
['','','y','','','','a','','','','n','','','','','','',''],
['','','','','m','','m','a','t','r','i','x','','','','','',''],
['','','p','','a','','a','','h','','c','','','','','','',''],
['','','o','','l','','n','','o','','','','','','','','',''],
['','','t','','e','','','','r','a','m','b','o','','','','',''],
['','','t','','v','','','','','','','a','','','','','',''],
['','v','e','n','o','m','','','','','','t','','','','','',''],
['','','r','','l','u','c','y','','','','m','a','t','i','l','d','a'],
['','','','m','a','d','','m','a','x','','a','','','','','',''],
['','','','','','','','','','','','n','','','','','','']
];
var array3 =[
[0,2,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,-1,-1,-1,-1,-1,0,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0],
[0,-1,0,0,0,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,-1,0,0,0,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,-1,0,0,4,-1,-1,-1,-1,-1,-1,0,-1,-1,-1,-1,-1,0,0,0],
[0,-1,0,9,-1,-1,-1,-1,-1,0,-1,-1,-1,-1,0,11,0,10,0,0],
[0,0,0,0,0,-1,0,0,0,0,0,0,0,0,0,-1,0,-1,0,0],
[0,-1,0,0,0,0,0,0,0,0,8,0,0,0,0,-1,0,-1,0,0],
[0,-1,0,0,0,-1,0,0,0,5,-1,-1,-1,-1,-1,-1,-1,-1,0,0],
[0,0,0,0,0,-1,0,0,0,0,-1,0,0,0,0,-1,0,-1,0,0],
[0,-1,0,0,0,-1,0,0,0,0,-1,0,0,0,0,0,0,0,0,0],
[0,-1,0,0,0,-1,0,0,6,-1,-1,-1,-1,0,-1,-1,-1,-1,0,0],
[0,-1,0,0,0,-1,0,0,0,0,-1,0,0,0,0,0,0,0,0,0],
[0,-1,0,0,0,-1,0,0,0,0,-1,0,0,0,0,0,0,0,0,0],
[0,-1,0,0,7,-1,-1,-1,-1,0,-1,-1,0,-1,-1,-1,-1,-1,-1,-1],
[0,0,0,0,0,-1,0,0,0,0,-1,0,0,0,0,0,0,0,0,0],
[12,-1,-1,-1,-1,-1,-1,0,0,0,-1,0,0,0,0,0,0,0,0,0]
]
var gabHQ =[
['','','','','','','','','','','','','','','','','','','',''],
['','h','o','m','e','m','','a','r','a','n','h','a','','','','','','',''],
['','o','','','','u','','','','','','','','','','','','','',''],
['','m','','','','l','','','','','','','','','','','','','',''],
['','e','','','','h','a','r','l','e','y','','q','u','i','n','n','','',''],
['','m','','','d','e','a','t','h','','n','o','t','e','','','','','',''],
['','','','','','r','','','','','','','','','','t','','h','',''],
['','d','','','','','','','','','','','','','','h','','u','',''],
['','e','','','','m','','','','','d','e','a','d','p','o','o','l','',''],
['','','','','','a','','','','','e','','','','','r','','k','',''],
['','f','','','','r','','','','','m','','','','','','','','',''],
['','e','','','','a','','','','j','o','h','n','','w','i','c','k','',''],
['','r','','','','v','','','','','l','','','','','','','','',''],
['','r','','','','i','','','','','i','','','','','','','','',''],
['','o','','','','l','i','g','a','','d','a','','j','u','s','t','i','ç','a'],
['','','','','','h','','','','','o','','','','','','','','',''],
['','b','a','t','m','a','n','','','','r','','','','','','','','','']
];

app.use(express.static(__dirname + '/html'));

// trata a requisicao da raiz no servidor (http://localhost:3000)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/html/index.html'));
})

// trata a requisicao do sobre no servidor (http://localhost:3000/sobre)
app.get('/sobre', (req, res) => {
    res.sendFile(path.join(__dirname+'/html/sobre.html'));
  // res.send('Sobre\n');
})

// trata a requisicao do jogar no servidor (http://localhost:3000/jogar)
app.get('/jogar', (req, res) => {
  res.sendFile(path.join(__dirname+'/html/jogar.html'));
})

app.get('/series', (req, res) => {

    var parts = url.parse(req.url, true);
    var query = parts.query;
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write(`<meta charset="UTF-8">`)
    res.write('<link rel="stylesheet" href="style.css">')
    res.write('<body>');
    res.write(`<h1 id="titulo"><a href="/" class="noEffect"> SERIES</a></h1>` )
    res.write(`<form action="/series" method="get">`)
    res.write('<table>');
    res.write('<div id="container">');
    for (var i = 0; i < array.length; i++) {
        res.write('<tr>');
        for (var j = 0; j < array[i].length; j++) {
            if (array[i][j] >0){
                res.write(`<td class="span">${array[i][j]}</td>`);
            }
            else if (array[i][j] == -1) {
                if (query[`l${i}-${j}`] == null){
                    res.write(`<td style="background-color:white;"><input type="text" maxlength=1 value="" id="box" name="l${i}-${j}"></td>`);
                }
                else if (query[`l${i}-${j}`] == gabarito[i][j]) {
                    res.write(`<td style="background-color:green;"><input type="text" maxlength=1 value="${query[`l${i}-${j}`]}" id="box" name="l${i}-${j}"></td>`);
                }else{
                    res.write(`<td style="background-color:red;"><input type="text" maxlength=1 value="" id="box" name="l${i}-${j}"></td>`);
                }
            }else{
                res.write(`<td></td>`);
            }
        }
        res.write('</tr>');
     }
     res.write('<div class=horizontal>')
     res.write("<b>Horizontal</b><br>");
     res.write("<br><b>1.</b> Central Perk / Grupo de amigos <br><b>2.</b> Comandante do inferno / Anjo que tirou férias<br> <b>4.</b> Demogorgon / Sobrenatural <br> <b>11.</b> 8 pessoas mentalmente ligadas <br> <b>12.</b>  Drogas / Tráfico");
     res.write('</div>')
    res.write('</table>');
    res.write('<div class=vertical>')
    res.write("<b>Vertical</b><br>")
    res.write("<br><b>3.</b> Série ruim / Rápido<br> <b>5.</b> Vingança(risos)<br><b>6.</b> Sobrevivente / Guerra nuclear <br><b>7.</b> Acidente aéreo em uma ilha<br><b>8.</b> Invasões / Ataques medievais<br><b>9.</b> Buraco de minhoca / Viagem no tempo <br><b>10.</b> Escola / Hierarquia<br><b>13.</b> Casos jurídicos / Advogados <br><b>14.</b> Contos de Terror / Criaturas mitológicas")
    res.write('</div>')
    res.write("<input class='botao' type=\"submit\" value='Verificar'>");
    res.write("</form>");
    // res.write("<a href="/"><h1 id="titulo2">VOLTAR</h1></a>")
    res.write(`<a href="/"><h1 id="titulo2">VOLTAR<h1></a>`);
    // res.write("<input class='botao' type=submit value='Entrar' onclick="location.href='/sobre'">");
    res.write('</html>');
    res.end();
});

app.get('/filmes', (req, res) => {
        var parts = url.parse(req.url, true);
    var query = parts.query;
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write(`<meta charset="UTF-8">`)
    res.write('<link rel="stylesheet" href="style.css">')
    res.write('<body>');
    res.write(`<h1 id="titulo"><a href="/" class="noEffect">FILMES</a></h1>` )
    res.write(`<form action="/filmes" method="get">`)
    res.write('<table>');
    res.write('<div id="container">');
    for (var i = 0; i < array2.length; i++) {
        res.write('<tr>');
        for (var j = 0; j < array2[i].length; j++) {
            if (array2[i][j] >0){
                res.write(`<td class="span">${array2[i][j]}</td>`);
            }
            else if (array2[i][j] == -1) {
                if (query[`l${i}-${j}`] == null){
                    res.write(`<td style="background-color:white;"><input type="text" maxlength=1 value="" id="box" name="l${i}-${j}"></td>`);
                }
                else if (query[`l${i}-${j}`] == gabFilmes[i][j]) {
                    res.write(`<td style="background-color:green;"><input type="text" maxlength=1 value="${query[`l${i}-${j}`]}" id="box" name="l${i}-${j}"></td>`);
                }else{
                    res.write(`<td style="background-color:red;"><input type="text" maxlength=1 value="" id="box" name="l${i}-${j}"></td>`);
                }
            }else{
                res.write(`<td></td>`);
            }
        }
        res.write('</tr>');
     }
     res.write('<div class=horizontal>')
     res.write("<b>Horizontal</b><br>");
     res.write("<br><b>2.</b>Azul / Pandora <br><b>5. </b>Realidade simulada <br><b>7.</b> Simbiose<br><b>8. </b>Rebeldes / Escassez de água <br><b>10.</b>Drogas / 100% da capacidade cerebral <br><b>11.</b>Veterano de guerra do vietnã <br><b>13.</b>Menina superdotada/conflito familiar <br><b>14.</b>Comédia / Influênciador de herói ");
     res.write('</div>')
    res.write('</table>');
    res.write('<div class=vertical>')
    res.write("<b>Vertical</b><br>")
    res.write("<br><b>1. </b> Trouxas / Brilhante<br><b>3.</b> Tridente / Atlântida<br><b>4. </b> Jovem / Chifre<br><b>6.</b> Martelo<br><b>9.</b> Navio / Casal <br><b>12.</b>Presenciou a morte dos pais ")
    res.write('</div>')
    res.write("<input class='botao' type=\"submit\" value='Verificar'>");
    res.write("</form>");
    // res.write("<a href="/"><h1 id="titulo2">VOLTAR</h1></a>")
    res.write(`<a href="/"><h1 id="titulo2">VOLTAR<h1></a>`);
    // res.write("<input class='botao' type=submit value='Entrar' onclick="location.href='/sobre'">");
    res.write('</html>');
    res.end();
});
app.get('/hq', (req, res) => {

    var parts = url.parse(req.url, true);
    var query = parts.query;
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write(`<meta charset="UTF-8">`)
    res.write('<link rel="stylesheet" href="style.css">')
    res.write('<body>');
    res.write(`<h1 id="titulo"><a href="/" class="noEffect">HQ</a></h1>` )
    res.write(`<form action="/hq" method="get">`)
    res.write('<table>');
    res.write('<div id="container">');
    for (var i = 0; i < array3.length; i++) {
        res.write('<tr>');
        for (var j = 0; j < array3[i].length; j++) {
            if (array3[i][j] >0){
                res.write(`<td class="span">${array3[i][j]}</td>`);
            }
            else if (array3[i][j] == -1) {
                if (query[`l${i}-${j}`] == null){
                    res.write(`<td style="background-color:white;"><input type="text" maxlength=1 value="" id="box" name="l${i}-${j}"></td>`);
                }
                else if (query[`l${i}-${j}`] == gabHQ[i][j]) {
                    res.write(`<td style="background-color:green;"><input type="text" maxlength=1 value="${query[`l${i}-${j}`]}" id="box" name="l${i}-${j}"></td>`);
                }else{
                    res.write(`<td style="background-color:red;"><input type="text" maxlength=1 value="" id="box" name="l${i}-${j}"></td>`);
                }
            }else{
                res.write(`<td></td>`);
            }
        }
        res.write('</tr>');
     }
     res.write('<div class=horizontal>')
     res.write("<b>Horizontal</b><br>");
     res.write("<br><b>1.</b> Teia <br><b>4.</b> Coringa<br> <b>5.</b> Imortal / Engraçado <br> <b>6.</b> Assassino aposentado <br> <b>7.</b>  União de heróis <br> <b>9.</b> Caderno<br> <b>12.</b>Presenciou a morte dos pais");
     res.write('</div>')
    res.write('</table>');
    res.write('<div class=vertical>')
    res.write("<b>Vertical</b><br>")
    res.write("<br><b>2.</b> Herói / Rico<br> <b>3.</b> Chicote<br><b>8.</b> Cego <br><b>10.</b> Verde<br><b>11.</b> Martelo")
    res.write('</div>')
    res.write("<input class='botao' type=\"submit\" value='Verificar'>");
    res.write("</form>");
    // res.write("<a href="/"><h1 id="titulo2">VOLTAR</h1></a>")
    res.write(`<a href="/"><h1 id="titulo2">VOLTAR<h1></a>`);
    // res.write("<input class='botao' type=submit value='Entrar' onclick="location.href='/sobre'">");
    res.write('</html>');
    res.end();
});
// trata a requisicao da ajuda do servidor (http://localhost:3000)
app.get('/instru', (req, res) => {
  res.sendFile(path.join(__dirname+'/html/instru.html'));
});

app.use(session({ secret: 'XXassasas¨¨$', resave: false, saveUninitialized: true }));

// entre em localhost:3000 para escrever os dados na sessao
app.get('/', function(req, res, next) {
    // pega todos os valores presentes na sessao
    var dados = req.session;
    // coloca na sessao uma entrada chamada curso com o valor 'informatica para internet'
    dados.curso = "Informatica para Internet";

    res.send('Dados escritos na sessao');
});

// entre em localhost:3000/nome para ver os dados escritos na sessao
app.get('/nome', function(req, res, next) {
    // pega o valor da entrada chamada curso na sessao
    var curso = req.session.curso;

    // imprime o valor da variavel curso
    res.send(`Nome do Curso: ${curso}`);
});

app.listen(3000, () => {
  console.log('Escutando localhost:3000');
})
const host = 'localhost';
const porta = 3000;


