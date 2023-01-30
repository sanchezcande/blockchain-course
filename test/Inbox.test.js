const assert = require('assert'); //es una librerìa  para testear còdigo
const ganache = require('ganache-cli');
const { isTypedArray } = require('util/types');
const Web3 = require('web3'); //constructor
// esto es para hacer una red de prueba, el Web3 està en mayúscula porqrque es constructorra
const web3 = new Web3(ganache.provider()); //creamos una instancia de web3 y la conectamos para la local network
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
    //get a list of all accounts
    accounts = await web3.eth.getAccounts() 
    //use one of those accounts to deploy the contract

// la primera lìnea dice que hay un tipo de contrato que tiene esta interfase para comunicarte con èl    
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    // acà lo costumizamos con deploy y enviar, deploy dice que queremos cdeploy un ocntrato, con un transacciòn object que teine la propiedad data
    //donde especificamos la bytecode data y despuès pasamos una lista de argumentos que le pasamos al contrato cuando es creado, el contructor fuction podrìa aceptar mùltiples argumentos
        .deploy({ data: bytecode, arguments: ['Hi there!'] }) // como hay que pasar un inicial message, lo pasamos en arguments
        .send({ from: accounts[0], gas: '1000000' })
        //accounts es para especificar què cuenta usaremos,  y el gas que usarìa cada deployment, deploy crea el objeto y el segundo mètodo es el qeu crea la comunicaciòn del contrato a la network,
} );

// TESTS
describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address) // is this a define value? es lo que dice el ok method
    } );
    it('has a default message', async() => {
        const message = await inbox.methods.message().call(); //method is an objetc tha tocntains all the different public methods that are in our contract, podrìa ser message o setmessage el primer set de parèntesis pasamos argumentos que la funciòn requiera, message no requiere argumento pero set message si, y en lo parèntesis de call customizamos la transacciòn, podemos pasar un objeto que diga quièn pagarà por la transacciòn y cuànto gas usar 
        assert.equal(message, 'Hi there!');
    } );//para hacer un default message
    it('Can change the message', async () => {
        await inbox.methods.setMessage('bye').send( { from: accounts[0] } ); //send transaction
        message = await inbox.methods.message().call();
        assert.equal(message, 'bye')
    } );
} );

















// class Car {
//     park(){
//         return 'stopped';
//     }
//     drive(){
//         return 'vroom';
//     }
// }

// let car;
// beforeEach(() => {
//     car = new Car();
// });
// //para hacer inicializaciones comunes para mùltiples tests
// //describe es donde se pone cada instancia de test
// describe('Carr',() => {
//     it('park should return a string', () => { //esto es el "cirujano" para testear el còdigo
//         assert.equal(car.park(), 'stopped'); //con esto se compara que los dos valores sean iguales entre lo qeu codeè y lo que le paso como segundo argumento
//     });
//     it('can drive', () => {
//         assert.equal(car.drive(), 'vroom')
//     })
// } );