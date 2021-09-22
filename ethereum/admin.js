import web3 from "./web3";
import compiledAdmin from './build/Admin.json';


const instance =  new web3.eth.Contract(
    JSON.parse(compiledAdmin.interface) ,
    '0x67CA73491cea8f0DCeBCe90bea148FC940C7C829'
);

export default instance;