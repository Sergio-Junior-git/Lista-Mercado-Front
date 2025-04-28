import { Lista } from "./Lista";
import { Produto } from "./Produto";

export class itemlista {
    public numSeq?: number;
    public quantidade: number = 0;
    public precototal?: number;
    public concluido: number = 0;
    public produto: Produto = new Produto();
    public lista: Lista = new Lista();
}