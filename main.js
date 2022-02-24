const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");

const baseUrl = 'https://www.tripadvisor.com'
const url_ = ["https://www.tripadvisor.com/Attraction_Review-g635745-d6634979-Reviews-Bike_Zanzibar-Jambiani_Zanzibar_Island_Zanzibar_Archipelago.html"];


const newList = [
  
    "https://www.tripadvisor.com/Attraction_Review-g635745-d8454706-Reviews-Uhuru_Kite_Zanzibar-Jambiani_Zanzibar_Island_Zanzibar_Archipelago.html",
    "https://www.tripadvisor.com/Attraction_Review-g635745-d10807582-Reviews-Zanzibar_ProKite-Jambiani_Zanzibar_Island_Zanzibar_Archipelago.html",
    "https://www.tripadvisor.com/Attraction_Review-g635745-d7745502-Reviews-Nakupenda_Diving_Center-Jambiani_Zanzibar_Island_Zanzibar_Archipelago.html",
 ]

const urlList = [
  // "https://www.tripadvisor.com/Hotel_Review-g635745-d1797786-Reviews-Kimte_Beach_Lodge-Jambiani_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g3710413-d14552840-Reviews-Zanzibar_Bay_Resort-Marumbi_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g635745-d637539-Reviews-Visitor_s_Inn_Hotel-Jambiani_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616018-d16720341-Reviews-Bravo_Club_Kiwengwa-Kiwengwa_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616017-d7274550-Reviews-Zanzibar_Bahari_Villas-Matemwe_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g488129-d2261117-Reviews-Funguni_Palace_Hotel-Stone_Town_Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g1170757-d648094-Reviews-Chuini_Zanzibar_Beach_Lodge-Bububu_Zanzibar_Island_Zanzibar_Archipelago.html",
  "https://www.tripadvisor.com/Hotel_Review-g635745-d12072809-Reviews-Ifa_Beach_Resort-Jambiani_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g488129-d497926-Reviews-Jambo_Guest_House-Stone_Town_Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g488129-d8537997-Reviews-Best_Western_Plus_Zanzibar-Stone_Town_Zanzibar_City_Zanzibar_Island_Zanzibar_Archipela.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616018-d12713689-Reviews-Breeze_Residence_Apartments-Kiwengwa_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g482885-d8619539-Reviews-Azao_Resort_Spa-Pongwe_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g488129-d1007373-Reviews-Al_Johari-Stone_Town_Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616018-d5005028-Reviews-Simba_Beach_Zanzibar-Kiwengwa_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g482885-d13737478-Reviews-The_Island_Pongwe_Lodge-Pongwe_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616016-d1410686-Reviews-Game_Fish_Lodge-Nungwi_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g635745-d6395821-Reviews-Boutique_Hotel_Uzuri_Villa-Jambiani_Zanzibar_Island_Zanzibar_Archipelago.html",
  "https://www.tripadvisor.com/Hotel_Review-g488129-d471834-Reviews-Malindi_Guest_House-Stone_Town_Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g635745-d2151922-Reviews-Jambiani_White_Sands_Bungalows-Jambiani_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616018-d13557720-Reviews-Moja_Tuu_The_Luxury_villas_Nature_Retreat-Kiwengwa_Zanzibar_Island_Zanzibar_Archipela.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616016-d3773488-Reviews-Goasis-Nungwi_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616017-d3421145-Reviews-Matemwe_Bandas_Boutique_Hotel_Zanzibar-Matemwe_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616016-d7809392-Reviews-Ebony_Ivory_Bungalows-Nungwi_Zanzibar_Island_Zanzibar_Archipelago.html",
  "https://www.tripadvisor.com/Hotel_Review-g616019-d1937423-Reviews-Makuti_Zanzibar-Bwejuu_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g1945528-d1894159-Reviews-Pemba_Lodge-Kiweni_Shamiani_Pemba_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616018-d2165181-Reviews-Baby_Bush_Lodge_Zanzibar_Kiwengwa_View-Kiwengwa_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g635745-d2039567-Reviews-Mango_Beach_House-Jambiani_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g635745-d8600170-Reviews-Jambiani_Villas-Jambiani_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g644029-d6122842-Reviews-Upendo_Beach-Pingwe_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616019-d945034-Reviews-Evergreen_Bungalows-Bwejuu_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g1631939-d8436290-Reviews-Sunset_Kendwa_Beach_Hotel-Kendwa_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g1576918-d6369482-Reviews-Kae_Funk_Hotel-Michamvi_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616018-d4723638-Reviews-Kamili_View_Apartments-Kiwengwa_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g482885-d11817281-Reviews-White_Paradise_Zanzibar-Pongwe_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616017-d2219322-Reviews-Panga_Chumvi_Beach_Resort-Matemwe_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g635745-d6644025-Reviews-Belvedere_Resort_Zanzibar-Jambiani_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g666396-d7620246-Reviews-Moonshine_Uroa_Boutique_Hotel-Uroa_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g8055401-d14925466-Reviews-Madinat_Al_Bahr_Business_Spa_Hotel-Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelag.html",
  // "https://www.tripadvisor.com/Hotel_Review-g488129-d1800366-Reviews-Zanzibar_Hotel-Stone_Town_Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616019-d1400470-Reviews-Mustapha_s_Place-Bwejuu_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616016-d1378880-Reviews-The_Nungwi_Inn_Hotel-Nungwi_Zanzibar_Island_Zanzibar_Archipelago.html",
  "https://www.tripadvisor.com/Hotel_Review-g616020-d610765-Reviews-Cristal_Resort-Paje_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616018-d11715927-Reviews-Marafiki_Bungalows-Kiwengwa_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616017-d9857583-Reviews-Miramont_Retreat_Zanzibar-Matemwe_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g488129-d4717611-Reviews-Forodhani_Park_Hotel-Stone_Town_Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616020-d615577-Reviews-Arabian_Nights_Hotel-Paje_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616016-d628192-Reviews-Sazani_Beach_Lodge-Nungwi_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616017-d1757350-Reviews-Sele_s_Bungalows-Matemwe_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g635745-d14791289-Reviews-Fun_Beach_Hotel-Jambiani_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g8055401-d10434047-Reviews-Golden_Tulip_Zanzibar_Resort-Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g482884-d15336746-Reviews-New_Teddy_s_on_the_Beach-Zanzibar_Island_Zanzibar_Archipelago.html",
  "https://www.tripadvisor.com/Hotel_Review-g1170757-d1087095-Reviews-Imani_Beach_Villa-Bububu_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616016-d9704625-Reviews-Atii_Garden_Bungalows-Nungwi_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g666396-d10449928-Reviews-Mermaids_Cove_Beach_Resort_Spa-Uroa_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g1631939-d9862855-Reviews-Natural_Kendwa_Villa-Kendwa_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g488129-d601114-Reviews-Hotel_Verde_Zanzibar_Azam_Luxury_Resort_and_Spa-Stone_Town_Zanzibar_City_Zanzibar_Islan.html",
  // "https://www.tripadvisor.com/Hotel_Review-g1238567-d1238255-Reviews-Mangrove_Lodge-Chuini_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g488129-d1509963-Reviews-Kiponda_B_B-Stone_Town_Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html",
  "https://www.tripadvisor.com/Hotel_Review-g488129-d636691-Reviews-Princess_Salme_Inn-Stone_Town_Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616016-d659104-Reviews-Tanzanite_Beach_Resort-Nungwi_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g635745-d1102754-Reviews-Pakachi_Beach_Hotel-Jambiani_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g635745-d3950064-Reviews-La_Papaye_Verte-Jambiani_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616019-d674682-Reviews-Twisted_Palms_Lodge_Restaurant-Bwejuu_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616017-d3824781-Reviews-Zanzibar_House-Matemwe_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g635745-d650312-Reviews-Uhuru_Beach-Jambiani_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616016-d12786499-Reviews-Nungwi_Dreams_by_Mantis-Nungwi_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616018-d2531396-Reviews-Bahati_Villa-Kiwengwa_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g635745-d7187927-Reviews-Villaggio_Seconda_Stella_a_Destra-Jambiani_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g1025225-d1380779-Reviews-La_Madrugada_Beach_Resort-Makunduchi_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g635745-d10847636-Reviews-Sharazad_Boutique_Hotel-Jambiani_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g488128-d555009-Reviews-AndBeyond_Mnemba_Island-Mnemba_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g482884-d1199174-Reviews-Mchanga_Beach_Resort-Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g480245-d1207639-Reviews-Gecko_Nature_Lodge-Pemba_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616018-d10781448-Reviews-Zanbluu_Beach_Hotel-Kiwengwa_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g488129-d1950727-Reviews-Golden_Tulip_Stonetown_Boutique-Stone_Town_Zanzibar_City_Zanzibar_Island_Zanzibar_Arch.html",
  // "https://www.tripadvisor.com/Hotel_Review-g635745-d8742376-Reviews-Zanzistar_Lodge-Jambiani_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g488129-d629320-Reviews-Beyt_Al_Salaam_Boutique_Hotel-Stone_Town_Zanzibar_City_Zanzibar_Island_Zanzibar_Archipe.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616019-d754416-Reviews-Echo_Beach_Hotel-Bwejuu_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616019-d1389071-Reviews-Bellevue_Guesthouse-Bwejuu_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g482885-d8469799-Reviews-Tulia_Zanzibar_Unique_Beach_Resort-Pongwe_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616018-d7064170-Reviews-Zan_View_Hotel-Kiwengwa_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616016-d2157558-Reviews-Diamonds_Star_of_the_East-Nungwi_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616019-d1417924-Reviews-Anna_of_Zanzibar-Bwejuu_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616018-d2309182-Reviews-Kiwengwa_Bungalow_Boutique_Resort-Kiwengwa_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g488129-d1734959-Reviews-Stone_Town_Cafe_and_Bed_Breakfast-Stone_Town_Zanzibar_City_Zanzibar_Island_Zanzibar_Ar.html",
  // "https://www.tripadvisor.com/Hotel_Review-g635745-d12634738-Reviews-The_Loop_Beach_Resort-Jambiani_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g480245-d8112643-Reviews-The_Aiyana_Resort_Spa-Pemba_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616020-d1101991-Reviews-Kilima_Kidogo_Guesthouse-Paje_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g635745-d9459096-Reviews-Mwezi_Boutique_Resort-Jambiani_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g488129-d1208104-Reviews-The_Swahili_House-Stone_Town_Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g656265-d1905844-Reviews-Promised_Land_Lodge-Kizimkazi_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g482885-d3226171-Reviews-Seasons_Lodge_Zanzibar-Pongwe_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616016-d15137844-Reviews-Sandies_Baobab_Beach_Zanzibar-Nungwi_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g482885-d6027672-Reviews-Pongwe_Bay_Resort-Pongwe_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616017-d1529211-Reviews-Kasha_Boutique_Hotel-Matemwe_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g635745-d2001892-Reviews-Spice_Island_Hotel_Resort-Jambiani_Zanzibar_Island_Zanzibar_Archipelago.html",
  "https://www.tripadvisor.com/Hotel_Review-g1631939-d1499972-Reviews-Elewana_Kilindi_Zanzibar-Kendwa_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g13222123-d16679667-Reviews-SeVi_Boutique_Hotel_Zanzibar-Kigomani_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g644029-d2644682-Reviews-Boutique_Hotel_Matlai-Pingwe_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616018-d1151894-Reviews-Blu_Marlin_Village-Kiwengwa_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616016-d9718612-Reviews-Warere_Beach_Hotel-Nungwi_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616016-d1765466-Reviews-Smiles_Beach_Hotel-Nungwi_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616017-d3935880-Reviews-Sunshine_Marine_Lodge-Matemwe_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g488129-d609813-Reviews-Protea_Hotel_Zanzibar_Mbweni_Ruins-Stone_Town_Zanzibar_City_Zanzibar_Island_Zanzibar_Ar.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616018-d1599909-Reviews-Mvuvi_Resort-Kiwengwa_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g488129-d12923547-Reviews-Ten_to_Ten-Stone_Town_Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html",
  "https://www.tripadvisor.com/Hotel_Review-g616020-d2281312-Reviews-Demani_Lodge-Paje_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g8055401-d13425219-Reviews-Baladin_Zanzibar_Beach_Hotel-Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g635745-d613272-Reviews-Villa_de_Coco_Resort-Jambiani_Zanzibar_Island_Zanzibar_Archipelago.html",
  "https://www.tripadvisor.com/Hotel_Review-g488129-d1996136-Reviews-Hiliki_House-Stone_Town_Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616019-d7040116-Reviews-Indigo_Beach_Zanzibar-Bwejuu_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g488129-d593746-Reviews-The_Africa_House_Hotel-Stone_Town_Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g635745-d814792-Reviews-Mbuyuni_Beach_Village-Jambiani_Zanzibar_Island_Zanzibar_Archipelago.html",
  "https://www.tripadvisor.com/Hotel_Review-g656265-d7261370-Reviews-Fruit_Spice_Wellness_Resort-Kizimkazi_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g6502134-d12461232-Reviews-The_Sands_Beach_Resort_Zanzibar-Dongwe_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616016-d12585280-Reviews-Makofi_Guest_House-Nungwi_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g635745-d2013646-Reviews-Zanzest_Beach_Bungalows-Jambiani_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616020-d2056981-Reviews-Ndame_Beach_Lodge-Paje_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616018-d625937-Reviews-Shooting_Star_Lodge-Kiwengwa_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g1576918-d1094003-Reviews-Michamvi_Sunset_Bay_Resort-Michamvi_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g6502134-d10070869-Reviews-Zawadi_Hotel_Zanzibar-Dongwe_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g635745-d622789-Reviews-Blue_Oyster_Hotel-Jambiani_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g488129-d1550597-Reviews-The_Seyyida_Hotel_Spa-Stone_Town_Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g1576918-d970051-Reviews-Pearl_Beach_Resort_Spa_Zanzibar-Michamvi_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g488129-d6898990-Reviews-Emerson_on_Hurumzi-Stone_Town_Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g488129-d4093851-Reviews-Al_Minar_Hotel-Stone_Town_Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g480245-d480074-Reviews-Fundu_Lagoon-Pemba_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g656265-d659132-Reviews-Karamba-Kizimkazi_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616020-d564213-Reviews-Paje_by_Night_Hotel-Paje_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g488129-d2077685-Reviews-Kholle_House-Stone_Town_Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g635745-d2359464-Reviews-Mamamapambo_Boutique_Hotel-Jambiani_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616020-d6936552-Reviews-Kisiwa_On_The_Beach_Resort-Paje_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g635745-d578113-Reviews-Casa_Del_Mar_Hotel-Jambiani_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g635745-d2501102-Reviews-Reef_Beach_Resort-Jambiani_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616019-d5772912-Reviews-Sahari_Zanzibar-Bwejuu_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g488129-d1394274-Reviews-Warere_Town_House-Stone_Town_Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616019-d9860487-Reviews-African_Sun_Sand_Sea_Resort_Spa-Bwejuu_Zanzibar_Island_Zanzibar_Archipelago.html",
  "https://www.tripadvisor.com/Hotel_Review-g616017-d1237956-Reviews-Kena_Beach_Hotel-Matemwe_Zanzibar_Island_Zanzibar_Archipelago.html",
  "https://www.tripadvisor.com/Hotel_Review-g1631939-d7367410-Reviews-PalumboKendwa-Kendwa_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g488129-d1646377-Reviews-Kisiwa_House-Stone_Town_Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g6502134-d1587308-Reviews-Albatross_Ocean_View-Dongwe_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g1631939-d13509925-Reviews-Zuri_Zanzibar-Kendwa_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g488129-d1423277-Reviews-Zenji_Hotel-Stone_Town_Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g482884-d629134-Reviews-Sunset_Kendwa-Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616017-d1830981-Reviews-Sunshine_Hotel_Zanzibar-Matemwe_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616016-d1485024-Reviews-The_Zanzibari-Nungwi_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g488129-d625748-Reviews-Fumba_Beach_Lodge-Stone_Town_Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html",
  "https://www.tripadvisor.com/Hotel_Review-g488129-d1996451-Reviews-Jafferji_House_Spa-Stone_Town_Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g480245-d509944-Reviews-The_Manta_Resort-Pemba_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616019-d596226-Reviews-The_Palms_Zanzibar-Bwejuu_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616020-d586153-Reviews-Hakuna_Majiwe_Beach_Lodge-Paje_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g1576918-d785698-Reviews-Kichanga_Lodge-Michamvi_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616017-d1215947-Reviews-Zanzibar_Retreat_Hotel-Matemwe_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g482884-d3367324-Reviews-Zanzi_Resort-Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g666396-d1498001-Reviews-Samaki_Lodge_Spa-Uroa_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616016-d596380-Reviews-Mnarani_Beach_Cottages-Nungwi_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g778788-d673930-Reviews-Coral_Reef_Beach_Resort-Pwani_Mchangani_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g666396-d8451373-Reviews-Paradise_Beach_Resort-Uroa_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g488129-d623545-Reviews-Zanzibar_Palace_Hotel-Stone_Town_Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616020-d4593983-Reviews-Zanzibar_White_Sand_Luxury_Villas_Spa_Relais_Chateaux-Paje_Zanzibar_Island_Zanzibar_Ar.html",
  // "https://www.tripadvisor.com/Hotel_Review-g488129-d2076576-Reviews-Emerson_Spice_Hotel-Stone_Town_Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g482884-d523529-Reviews-Chumbe_Island_Coral_Park-Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616016-d648758-Reviews-Langi_Langi_Beach_Bungalows-Nungwi_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g778788-d1465867-Reviews-Next_Paradise_Boutique_Resort-Pwani_Mchangani_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g1576918-d1546316-Reviews-Konokono_Beach_Resort-Michamvi_Zanzibar_Island_Zanzibar_Archipelago.html",
  "https://www.tripadvisor.com/Hotel_Review-g488129-d3168034-Reviews-Maru_Maru_Hotel-Stone_Town_Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g488129-d483610-Reviews-Zanzibar_Serena_Hotel-Stone_Town_Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g488129-d531212-Reviews-Dhow_Palace_Hotel-Stone_Town_Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616016-d636698-Reviews-Amaan_Beach_Bungalows-Nungwi_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g1631939-d581428-Reviews-Kendwa_Rocks_Beach_Hotel-Kendwa_Zanzibar_Island_Zanzibar_Archipelago.html",
  "https://www.tripadvisor.com/Hotel_Review-g616016-d2076584-Reviews-Essque_Zalu_Zanzibar-Nungwi_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g488129-d6865121-Reviews-DoubleTree_by_Hilton_Hotel_Zanzibar_Stone_Town-Stone_Town_Zanzibar_City_Zanzibar_Islan.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616018-d1018166-Reviews-Veraclub_Zanzibar_Village-Kiwengwa_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g666396-d1759420-Reviews-Uroa_Bay_Beach_Resort-Uroa_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616018-d2275687-Reviews-Kiwengwa_Beach_Resort-Kiwengwa_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616018-d677013-Reviews-Diamonds_Mapenzi_Beach-Kiwengwa_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616018-d480085-Reviews-Ocean_Paradise_Resort_Spa_Zanzibar-Kiwengwa_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g488129-d7736739-Reviews-Park_Hyatt_Zanzibar-Stone_Town_Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g778788-d1937707-Reviews-AHG_Waridi_Beach_Resort_Spa-Pwani_Mchangani_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g778788-d676737-Reviews-Neptune_Pwani_Beach_Resort_Spa_All_Inclusive-Pwani_Mchangani_Zanzibar_Island_Zanzibar_A.html",
  // "https://www.tripadvisor.com/Hotel_Review-g1631939-d3451104-Reviews-Gold_Zanzibar_Beach_House_Spa-Kendwa_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g482885-d495960-Reviews-Pongwe_Beach_Hotel-Pongwe_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616019-d1193142-Reviews-Baraza_Resort_and_Spa_Zanzibar-Bwejuu_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g11742689-d1982645-Reviews-Sea_Cliff_Resort_Spa-Kama_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g644029-d618327-Reviews-Karafuu_Beach_Resort_and_Spa-Pingwe_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616016-d1233201-Reviews-My_Blue_Hotel-Nungwi_Zanzibar_Island_Zanzibar_Archipelago.html",
  "https://www.tripadvisor.com/Hotel_Review-g488129-d593744-Reviews-Tembo_House_Hotel-Stone_Town_Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g666396-d1237832-Reviews-Palumboreef_Reef_Beach_Resort-Uroa_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616016-d1028109-Reviews-Sunset_Beach_Resort_Zanzibar-Nungwi_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616016-d1148051-Reviews-The_Z_Hotel_Zanzibar-Nungwi_Zanzibar_Island_Zanzibar_Archipelago.html",
  "https://www.tripadvisor.com/Hotel_Review-g616016-d602028-Reviews-Hotel_La_Gemma_Dell_Est-Nungwi_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g6502134-d1159362-Reviews-Dongwe_Resort-Dongwe_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g1631939-d2048414-Reviews-Eden_Village_Kendwa_Beach_Resort-Kendwa_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616018-d677651-Reviews-VOI_Kiwengwa_Resort-Kiwengwa_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616016-d1175635-Reviews-Royal_Zanzibar_Beach_Resort-Nungwi_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616019-d497502-Reviews-Breezes_Beach_Club_Spa-Bwejuu_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g656265-d2038075-Reviews-The_Residence_Zanzibar-Kizimkazi_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616016-d1634559-Reviews-DoubleTree_Resort_by_Hilton_Zanzibar_Nungwi-Nungwi_Zanzibar_Island_Zanzibar_Archipelag.html",
  // "https://www.tripadvisor.com/Hotel_Review-g778788-d1673690-Reviews-TUI_BLUE_Bahari_Zanzibar-Pwani_Mchangani_Zanzibar_Island_Zanzibar_Archipelago.html",
  // "https://www.tripadvisor.com/Hotel_Review-g616018-d585857-Reviews-Melia_Zanzibar-Kiwengwa_Zanzibar_Island_Zanzibar_Archipelago.html",
]
var index = 0;

async function scrape(url,index) {
  axios.get(url).then(response => {
    var html = response.data;
    var $ = cheerio.load(html);
    const src = $("script").eq(25).html().toString().replace("window.__WEB_CONTEXT__={pageManifest:", "").replace("};(this.$WP=this.$WP||[]).push(['@ta/features',function(e){return [function(){e('default',__WEB_CONTEXT__.pageManifest.features);},[]]},[]]);", "")
    const title = $("#HEADING").text()
    console.log(title);
    require('fs').writeFileSync('./data/'+ title+'.json', src)
    // require('fs').writeFileSync('./data/' + title + '.html', html);
    var currentPageIndex = $('.current').text();
    console.log(currentPageIndex);
    var nextPageIndex = $('.pageNumbers').children().get(currentPageIndex).children[0].data
    console.log(nextPageIndex);

    var nextPage = $('.pageNumbers').children().get(currentPageIndex).children[0].parent.attribs.href;
    console.log(nextPage);


    console.log('Beginning of while loop');


    console.log('Inside while loop');
    something()
    async function something() {
      if (parseInt(currentPageIndex) + 1 == nextPageIndex) {
        await axios.get(baseUrl + nextPage).then(res => {
          var html1 = res.data;
          $ = cheerio.load(html1);
          var src1 = $("script").eq(25).html().toString().replace("window.__WEB_CONTEXT__={pageManifest:", "").replace("};(this.$WP=this.$WP||[]).push(['@ta/features',function(e){return [function(){e('default',__WEB_CONTEXT__.pageManifest.features);},[]]},[]]);", "")
          console.log(title);
          require('fs').writeFileSync('./data/' + title + nextPageIndex + '.json', src1);
          currentPageIndex = $('.current').text();
          console.log(currentPageIndex);
          nextPageIndex = $('.pageNumbers').children().get(currentPageIndex).children[0].data
          nextPage = $('.pageNumbers').children().get(currentPageIndex).children[0].parent.attribs.href;
          console.log(nextPage);

        })
        something();
      }
    }
  })
}

// scrape(url)

newList.forEach(element => {
  index++
  scrape(element, index);
});