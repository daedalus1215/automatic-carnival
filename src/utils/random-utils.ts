import { Injectable } from "@nestjs/common";

type randomStringT = (length?: number) => string;
type randomNumberT = (min?: number, max?: number) => number;

@Injectable()
export class RandomUtils {
  constructor() { }
  
  randomString: randomStringT = (length = 7) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  randomNumber: randomNumberT = (min = 1, max = 100) => Math.floor(Math.random() * (max - min + 1)) + min;
  randomDate = (): Date => new Date();
};