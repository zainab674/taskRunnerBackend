import { HttpService } from "@nestjs/axios";
export declare class GeocodingService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getCoordinates(streetAddress: string, city: string, state: string, zipCode: string): Promise<{
        lat: number;
        lng: number;
    }>;
    getCoordinatesOfCity(city: string): Promise<{
        lat: number;
        lng: number;
    }>;
}
