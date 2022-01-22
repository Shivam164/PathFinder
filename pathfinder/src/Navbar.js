const Navbar = (props) => {

    const algo = props.algo;
    
    return ( 
        <div className = "menuBar">
            <p>PathFinder</p>

            <div className="options">
                <div class="dropdown">
                    {algo === 1 && <button class="dropbtn">BFS</button>}
                    {algo === 2 && <button class="dropbtn">DFS</button>}
                    {algo === -1 && <button class="dropbtn">Traversal</button>}
                    {/* <button class="dropbtn">Traversal</button> */}
                    <div class="dropdown-content">
                        <button onClick = {props.dfs}>DFS</button>
                        <button onClick = {props.bfs}>BFS</button>
                    </div>
                </div>

                <button className = "_done" onClick = {props.done}>DONE CREATING BARRIERS</button>
                <button className = "_reset" onClick = {props.clear}>RESET</button>
            </div>
        </div>
            
     );
}
 
export default Navbar;