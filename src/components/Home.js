import React,{useState, useEffect, Fragment} from 'react'
import './home.css'
import axios from 'axios'
import Modal from 'react-modal';


const customStyles = {
  
  content: {
    position:'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid #ccc',
      background: '#fff',
     
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      padding: '20px'
    
  },
};
//Modal.setAppElement('#root');

const Home = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalImage, setModalImage] = useState();
  const [name, setName] = useState();
  const [likes, setLikes] = useState();
  const [location, setLocation] = useState();
  const [profileImage, setProfileImage] = useState();
  const [link, setLink] = useState();


  
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

function setImage(imgtoset,name,likes,location,profileImage,link){
  openModal();
  setModalImage(imgtoset);
  setName(name);
  setLikes(likes);
  setLocation(location);
  setProfileImage(profileImage);
  setLink(link);
}
    //yBBhpw1KjpDlJQOoEo4Al2hlRCDDsE5JbIsg8hNluYI

    const [value, setValue] = useState("")
    const [result, setResult] = useState([])
    const [banner, setBanner] = useState(true)

  useEffect(() =>{
    const fetchImages = async() =>{
      const res = await axios.get(`https://api.unsplash.com/search/photos/?client_id=yBBhpw1KjpDlJQOoEo4Al2hlRCDDsE5JbIsg8hNluYI&query=${value}`)
      //console.log(res.data)
      setResult(res.data.results)
      if(res.data.results.length > 0){
        setBanner(false)
      }else{
        setBanner(true)
      }
  };
  fetchImages();
  },[value])

    return (
        <Fragment>
  <div className="container-fluid py-3">
    <div className="d-flex justify-content-evenly">
    <a href="/" className="navbar-brand t-shadow text-dark" style={{textDecoration:"none"}}><span className="text-info">D</span>one<span className="text-info">S</span>plash</a>
    <div className="input-group shadow" style={{width:"70%"}}>
  <input value={value} onChange={e => setValue(e.target.value)} className="form-control" type="search" placeholder="&#128269; search..."/>
</div>
    </div>
    {banner && 
    <div className="container-fluid mx-0 banner-div mt-3">
<h1 className="display-1 fw-light text-light t-shadow t-center py-5"><span className="text-info">D</span>one <span className="text-info">S</span>plash</h1>
<h5 className="fw-light text-light t-shadow t-center py-3">Now, search images instantly.</h5>
    </div>
    }
    </div>

<div className="container img-container pb-5 pt-3">
{result.map((item)=>(
  <div className="img-div" key={item.id}>
<img onClick={() => setImage(item.urls.regular,item.user.name,item.likes,item.user.location,item.user.profile_image.medium,item.user.links.html)}
 className="img-class" src={item.urls.small} alt=""/>
<div className="d-flex justify-content-evenly e-div">
<h5 className="fw-light text-light t-shadow">by: {item.user.first_name}</h5>
<p className="fw-light text-light t-shadow"><i className="fas fa-heart text-danger"></i> {item.likes}</p>
</div>

<Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Minimal Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)} className="text-dark t-shadow fw-light">{name}</h2>
        <div className="d-flex justify-content-between"> <img src={profileImage} alt="" className="dp-image"/>
        <div>
        <button onClick={closeModal} className="btn-dark shadow py-1 mt-4">close</button>
        </div>
        </div>
        <div>
        <i className="fas fa-heart text-danger"></i> {likes} | <i className="fas fa-map-marker-alt"></i> {location} | <i className="fas fa-link"></i> <a href={link} target="_blank" style={{textDecoration:"none"}}>Portfolio link</a>
        </div>
        <img src={modalImage} alt="" className="modal-img" />
      </Modal>
</div>

))}

</div>

 </Fragment>
    )
}

export default Home
