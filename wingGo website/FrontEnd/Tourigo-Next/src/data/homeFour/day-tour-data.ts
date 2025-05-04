import { IDayTourDataType } from '@/interFace/interFace'
import tourImgEighteen from '../../../public/assets/images/tour/tour-img-18.png'
import tourImgNineteen from '../../../public/assets/images/tour/tour-img-19.png'
import tourImgTwenty from '../../../public/assets/images/tour/tour-img-20.png'

export const dayTourData: IDayTourDataType[] = [
    {
        id: 1,
        img: tourImgEighteen,
        tourTitle: 'Mountain Majesty',
        tourLocation: 'Paris',
        tourTime: 5,
        description: 'Share the core values and principles that drive your company. Emphasize a commitm.',
    },
    {
        id: 2,
        img: tourImgNineteen,
        tourTitle: 'Thrills & Spills Road',
        tourLocation: 'Norway',
        tourTime: 5,
        description: 'Share the core values and principles that drive your company. Emphasize a commitm.',
    },
    {
        id: 3,
        img: tourImgTwenty,
        tourTitle: 'Seaside View in a Day',
        tourLocation: 'Ireland',
        tourTime: 5,
        description: 'Share the core values and principles that drive your company. Emphasize a commitm.',
    },
]