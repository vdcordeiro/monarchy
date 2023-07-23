import { Gender } from "./enum/gender";
import { Reign } from "./reign";

export class Noble {

    public id: Number = -1;
    public name: String = "";
    public fullName: String = "";
    public gender: Gender = Gender.FEMALE;
    public born: Date = new Date("1500-01-01");
    public death: Date = new Date("1500-01-01");
    public ascendents: Noble[] = [];
    public reigned: Reign[] = [];
}
