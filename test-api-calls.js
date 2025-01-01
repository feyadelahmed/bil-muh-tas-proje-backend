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
}