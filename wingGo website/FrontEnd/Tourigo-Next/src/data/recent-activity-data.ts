import tourImgNine from '../../public/assets/images/tour/tour-img-9.png';
import tourImgTen from '../../public/assets/images/tour/tour-img-10.png';
import tourImgEleven from '../../public/assets/images/tour/tour-img-11.png';
import tourImgTwelve from '../../public/assets/images/tour/tour-img-12.png';
import { IDashRecentActivityType } from '@/interFace/interFace';

export const recentActivityData: IDashRecentActivityType[] = [
    {
        id: 1,
        img: tourImgNine,
        day: '21',
        month: 'April',
        title: 'Enchanted Island Escapades: Mystical',
        location: 'Four Seasons Hotel Greshamc Palace',
        adult: 3,
        infant: 1,
        price: 18925,
        tripId: 'TG-3564-BD00',
        tripDate: 'Sunday, 21, 2024',
    },
    {
        id: 2,
        img: tourImgTen,
        day: '18',
        month: 'April',
        title: 'Everest Trekking Adventure Tour',
        location: 'Four Seasons Hotel Greshamc Palace',
        adult: 2,
        price: 2500,
        tripId: 'TG-3564-BD02',
        tripDate: 'Thursday, 18, 2024',
    },
    {
        id: 3,
        img: tourImgEleven,
        day: '12',
        month: 'April',
        title: 'Safari Serenity: Wild Encounters',
        location: 'Four Seasons Hotel Greshamc Palace',
        adult: 1,
        price: 1650,
        tripId: 'TG-3564-BD03',
        tripDate: 'Sunday, 12, 2024',
    },
    {
        id: 4,
        img: tourImgTwelve,
        day: '10',
        month: 'April',
        title: 'Family Fun Creating Memoirs Around',
        location: 'Four Seasons Hotel Greshamc Palace',
        adult: 5,
        infant: 2,
        price: 22250,
        tripId: 'TG-3564-BD04',
        tripDate: 'Wednesday, 10, 2024',
    },
]