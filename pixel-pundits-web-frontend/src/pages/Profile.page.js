import Inventory from "../Components/Inventory";
import AddCardToCollection from "../Components/AddCardToCollection";

export default function Profile(){
    const [inventory, setInventory] = useState([]);

    return(
        <div>
            <AddCardToCollection setInventory={setInventory}/>
            <Inventory setInventory={setInventory}/>
        </div>
    )
}