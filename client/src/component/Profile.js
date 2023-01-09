import React from 'react'
import { useNavigate} from 'react-router-dom';


function Profile(props) {
    const navigate = useNavigate();
    const handleLogout =() =>{
        localStorage.removeItem('auth-token');
        navigate('/login');
        window.location.reload();
    }
    return (
        <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-mdb-backdrop="false" data-mdb-keyboard="true" >
            <div className="modal-dialog" style={{marginRight:'3%',width:'250px', marginTop:'2%'}}>
                <div className="modal-content">
                <div className="modal-body">
                    <div className="card-body text-center">
                        <div className="mb-2">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp" alt="My Avatar" className="rounded-circle img-fluid" style={{width: '50px'}} />
                        </div>
                        <h6 className='mt-3' style={{lineHeight:"0.1em"}}>{props.name}</h6>
                        <small>{props.email}</small>
                        <button type="button" className="btn  btn-rounded btn-md mt-4" style={{border: '1px solid grey'}} onClick ={handleLogout}>
                            Sign Out
                        </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
  )
}

export default Profile