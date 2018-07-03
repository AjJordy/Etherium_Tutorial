/*
* Block Inputs
*
* Cada bloco tem um timestamp e dados. O timestamp mostra quando o bloco
* foi criado. Isso é util para instanciar o Bitcoin (BTC), no qual a
* dificuldade aumenta a cada mês.
* Já os dados armazenam a informação na corrente. Que é onde os dados dados
* das tranzações são armazenados no formato de Merkle Trees.
*
* Referência: https://medium.com/digital-alchemy-holdings/learn-build-a-javascript-blockchain-part-1-ca61c285821e
*/

const SHA256 = require('crypto-js/sha256') // Função hash irreversivel

class Block {
    constructor(timestamp, data) {
        this.index = 0;                   // Posição na corrente
        this.timestamp = timestamp;       // Data e hora
        this.data = data;                 // Dados da tranzação
        this.previousHash = "0";
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    // Calcula e retorna uma string com o hash baseado na posição da corrente, no hash anterior, no timestamp, nos dados e no nonce
    calculateHash() {
      return SHA256(this.index + this.previousHash + this.timestamp + this.data + this.nonce).toString();
    }

    mineBlock(difficulty) {

    }
}


class Blockchain{

    // Cria uma lista ligada de blocos, formando uma corrente de blocos que dá o nome ao protocolo
    constructor() {
        this.chain = [this.createGenesis()];
    }

    // Cria o primeiro bloco da corrente
    createGenesis() {
        return new Block(0, "01/01/2018", "Genesis block", "0")
    }

    // Retorna o ultimo elemento da corrente
    latestBlock() {
        return this.chain[this.chain.length - 1]
    }

    // Adiciona um novo bloco a corrente
    addBlock(newBlock){
        newBlock.previousHash = this.latestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    // Verifica a integridade da corrente
    checkValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // Verifica se o hash armazenado do bloco atual é igual ao hash calculado
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            // Verifica se o hash armazenado do bloco anterior é igual ao hash calculado do bloco anterior
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

// Testes

let jsChain = new Blockchain();
jsChain.addBlock(new Block("06/25/2018", {amount: 5}));
jsChain.addBlock(new Block("06/26/2018", {amount: 10}));

console.log(JSON.stringify(jsChain, null, 4));
console.log("Is blockchain valid? " + jsChain.checkValid());
