const Template = () => {
    return ( 
        <div className="changeIndex">
            <div className="blurred"></div>

            <div className="outerform">
                <p className="heading">Add a Grid</p>
                <form className="innerform">
                    
                    <div className="buttons">
                       <label>NAME : </label>
                        <input type="text" placeholder="Give a name" /> 
                    </div>
                    <button>Save</button>
                    <button>Close</button>
                </form>
            </div>
        </div>
        
            
        
     );
}
 
export default Template;