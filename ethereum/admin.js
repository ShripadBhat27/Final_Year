import web3 from "./web3";
import compiledAdmin from './build/Admin.json';


const instance =  new web3.eth.Contract(
    JSON.parse(compiledAdmin.interface) ,
    '0x8cd2fA546121C2F2ffc88d0FaA576D1C6D679c48'
);

export default instance;