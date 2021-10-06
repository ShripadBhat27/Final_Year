import web3 from "./web3";
import compiledAdmin from './build/Admin.json';


const instance =  new web3.eth.Contract(
    JSON.parse(compiledAdmin.interface) ,
    '0x09a536E6780CBF27aF0b6fdbfADf554864FFb509'
);

export default instance;