import crypto from 'crypto';

interface IBlock {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}

class Block implements IBlock {
  public hash: string;
  constructor(
    public prevHash: string, //
    public height: number, //
    public data: string
  ) {
    this.hash = Block.calcHash(prevHash, height, data);
  }
  static calcHash(prevHash: string, height: number, data: string) {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash('sha256').update(toHash).digest('hex');
  }
}

class Blockchain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }
  private getPrevHash() {
    if (this.blocks.length === 0) return '';
    return this.blocks[this.blocks.length - 1].hash;
  }
  public addBlock(data: string) {
    const newBlock = new Block(this.getPrevHash(), this.blocks.length + 1, data);
    this.blocks.push(newBlock);
  }
  public getBlocks() {
    return [...this.blocks];
  }
}

const blockchain = new Blockchain();

blockchain.addBlock('가');
blockchain.addBlock('나');
blockchain.addBlock('다');

console.log(blockchain.getBlocks());
