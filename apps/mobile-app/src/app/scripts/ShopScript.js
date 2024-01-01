import { Platform } from 'react-native';
import axios from 'axios';

const BASE_URL = Platform.OS === 'ios' ? 'http://localhost:9000' : 'http://10.0.2.2:9000'; 

const getCollections = async () =>  {
    try {
        response = await axios.get(BASE_URL + '/store/collections')
        num = response.data["count"]

        var collections = []
        for (let i = 0; i < num; i++){
            collections.push({id: response.data["collections"][i]["id"], title: response.data["collections"][i]["title"]})
        }
        return collections;
    }
    catch(error){
        console.error('Getting Collections Error: ', error)
        return [];
    }
}

const getProducts = async (id) => {
    response = await axios.get(BASE_URL + '/store/products?collection_id[]=' + id)
    num = response.data['count'];
    var products = []
    for (let i = 0; i < num; i++){
        products.push({
            id: response.data["products"][i]["id"], 
            title: response.data["products"][i]["title"], 
            description: response.data["products"][i]["description"],
            image: response.data["products"][i]["thumbnail"],
            //Note this price is hard coded changes to the backend will cause a breaking bug for pricing 
            price: response.data["products"][i]["variants"][0]['prices'][0]["amount"]})
    }
    return products;
}

const searchProducts = async (searchText) => {
    try {
        response = await axios.post(`${BASE_URL}/store/products/search`, {
            q: searchText
        });
        console.log(response)
        return response;
    } catch (error) {
        console.log('Error: ', error)
        return [];
    }
}

export { getCollections, getProducts, searchProducts };