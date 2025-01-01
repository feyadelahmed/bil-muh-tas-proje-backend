require('dotenv').config();
const axios = require("axios");

const iller = [
 "Adana",
 "Adıyaman",
 "Afyonkarahisar",
 "Ağrı",
 "Amasya",
 "Ankara",
 "Antalya",
 "Artvin",
 "Aydın",
 "Balıkesir",
 "Bilecik",
 "Bingöl",
 "Bitlis",
 "Bolu",
 "Burdur",
 "Bursa",
 "Çanakkale",
 "Çankırı",
 "Çorum",
 "Denizli",
 "Diyarbakır",
 "Edirne",
 "Elazığ",
 "Erzincan",
 "Erzurum",
 "Eskişehir",
 "Gaziantep",
 "Giresun",
 "Gümüşhane",
 "Hakkâri",
 "Hatay",
 "Isparta",
 "Mersin",
 "İstanbul",
 "İzmir",
 "Kars",
 "Kastamonu",
 "Kayseri",
 "Kırklareli",
 "Kırşehir",
 "Kocaeli",
 "Konya",
 "Kütahya",
 "Malatya",
 "Manisa",
 "Kahramanmaraş",
 "Mardin",
 "Muğla",
 "Muş",
 "Nevşehir",
 "Niğde",
 "Ordu",
 "Rize",
 "Sakarya",
 "Samsun",
 "Siirt",
 "Sinop",
 "Sivas",
 "Tekirdağ",
 "Tokat",
 "Trabzon",
 "Tunceli",
 "Şanlıurfa",
 "Uşak",
 "Van",
 "Yozgat",
 "Zonguldak",
 "Aksaray",
 "Bayburt",
 "Karaman",
 "Kırıkkale",
 "Batman",
 "Şırnak",
 "Bartın",
 "Ardahan",
 "Iğdır",
 "Yalova",
 "Karabük",
 "Kilis",
 "Osmaniye",
 "Düzce",
];

const staticData = [
  { il: "Adana", sicaklik: 12 },
  { il: "Adıyaman", sicaklik: 10 },
  { il: "Afyonkarahisar", sicaklik: 6 },
  { il: "Ağrı", sicaklik: -2 },
  { il: "Amasya", sicaklik: 8 },
  { il: "Ankara", sicaklik: 7 },
  { il: "Antalya", sicaklik: 15 },
  { il: "Artvin", sicaklik: 7 },
  { il: "Aydın", sicaklik: 14 },
  { il: "Balıkesir", sicaklik: 10 },
  { il: "Bilecik", sicaklik: 7 },
  { il: "Bingöl", sicaklik: 8 },
  { il: "Bitlis", sicaklik: 5 },
  { il: "Bolu", sicaklik: 6 },
  { il: "Burdur", sicaklik: 10 },
  { il: "Bursa", sicaklik: 9 },
  { il: "Çanakkale", sicaklik: 11 },
  { il: "Çankırı", sicaklik: 5 },
  { il: "Çorum", sicaklik: 6 },
  { il: "Denizli", sicaklik: 12 },
  { il: "Diyarbakır", sicaklik: 10 },
  { il: "Edirne", sicaklik: 10 },
  { il: "Elazığ", sicaklik: 8 },
  { il: "Erzincan", sicaklik: 6 },
  { il: "Erzurum", sicaklik: 0 },
  { il: "Eskişehir", sicaklik: 7 },
  { il: "Gaziantep", sicaklik: 11 },
  { il: "Giresun", sicaklik: 9 },
  { il: "Gümüşhane", sicaklik: 5 },
  { il: "Hakkâri", sicaklik: 3 },
  { il: "Hatay", sicaklik: 13 },
  { il: "Isparta", sicaklik: 8 },
  { il: "Mersin", sicaklik: 14 },
  { il: "İstanbul", sicaklik: 10 },
  { il: "İzmir", sicaklik: 13 },
  { il: "Kars", sicaklik: -2 },
  { il: "Kastamonu", sicaklik: 5 },
  { il: "Kayseri", sicaklik: 6 },
  { il: "Kırklareli", sicaklik: 9 },
  { il: "Kırşehir", sicaklik: 6 },
  { il: "Kocaeli", sicaklik: 10 },
  { il: "Konya", sicaklik: 6 },
  { il: "Kütahya", sicaklik: 6 },
  { il: "Malatya", sicaklik: 7 },
  { il: "Manisa", sicaklik: 12 },
  { il: "Kahramanmaraş", sicaklik: 12 },
  { il: "Mardin", sicaklik: 9 },
  { il: "Muğla", sicaklik: 12 },
  { il: "Muş", sicaklik: 4 },
  { il: "Nevşehir", sicaklik: 5 },
  { il: "Niğde", sicaklik: 5 },
  { il: "Ordu", sicaklik: 9 },
  { il: "Rize", sicaklik: 9 },
  { il: "Sakarya", sicaklik: 10 },
  { il: "Samsun", sicaklik: 10 },
  { il: "Siirt", sicaklik: 10 },
  { il: "Sinop", sicaklik: 9 },
  { il: "Sivas", sicaklik: 4 },
  { il: "Tekirdağ", sicaklik: 10 },
  { il: "Tokat", sicaklik: 6 },
  { il: "Trabzon", sicaklik: 9 },
  { il: "Tunceli", sicaklik: 6 },
  { il: "Şanlıurfa", sicaklik: 12 },
  { il: "Uşak", sicaklik: 7 },
  { il: "Van", sicaklik: 3 },
  { il: "Yozgat", sicaklik: 5 },
  { il: "Zonguldak", sicaklik: 8 },
  { il: "Aksaray", sicaklik: 6 },
  { il: "Bayburt", sicaklik: 4 },
  { il: "Karaman", sicaklik: 6 },
  { il: "Kırıkkale", sicaklik: 6 },
  { il: "Batman", sicaklik: 10 },
  { il: "Şırnak", sicaklik: 8 },
  { il: "Bartın", sicaklik: 8 },
  { il: "Ardahan", sicaklik: -2 },
  { il: "Iğdır", sicaklik: 2 },
  { il: "Yalova", sicaklik: 10 },
  { il: "Karabük", sicaklik: 7 },
  { il: "Kilis", sicaklik: 11 },
  { il: "Osmaniye", sicaklik: 13 },
  { il: "Düzce", sicaklik: 8 },
];

const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const geocodingApiUrl = 'https://api.openweathermap.org/geo/1.0/direct';
const API_KEY = "710247d444986fddf5e58a58f0e20f72";

async function ilKoordinatlariGetir(ilAdi) {
  try {
    const params = new URLSearchParams();
    params.append('q', ilAdi);
    params.append('appid', API_KEY);
    const sonuc = await axios(geocodingApiUrl, {params: params});
    return sonuc.data;
    
  } catch (error) {
    console.log(error);
  }
};

async function ilSicakligiGetir(ilAdi) {
  
  try {
    const koordiantlar = await ilKoordinatlariGetir(ilAdi);
    const { lat, lon } = koordiantlar[0];
    
    const params = new URLSearchParams();
    params.append('lat', lat);
    params.append('lon', lon);
    params.append('units', 'metric');
    params.append('lang', 'tr');
    params.append('appid', API_KEY);
    const sonuc = await axios(weatherApiUrl, {params: params});
    console.log(sonuc.data);
    const havaBilgileri = {
      il: ilAdi,
      sicaklik: sonuc.data.main.temp,
    };
    return havaBilgileri;
  } catch (error) {
    console.log(error);
  }
}

async function getRes() {
  return await Promise.all(iller.map(il => ilSicakligiGetir(il)));
}

module.exports = {
  getRes,
  staticData,
}