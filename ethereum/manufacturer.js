import web3 from "./web3";
import Manufacturer from './build/Manufacturer.json';

export default (address)=>{
    const instance =  new web3.eth.Contract(
        JSON.parse(Manufacturer.interface) ,
        address
    );
    return instance;
}