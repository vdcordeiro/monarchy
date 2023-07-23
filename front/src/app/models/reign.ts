import { Country } from "./country";

export class Reign {

    public id: Number | null;
    public country: Country;
    public title: String;
    public from: Date;
    public to: Date;

    constructor() {
        this.id = null;
        this.country = new Country();
        this.title = '';
        this.from = new Date("1500-01-01");;
        this.to = new Date("1500-01-01");;
    }

}
