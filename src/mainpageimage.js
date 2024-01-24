import img from './images/main image.jpg'
function MainImage(){
    return(
        <div className='row'>
            <div className="col-md-6">
            <img src={img} className='rounded-circle' alt='' style={{width:'350px', height:'350px',border: '2px solid #808080'}}></img>
           
               
              
                    
           
            </div>
        
        </div>
    )
}
export default MainImage;