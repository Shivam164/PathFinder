const Navbar = (props) => {
    
    return ( 
        <div className = "menuBar">
            <h1>PathFinder</h1>

            <div class="dropdown">
            <button class="dropbtn">Dropdown</button>
            <div class="dropdown-content">
                <button onClick = {props.dfs}>DFS</button>
                <button onClick = {props.bfs}>BFS</button>
            </div>
            </div>

            <button className = "_done" onClick = {props.done}>DONE CREATING BARRIERS</button>
            <button className = "_reset" onClick = {props.clear}>RESET</button>
        </div>
     );
}
 
export default Navbar;