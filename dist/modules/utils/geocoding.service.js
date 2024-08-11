"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeocodingService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
let GeocodingService = class GeocodingService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getCoordinates(streetAddress, city, state, zipCode) {
        const apiKey = "AIzaSyB-5Pxl35fGpF3QywaGlX2KV-_J2rZi7D0";
        const formattedAddress = `${streetAddress}, ${city}, ${state} ${zipCode}`;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(formattedAddress)}&key=${apiKey}`;
        const response = await this.httpService.get(url).toPromise();
        const { results } = response.data;
        if (results && results.length > 0) {
            const { location } = results[0].geometry;
            return { lat: location.lat, lng: location.lng };
        }
        else {
            throw new common_1.HttpException("Unable to retrieve coordinates for the provided address.", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getCoordinatesOfCity(city) {
        const apiKey = "AIzaSyB-5Pxl35fGpF3QywaGlX2KV-_J2rZi7D0";
        const formattedAddress = `${city}`;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(formattedAddress)}&key=${apiKey}`;
        const response = await this.httpService.get(url).toPromise();
        const { results } = response.data;
        if (results && results.length > 0) {
            const { location } = results[0].geometry;
            return { lat: location.lat, lng: location.lng };
        }
        else {
            throw new common_1.HttpException("Unable to retrieve coordinates for the provided address.", common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.GeocodingService = GeocodingService;
exports.GeocodingService = GeocodingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], GeocodingService);
//# sourceMappingURL=geocoding.service.js.map