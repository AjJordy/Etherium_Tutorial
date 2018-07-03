# Bitcoin - Blockchain  

Bitcoin, uma rede descentralizada, que permite usuários transacionarem diretamente, peer to peer, sem um mediador para gerencias a troca de fundos. O ativo digital, 
bitcoin, é usado como outros ativos em troca de bens e serviços. Ao contrário das moedas e ativos tradicionais, o bitcoin é facilmente portável, divisível e irreversível.

O Bitcoin aumenta a eficiência do sistema e permite a prestação de serviços financeiros a um custo drasticamente menor, dando aos usuários mais poder e liberdade.

Bitcoin foi nomeada a moeda de melhor desempenho em quatro dos últimos cinco anos. Como moeda global, você pode enviar bitcoins para qualquer pessoa, em qualquer 
lugar do mundo, sem se preocupar com as taxas de remessas transnacionais. 

Manter seu bitcoin seguro em uma carteira sem custódia (como o Blockchain) significa 
que não há entidade que possa prendê-lo fora de seus fundos.

É globalmente inclusivo - o bitcoin está permitindo que milhões em todo o mundo realizem transações, 
economizem e protejam seu caminho para um futuro financeiro melhor. 

https://www.blockchain.com/learning-portal/bitcoin-faq

## Protocolo 

**Hashes** 

Normalmente, quando um hash é calculado dentro do bitcoin, é calculado duas vezes. Na maioria das vezes , os hashes SHA-256 são usados, no entanto, o RIPEMD-160 também é usado quando um hash menor é desejável (por exemplo, ao criar um endereço de bitcoin).


**Merkle Trees**

Árvores Merkle são árvores binárias de hashes. As árvores Merkle em bitcoin usam um SHA-256 duplo , o hash SHA-256 do hash SHA-256 de alguma coisa.
Se, ao formar uma linha na árvore (diferente da raiz da árvore), ela tiver um número ímpar de elementos, o hash duplo final será duplicado para garantir que a linha tenha um número par de hashes.

Primeiro, forme a linha inferior da árvore com os hashes double-SHA-256 ordenados dos fluxos de bytes das transações no bloco.
Em seguida, a linha acima consiste em metade desse número de hashes. Cada entrada é o duplo SHA-256 da concatenação de 64 bytes dos dois hashes correspondentes abaixo dela na árvore.

Esse procedimento se repete recursivamente até alcançarmos uma linha que consiste em apenas um único hash duplo. Esta é a raiz Merkle da árvore.

**Assinaturas**

O Bitcoin usa o Algoritmo de Assinatura Digital de Curva Elíptica ( ECDSA ) para assinar transações.

Para ECDSA, a curva secp256k1 de http://www.secg.org/sec2-v2.pdf é usada.

Chaves públicas (em scripts) são fornecidas como 04 <x> <y>, onde x e y são inteiros big endianos de 32 bytes representando as coordenadas de um ponto na curva ou em formato compactado, dado como <sign> <x> onde < sign> é 0x02 se y é par e 0x03 se y for ímpar.

As assinaturas usam a codificação DER para compactar os componentes r e s em um único fluxo de bytes (isso também é o que o OpenSSL produz por padrão).

**Verificação de transação**

Transações são registros assinados criptograficamente que reatribuem a propriedade de Bitcoins para novos endereços. As transações têm entradas - registros que fazem referência aos fundos de outras transações anteriores - e saídas - registros que determinam o novo dono dos Bitcoins transferidos, e que serão referenciados como entradas em transações futuras conforme esses fundos sejam pagos.

Cada entrada deve ter uma assinatura digital criptográfica que desbloqueia os fundos da transação anterior. Somente a pessoa que possui a chave privada apropriada é capaz de criar uma assinatura satisfatória; Isso, na verdade, garante que os fundos só possam ser gastos por seus proprietários.

Cada saída determina qual endereço de Bitcoin (ou outro critério, veja Script ) é o destinatário dos fundos.

Em uma transação, a soma de todas as entradas deve ser igual ou maior que a soma de todas as saídas. Se as entradas excederem as saídas, a diferença é considerada uma taxa de transação e é resgatável por quem primeiro inclui a transação na cadeia de bloco.

Um tipo especial de transação, chamado de transação coinbase , não tem entradas. É criado por mineirose há uma transação de base por bloco. Como cada bloco vem com uma recompensa de Bitcoins recém-criados (por exemplo, 50 BTC para os primeiros 210.000 blocos), a primeira transação de um bloco é, com poucas exceções, a transação que concede essas moedas ao destinatário (o minerador). Além dos recém-criados Bitcoins, a transação baseada em moedas também é usada para atribuir ao recebedor quaisquer taxas de transação que foram pagas dentro das outras transações que estão sendo incluídas no mesmo bloco. A transação com base em moedas pode atribuir a recompensa inteira a um único endereço de Bitcoin ou dividi-la em partes entre vários endereços, assim como qualquer outra transação. As transações do Coinbase sempre contêm resultados que somam a soma do prêmio do bloco mais todas as taxas de transação coletadas das outras transações no mesmo bloco.

A transação no banco de moedas no bloco zero não pode ser gasta. Isso se deve a uma peculiaridade da implementação do cliente de referência que abriria o potencial para uma bifurcação de cadeia de blocos se alguns nós aceitassem o gasto e outros não o fizessem.

A maioria das saídas de Bitcoin sobrecarrega as moedas recém-transferidas com uma única chave privada ECDSA. O registro real salvo com entradas e saídas não é necessariamente uma chave, mas um script . O Bitcoin usa um sistema de script interpretado para determinar se os critérios de saída foram atendidos, com os quais operações mais complexas são possíveis, como saídas que requerem duas assinaturas ECDSA ou esquemas de duas ou três assinaturas. Uma saída que referencia um único endereço Bitcoin é uma saída típica ; uma saída realmente contém essas informações na forma de um script que requer uma única assinatura do ECDSA (consulte OP_CHECKSIG). O script de saída especifica o que deve ser fornecido para desbloquear os fundos mais tarde e, quando chegar a hora de gastar a transação em outra entrada, essa entrada deve fornecer todas as coisas que satisfazem os requisitos definidos pela saída original. roteiro.

**Endereços**

Um endereço de bitcoin é, na verdade, o hash de uma chave pública do ECDSA, calculado dessa maneira:

Versão = 1 byte de 0 (zero); na rede de teste, este é 1 byte de 111
Key hash = Versão concatenada com o RIPEMD-160 (SHA-256 (chave pública))
Soma de verificação = 1º 4 bytes de SHA-256 (SHA-256 (Key hash))
Bitcoin Address = Base58Encode (Key hash concatenado com Checksum)
A codificação Base58 usada é caseira e tem algumas diferenças. Especialmente, zeros à esquerda são mantidos como zeros únicos quando a conversão acontece.

https://en.bitcoin.it/wiki/Protocol_documentation

https://bitcoin.org/bitcoin.pdf


