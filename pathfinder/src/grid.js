import { useState } from 'react';
import Navbar from './Navbar';

const Grid = () => {

class Node {
constructor(x, y,z) {
     this.x = x;
     this.y = y;
     this.z = z;
}
}


class Pair {
constructor(x,y){
     this.x = x;
     this.y = y;
}
}


// function to get index of clicked element 
const index = (id) => {
let ind = 0;
for(var i = 0;i<id.length;i++){
     if(id[i]===" "){
          ind = i;
          break;
     }
}
var x = Number(id.slice(0,ind));
var y = Number(id.slice(ind+1,id.length));
return [x,y];
}



var Gridarr = new Array(50);
var CalledBy = new Array(50);
const g = new Pair(-1,-1);
for(let i = 0;i<50;i++){
Gridarr[i] = new Array(70);
CalledBy[i] = new Array(70);
for(let j = 0;j<70;j++){
     Gridarr[i][j] = 0;
     CalledBy[i][j] = g;
}
}

var arr = [];
for(let i = 0;i<50;i++){
     var arr2 = [];
     for(let j = 0;j<70;j++){
          var node = new Node(i,j,i+" "+j);
          arr2.push(node);
     }
     arr.push(arr2)
}

const ac = new AbortController();
const signal = ac.signal;
const [mainArr,setMainArr] = useState(Gridarr);
const [doneChanging,setdoneChanging] = useState(0);
const [canChange,setcanChange] = useState(true);
const [startingNode,setStartingNode] = useState([]);
const [chooseAlgo, setChooseAlgo] = useState(-1); // changes for dfs
const [algoset,setAlgoset] = useState(false);
const [stop, setStop] = useState(false);
const endingNode = [];


var dx = [1,-1,0,0];
var dy = [0,0,1,-1];



// function to check a valid node : ------------------
const check = (x,y) => {
     if(x<0 || y<0 || x>=50 || y>=70 || Gridarr[x][y]===-1 || Gridarr[x][y]===1)return false;
     return true;
}
// ---------------------------------------------------------



const findPath = (last) => {
     var p = last.x + " " + last.y;

     if(last.x==startingNode[0] && last.y==startingNode[1])return; 

     document.getElementById(p).style.background = "#60f149";
     var g = CalledBy[last.x][last.y];  

     findPath(g);  
}


const sleep = (milliseconds) => {
return new Promise(resolve => setTimeout(resolve, milliseconds))
}

var yellowNodes = [];

const doSomething = async ({ signal }) => {


     for (const item of yellowNodes) {
          try{
               await sleep(10)
               var g = index(item);
               if(g[0]<0 || g[1]<0){
                    const item2 = -1*g[0] +" "+ (-1*g[1]);
                    document.getElementById(item2).style.background = "white";
               }else{
                    document.getElementById(item).style.background = "#be2fe2";   
               }
          }catch (e) {
                    if(e.name !== 'AbortError') throw e;
               }
     }
     var node = new Pair(endingNode[0],endingNode[1]);
     findPath(node);

}

// ------------------------------------------------------------- code for bfs : 
const bfs = () => {
     var q = [];
     const firstnode = new Pair(startingNode[0],startingNode[1]);
     const lastnode = new Pair(endingNode[0],endingNode[1]);
     Gridarr[firstnode.x][firstnode.y] = 1;
     q.push(firstnode);
     var count = 0;

     while(q.length!==0){
          const topElement = q[0];
          q.shift();
          var done = false;
          for(var i = 0;i<4;i++){
               if(check(topElement.x+dx[i],topElement.y+dy[i])){
                    count++;
                    CalledBy[topElement.x + dx[i]][topElement.y + dy[i]] = new Pair(topElement.x,topElement.y);
                    const node = new Pair(topElement.x + dx[i],topElement.y + dy[i]);
                    Gridarr[topElement.x + dx[i]][topElement.y + dy[i]] = 1;
                    q.push(node);
                    var p = node.x +" "+node.y;
                    if(node.x===lastnode.x && node.y === lastnode.y){
                         done = true;
                         doSomething({ signal: ac.signal });
                         break;
                    }
                    yellowNodes.push(p);
               }
          }
          if(done){
               break;
          }
     }
}
// ----------------------------------------------------------------- code for bfs ends here 

// ------------------------------------------------------------------ code for dfs starts here : 

const dfs = (node) => {

const firstnode = new Pair(startingNode[0],startingNode[1]);
const lastnode = new Pair(endingNode[0],endingNode[1]);

if(lastnode.x === node.x && node.y === lastnode.y){
     doSomething({ signal: ac.signal });
     return true;
}

yellowNodes.push(node.x + " " + node.y);

Gridarr[node.x][node.y] = 1;

for(let i = 0;i<4;i++){
     if(check(node.x + dx[i],node.y + dy[i])){
          Gridarr[node.x + dx[i]][node.y + dy[i]] = 1;
          const nextNode = new Pair(node.x + dx[i],node.y + dy[i]);
          if(dfs(nextNode)){
               CalledBy[nextNode.x][nextNode.y] = node;
               return true;
          }else{
               const makeItWhite = new Pair(-1*(node.x + dx[i]),-1*(node.y + dy[i]));
               yellowNodes.push(makeItWhite.x +" "+ makeItWhite.y);
          }
     }
}

return false;

}


// -----------------------------------------------------------------------code for dfs ends here : 



const changeColor = (e) => {
     if(chooseAlgo === -1 || chooseAlgo === -2){
          setAlgoset(true);
          return;
     }
     Gridarr = mainArr;
     if(!canChange)return;
     var g = e.target.id;
     var v = index(g);
     if(Gridarr[v[0]][v[1]]===-1){
          Gridarr[v[0]][v[1]] = 0;
          setMainArr(Gridarr);
          e.target.style.background = "white";
          return;
     }

     if(doneChanging===0){
          Gridarr[v[0]][v[1]] = -1;
          setMainArr(Gridarr);
          e.target.style.background = "#293527";
     }else if(doneChanging===1){
          setStartingNode(v);
          e.target.style.background = "red";
          setdoneChanging(2);
     }else{
          endingNode.push(v[0]);
          endingNode.push(v[1]);
          e.target.style.background = "blue";
          setcanChange(false);
          Gridarr = mainArr;
          if(chooseAlgo==1){
               bfs();  
          }else{
               const node = new Pair(startingNode[0],startingNode[1]);
               dfs(node); 
          }
          
     }
     
}

const clear = () => {
     for(let i = 0;i<50;i++){
          for(let j = 0;j<70;j++){
               var id = i + " " +j;
               Gridarr[i][j] = 0;
               document.getElementById(id).style.background = "white";
          }
     }
     setMainArr(Gridarr);
     setdoneChanging(0);
     setcanChange(true);
     setChooseAlgo(-1);
     setStop(true);
}

const showSave = () => {
     document.getElementsByClassName("changeIndex")[0].style.display = "block";
}


return ( 
     <div className='Grid'>
          <Navbar done = {()=>(setdoneChanging(1))} dfs = {()=>{setChooseAlgo(2); setAlgoset(false)}} bfs = {()=>{setChooseAlgo(1); setAlgoset(false)}} clear = {() => clear()}  arrays = {Gridarr} algo = {chooseAlgo}/>
          {algoset && <p className='choose'>* FIRST CHOOSE A TRAVERSAL</p>}
          <div className = "OuterBox">
               {arr.map((array) => (
                    <div className = "innerBox">
                         {array.map((nodes)=>(
                         <button className = "NodeButton" onClick = {changeColor}>
                              <div className = "_node"  id = {nodes.z}></div>
                         </button>    
                         ))}
                    </div>
                    
               ))}
          </div>
     </div>
);
}

export default Grid;