import { Platform } from 'react-native';
import axios from 'axios';



const BASE_URL = Platform.OS === 'ios' ? 'http://localhost:9000' : 'http://10.0.2.2:9000'; 

const getCollections = async () =>  {
    response = await axios.get(BASE_URL + '/store/collections')
    length = response.data["count"]

    var collections = []
    for (let i = 0; i < length; i++){
        collections.push({id: response.data["collections"][i]["id"], title: response.data["collections"][i]["title"]})
    }
    return collections
}


export { getCollections };