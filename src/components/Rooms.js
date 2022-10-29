import './Component.css';
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import React, { useState , useEffect } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBIcon,
  MDBNavbar,
  MDBContainer,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from 'mdb-react-ui-kit';

const Rooms = () => {

    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);

    const [topRightModal, setTopRightModal] = useState(false);  
    const roomToggleShow = () => setTopRightModal(!topRightModal);


    const [showNavRight, setShowNavRight] = useState(false);
    const [rooms, setRooms] = useState({})

    const [id, setId] = useState(0)
    const [room, setRoom] = useState(0)
    const [bookprice, setBookprice] = useState(0)
    const [bookdiscount, setBookdiscount] = useState("")


    const [roomNo, setRoomNo] = useState(0)
    const [roomType, setRoomType] = useState("")

    useEffect(() => {
        getRoomsList();
    }, [rooms])
    

  const getRoomsList = () => {
    axios.get(`http://localhost:8070/room/get`)
        .then((response) => {
            setRooms(response.data)
        })
  }

  const addRoom = () => {
    axios.post(`http://localhost:8070/room/add`,{id,room,bookprice,bookdiscount}).then((res) => {
        console.log("booking success");
    }).catch((err) =>{
        console.log(err);
    })
  }

  const booking = () => {
    axios.post(`http://localhost:8070/book/add`,{id,room,bookprice,bookdiscount}).then((res) => {
        console.log("booking success");
    }).catch((err) =>{
        console.log(err);
    })
  }

  return (
    <div>
        {rooms.map((data) =>
        <ul className='note-card' >
            <li><h3>{data.roomNo}</h3></li>
            <li><p>{data.roomType}</p></li>
            <li>
                <div>
                    <MDBBtn onClick={toggleShow}>Book</MDBBtn>
                </div>
            </li>
        </ul>
        )}
        <MDBNavbar expand='lg' light bgColor='light'>
            <MDBContainer fluid>
                <MDBNavbarToggler
                type='button'
                data-target='#navbarRightAlignExample'
                aria-controls='navbarRightAlignExample'
                aria-expanded='false'
                aria-label='Toggle navigation'
                onClick={() => setShowNavRight(!showNavRight)}
                >
                <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>

                <MDBCollapse navbar show={showNavRight}>
                <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
                    <MDBNavbarItem>
                    <MDBNavbarLink active aria-current='page' href='#' onClick={roomToggleShow}>
                        Add Room
                    </MDBNavbarLink>
                    </MDBNavbarItem>
                </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
                <>
      
                    <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                        <MDBModalDialog>
                        <MDBModalContent>
                            <MDBModalHeader>
                            <MDBModalTitle>Modal title</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>
                            <form>
                    <MDBRow className='mb-4'>
                    <MDBCol>
                        <MDBInput id='form3Example1' label='ID' onChange={(e) => setId(e.target.value)}/>
                        </MDBCol>
                        <MDBCol>
                        <MDBInput id='form3Example1' label='Room' onChange={(e) => setRoom(e.target.value)}/>
                        </MDBCol>
                        <MDBCol>
                        <MDBInput id='form3Example2' label='Book Price' onChange={(e) => setBookprice(e.target.value)}/>
                        </MDBCol>
                        <MDBCol>
                        <MDBInput id='form3Example2' label='Discount' onChange={(e) => setBookdiscount(e.target.value)}/>
                        </MDBCol>
                    </MDBRow>
                    </form>
                            </MDBModalBody>

                            <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleShow}>
                                Close
                            </MDBBtn>
                            <MDBBtn onClick={() => {booking()}}>Book this room</MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                        </MDBModalDialog>
                    </MDBModal>
                </>
                <>
                    <MDBModal
                        animationDirection='right'
                        show={topRightModal}
                        setShow={setTopRightModal}
                    >
                        <MDBModalDialog position='top-right' side>
                        <MDBModalContent>
                            <MDBModalHeader className='bg-info text-white'>
                            <MDBModalTitle>Add a room</MDBModalTitle>
                            </MDBModalHeader>
                            <MDBModalBody>
                            <form>
                                <MDBInput className='mb-4' type='no' id='form1Example2' label='Room No'  onChange={(e) => setRoomNo(e.target.value)}/>
                                <MDBInput className='mb-4' type='no' id='form1Example2' label='Room Type'  onChange={(e) => setRoomType(e.target.value)}/>
                            </form>
                            </MDBModalBody>
                            <MDBModalFooter>
                            <MDBBtn color='info'>Add</MDBBtn>
                            <MDBBtn outline color='info' onClick={roomToggleShow}>
                                Close
                            </MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                        </MDBModalDialog>
                    </MDBModal>
                </>
    </div>
  )
}

export default Rooms