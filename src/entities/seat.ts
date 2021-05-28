export interface ISingleSeat {
    id: string;
    cords: {
        x: number;
        y: number;
    }
    reserved: boolean;
}