# Etherium  

Ethereum é uma plataforma descentralizada que executa contratos inteligentes: aplicativos que funcionam exatamente como programados, sem qualquer possibilidade de tempo de inatividade, censura, fraude ou interferência de terceiros.

Esses aplicativos são executados em um blockchain personalizado, uma infra-estrutura global compartilhada extremamente poderosa que pode movimentar valor e representar a propriedade da propriedade.

Isso permite que os desenvolvedores criem mercados, armazenem registros de dívidas ou promessas, movimentem fundos de acordo com instruções dadas no passado (como um testamento ou um contrato futuro) e muitas outras coisas que ainda não foram inventadas, tudo sem um intermediário ou risco da contrapartida.

O projeto foi inicializado por meio de uma pré-venda de éter em agosto de 2014 por fãs de todo o mundo. Ele é desenvolvido pela Ethereum Foundation, uma instituição suíça sem fins lucrativos, com contribuições de grandes mentes de todo o mundo.

Em arquiteturas de servidores tradicionais, todo aplicativo precisa configurar seus próprios servidores que executam seu próprio código em locais isolados, dificultando o compartilhamento de dados. Se um único aplicativo for comprometido ou ficar off-line, muitos usuários e outros aplicativos serão afetados.

Em um blockchain, qualquer um pode configurar um nó que replique os dados necessários para todos os nós para chegar a um acordo e ser compensado por usuários e desenvolvedores de aplicativos. Isso permite que os dados do usuário permaneçam em sigilo e que os aplicativos sejam descentralizados como a Internet deveria funcionar.

Crie um token digital negociável que possa ser usado como moeda, representação de um ativo, compartilhamento virtual, comprovante de associação ou qualquer outra coisa. Esses tokens usam uma API de moeda padrão para que seu contrato seja automaticamente compatível com qualquer carteira, outro contrato ou troca também usando esse padrão.

A quantidade total de fichas em circulação pode ser definida para um valor fixo simples ou flutuar com base em qualquer conjunto de regras programado.

## Protocolo

### Blockchain

**Hashes**

Normalmente, quando um hash é calculado dentro do blockchain, é calculado duas vezes. Na maioria das vezes , os hashes SHA-256 são usados, no entanto, o RIPEMD-160 também é usado quando um hash menor é desejável (por exemplo, ao criar um endereço de blockchain).

**Merkle Trees**

Árvores Merkle são árvores binárias de hashes. As árvores Merkle em blockchain usam um SHA-256 duplo , o hash SHA-256 do hash SHA-256 de alguma coisa.
Se, ao formar uma linha na árvore (diferente da raiz da árvore), ela tiver um número ímpar de elementos, o hash duplo final será duplicado para garantir que a linha tenha um número par de hashes.

Primeiro, forme a linha inferior da árvore com os hashes double-SHA-256 ordenados dos fluxos de bytes das transações no bloco.
Em seguida, a linha acima consiste em metade desse número de hashes. Cada entrada é o duplo SHA-256 da concatenação de 64 bytes dos dois hashes correspondentes abaixo dela na árvore.

Esse procedimento se repete recursivamente até alcançarmos uma linha que consiste em apenas um único hash duplo. Esta é a raiz Merkle da árvore.

**Assinaturas**

O blockchain usa o Algoritmo de Assinatura Digital de Curva Elíptica ( ECDSA ) para assinar transações.

Para ECDSA, a curva secp256k1 de http://www.secg.org/sec2-v2.pdf é usada.

Chaves públicas (em scripts) são fornecidas como 04 x y, onde x e y são inteiros big endianos de 32 bytes representando as coordenadas de um ponto na curva ou em formato compactado, dado como sign x onde sign é 0x02 se y é par e 0x03 se y for ímpar.

As assinaturas usam a codificação DER para compactar os componentes r e s em um único fluxo de bytes (isso também é o que o OpenSSL produz por padrão).

**Verificação de transação**

Transações são registros assinados criptograficamente que reatribuem a propriedade de blockchains para novos endereços. As transações têm entradas - registros que fazem referência aos fundos de outras transações anteriores - e saídas - registros que determinam o novo dono dos blockchains transferidos, e que serão referenciados como entradas em transações futuras conforme esses fundos sejam pagos.

Cada entrada deve ter uma assinatura digital criptográfica que desbloqueia os fundos da transação anterior. Somente a pessoa que possui a chave privada apropriada é capaz de criar uma assinatura satisfatória; Isso, na verdade, garante que os fundos só possam ser gastos por seus proprietários.

Cada saída determina qual endereço de blockchain (ou outro critério, veja Script ) é o destinatário dos fundos.

Em uma transação, a soma de todas as entradas deve ser igual ou maior que a soma de todas as saídas. Se as entradas excederem as saídas, a diferença é considerada uma taxa de transação e é resgatável por quem primeiro inclui a transação na cadeia de bloco.

Um tipo especial de transação, chamado de transação coinbase , não tem entradas. É criado por mineirose há uma transação de base por bloco. Como cada bloco vem com uma recompensa de blockchains recém-criados (por exemplo, 50 BTC para os primeiros 210.000 blocos), a primeira transação de um bloco é, com poucas exceções, a transação que concede essas moedas ao destinatário (o minerador). Além dos recém-criados blockchains, a transação baseada em moedas também é usada para atribuir ao recebedor quaisquer taxas de transação que foram pagas dentro das outras transações que estão sendo incluídas no mesmo bloco. A transação com base em moedas pode atribuir a recompensa inteira a um único endereço de blockchain ou dividi-la em partes entre vários endereços, assim como qualquer outra transação. As transações do Coinbase sempre contêm resultados que somam a soma do prêmio do bloco mais todas as taxas de transação coletadas das outras transações no mesmo bloco.

A transação no banco de moedas no bloco zero não pode ser gasta. Isso se deve a uma peculiaridade da implementação do cliente de referência que abriria o potencial para uma bifurcação de cadeia de blocos se alguns nós aceitassem o gasto e outros não o fizessem.

A maioria das saídas de blockchain sobrecarrega as moedas recém-transferidas com uma única chave privada ECDSA. O registro real salvo com entradas e saídas não é necessariamente uma chave, mas um script . O blockchain usa um sistema de script interpretado para determinar se os critérios de saída foram atendidos, com os quais operações mais complexas são possíveis, como saídas que requerem duas assinaturas ECDSA ou esquemas de duas ou três assinaturas. Uma saída que referencia um único endereço blockchain é uma saída típica ; uma saída realmente contém essas informações na forma de um script que requer uma única assinatura do ECDSA (consulte OP_CHECKSIG). O script de saída especifica o que deve ser fornecido para desbloquear os fundos mais tarde e, quando chegar a hora de gastar a transação em outra entrada, essa entrada deve fornecer todas as coisas que satisfazem os requisitos definidos pela saída original. roteiro.

**Endereços**

Um endereço de blockchain é, na verdade, o hash de uma chave pública do ECDSA, calculado dessa maneira:

Versão = 1 byte de 0 (zero); na rede de teste, este é 1 byte de 111
Key hash = Versão concatenada com o RIPEMD-160 (SHA-256 (chave pública))
Soma de verificação = 1º 4 bytes de SHA-256 (SHA-256 (Key hash))
blockchain Address = Base58Encode (Key hash concatenado com Checksum)
A codificação Base58 usada é caseira e tem algumas diferenças. Especialmente, zeros à esquerda são mantidos como zeros únicos quando a conversão acontece.

## Tutorial

**Criando um Ethereum Smart Contract**

Neste tutorial criaremos um contrato inteligente Ethereum. Por exemplo iremos fazer um contrato de reserva em um hotel usando o nome da pessoa, o telofeno e o quarto que a pessoa reservou.

Por motivos didáticos, iremos usar um programa chamado TestRPC para gerar dados de teste. O testrpc irá simular blockchains localmente para podermos usar. Para instalar basta usar o comando abaixo.

```bash
> npm install -g ethereumjs-testrpc
```

E para executalo basta usar o comando abaixo.

```shell
> testrpc
```

Se tiver algum problema com permissão, usar comando abaixo.

```shell
> testrpc -u 0 -u 1
```

Após isso será necessário instalar o Web3.js para gerenciar o protocolo. Está é a biblioteca padrão do Ethereum.

Mas o que é o Web3.js ?

É uma API Javascript compatível com Ethereum que implementa especificações RPC genéricas no formato JSON. Para a aplicação para trabalhar em ethereum pode usar o objeto Web3 fornecido pela biblioteca web3.js . A biblioteca interna se comunica com um nó local por meio de chamadas RPC. Web3.js funciona com qualquer nó Ethereum que expõe uma camada RPC. O Web3 contém o objeto eth  (web3.eth) para interações específicas do blockchain Ethereum e o objeto shh (web3.shh) para a interação do Whisper.

A biblioteca web3.js é uma coleção de módulos e cada um contém uma funcionalidade para o ecossistema Ethereum.

* web3-eth:  Blockchain  Ethereum  e Contratos Inteligentes.
* web3-shh:  Protocolo Whisp, protocolo de comunicação entre P2P e broadcast dapps.
* web3-bzz: Protocolo Swarm  , protocolo para armazenamento descentralizado
* web3-utils:  contém funções de ajuda úteis para desenvolvedores do Dapp.

Para instalar segue abaixo o comando.

```shell
> npm install ethereum/web3.js --save
```

Com tudo devidamente instalado, usaremos uma IDE  web suportado pela propria Ethereum por motivos didáticos. Segue o link https://remix.ethereum.org/

O Remix é uma IDE que suporta o Solidity.

Mas o que é Solidity ?

Solidity é uma linguagem de programação orientada a contratos para escrever contratos inteligentes. É usado para implementar contratos inteligentes em várias plataformas blockchain .

Crie um novo arquivo no Remix com o nome de reserva.sol e insira o codigo abaixo.

```javascript
pragma solidity ^0.4.18;

contract Reserva {

   string nome;
   string telefone;
   int quarto

   function setInstructor(string _nome, string _telefone,int _quarto) public {
       nome = _nome;
       telefone = _telefone;
       quarto = _quarto;
   }

   function getInstructor() public constant returns (string, string,int) {
       return (nome,telefone,quarto);
   }
}
```

Isse código comtem os parametros que seram armazenados no blockchain, neste caso específico armazenaremos o nome, telefone e a quarto que será reservado. Com isso podemos garantir que uma pessoa reservou o quarto. Note que é apenas um exemplo, portanto não garantimos que duas pessoas reservem o mesmo quarto.

Feito isso, click em *Start to compile* e depois na aba *Run* em *Environment* selecione a opção *Web3 Provider*, insira a url padrão **http://localhost:8545** e dê *Ok*

O *Web3 Provider* irá possibilitar a comunicação via Web3.js e a url usamos o localhost porque o testerpc está emulando a blockchain localmente. Se quiser conectar a uma blockchain remotamente

![figure1](/figure1.png)

## Front-end

Agora iremos para o front-end do projeto. Crie um arquivo com o nome index.html na mesma pasta em que foi instalado o web3.js. Será uma interface UI bem simples apenas por motivos didáticos. Segue abaixo o código.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="main.css">
    <script src="./node_modules/web3/dist/web3.min.js"></script>
</head>
<body>
    <div class="container">
        <h1>Reserva</h1>
        <h2 id="instructor"></h2>
        <label for="nome" class="col-lg-2 control-label">Nome</label>
        <input id="nome" type="text">
        <label for="telefone" class="col-lg-2 control-label">Telefone</label>
        <input id="telefone" type="text">
        <label for="quarto" class="col-lg-2 control-label">Quarto</label>
        <input id="quarto" type="text">
        <button id="button">Atulaziar</button>
    </div>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
    <script>
       // Iremos preencher aqui depois ...
    </script>
</body>
</html>
```

Segue o código do CSS para customizar o style do html.

```css
body {
	background-color:#F0F0F0;
	padding: 2em;
	font-family: 'Raleway','Source Sans Pro', 'Arial';
}
.container {
	width: 50%;
	margin: 0 auto;
}
label {
	display:block;
	margin-bottom:10px;
}
input {
	padding:10px;
	width: 50%;
	margin-bottom: 1em;
}
button {
	margin: 2em 0;
	padding: 1em 4em;
	display:block;
}

#instructor {
	padding:1em;
	background-color:#fff;
	margin: 1em 0;
}
```

Agora iremos conectar o html ao web3 para a comunicação com a blockchain. Usando a url do localhost, mas para uma aplicação real substitua pelo ip do provedor que irá utilizar. Insira o código abaixo.

Ethereum suporta navegadores como Mist ou MetaMask terão um ethereumProvider web3.currentProvider disponível. Para web3.js, verifique Web3.givenProvider. Se esta propriedade é null você deve se conectar a um nó remoto/local.


```javascript
 <script>
	// Verificamos a instancia do web3
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
        //var web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");
    } else {
        // Definimos o provedor que queremos, no caso o Web3.providers, cuja porta padrão é 8545
        // Usamos o localhost, mas se quiser se conectar remoto use o ip do destino
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
	// Aqui pegamos a primeira conta fornecida pelo testrpc
	 web3.eth.defaultAccount = web3.eth.accounts[0];
 </script>
```

Agora voltando para o Remix, na aba *Compile* clique em *Details* e desça até a opção ABI e clique no ícone do *copy*. Iremos inserir este código no script como mostrado abaixo. Isso pode ser feito também via terminal usando o comando.

```shell
solc filename.sol --abi
```

Mas o que é ABI ?

ABI significa interface binária de aplicativo. Em geral, um ABI é a interface entre dois módulos de programa, um dos quais é frequentemente no nível de código de máquina. A interface é o método de fato para codificar / decodificar dados dentro / fora do código da máquina. No Ethereum, é basicamente como você pode codificar chamadas de contratos de Solidity para o EVM e, de trás para frente, como ler os dados de transações.


![figure2](/figure2.png)

```javascript
 <script>
    // Todo o código anterior continua , mais o que segue abaixo
	var reserva = web3.eth.contract("COLE O ABI AQUI");
 </script>
```
Agora vamos inserir o endereço do blockchain. Em *Deploy contracts* clique no ícone de copy e insera no código como demonstrádo no código abaixo.

![figure3](/figure3.png)


```javascript
 <script>
    // Todo o código anterior continua , mais o que segue abaixo
	var reservaContrato = web3.eth.contract("COLE O ABI AQUI");

	var reserva = reservaContrato.at('COLE O ENDEREÇO AQUI');
    console.log(reserva);

 </script>
```

Agora  vamos inserir um jquery para melhorar a usabilidade, dando uma função para o botão. Segue a baixo o código que deve ser inserido abaixo no script.

```javascript
 <script>
    // Todo o código anterior continua , mais o que segue abaixo
    reserva.getInstructor(function(error, result){
            if(!error)
                {
                    $("#instructor").html(result[0]+' do telefone '+result[1]+" para o quarto "+result[2]);
                    console.log(result);
                }
            else
                console.error(error);
        });

        $("#button").click(function() {
            reserva.setInstructor($("#nome").val(), $("#telefone").val(),$("#quarto").val());
        });

 </script>
```

Por fim podemos abrir o arquivo index.html no navegador de escolha e inserir os dados de sua escolha. Ao atulaziar a pagina será mostrado a informação inserida anteriormente.

![index](/index.png)

Se olharmos no log do terminal que estava rodando o testrpc podemos ver que a transação foi realizada.


![terminal](/terminal.png)


**Referencias:**

https://en.blockchain.it/wiki/Protocol_documentation

https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html

https://ethereum.org/

https://ethereum.stackexchange.com/questions/3149/how-do-you-get-a-json-file-abi-from-a-known-contract-address

http://hypernephelist.com/2016/06/21/a-simple-smart-contract-ui-web3.html

https://github.com/ethereum/web3.js/tree/develop/example

https://coursetro.com/posts/code/99/Interacting-with-a-Smart-Contract-through-Web3.js-(Tutorial)

https://github.com/ethereum/web3.js/

https://remix.ethereum.org/

https://tecnops.es/3-ethereum-primeros-pasos-con-solidity-y-ethereum-javascript-api/

https://en.wikipedia.org/wiki/Solidity

https://ethereum.stackexchange.com/questions/234/what-is-an-abi-and-why-is-it-needed-to-interact-with-contracts

https://ethereum.stackexchange.com/questions/10868/contract-call-web3-error-could-not-unlock-signer-account

https://davekiss.com/ethereum-web3-node-tutorial/
