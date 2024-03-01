import { useEffect ,useState} from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../styles/Button';


const AddressCard = ({ addressId }) => {
    debugger;
    const { setAuthUser,fetchAddress,deleteAddress } = useAuth();
    const [address,setAddress] = useState("")
    
    
    useEffect(() => {
        const fullAddress = fetchAddress(addressId).then((result) => {
            console.log(result);            
            setAddress(result)   
        });      
    }, [])
    /*  const address = fetchAddress(addressId).then((result)=> {
         console.log(result);
         fullAddress = result;
     } ); */
    
    const handleDelete= async() =>{
        const updatedUser = await deleteAddress(addressId);
        console.log(updatedUser);
        setAuthUser(updatedUser);

    }


    return (
        
        <div className='address-card'>
            <span>{address.firstName} </span>
            <span>{address.lastName}</span><br/>
            <span>{address.address}</span><br/>
            <span>{address.city},{address.state}</span> 
            <span> - {address.country?.value}</span>
            <br/>
            <span>Phone:{address.phone}</span>
            <div className='card-button'>
               
                <button onClick={handleDelete}>Remove</button>
            </div>
        </div>

        
    )
}

export default AddressCard;