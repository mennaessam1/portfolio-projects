import { title } from 'process';
import bannerFiveImgOne from '../../../public/assets/images/banner/banner-5/visit1.jpg';
import bannerFiveImgTwo from '../../../public/assets/images/banner/banner-5/visit2.jpg';
import bannerFiveImgThree from '../../../public/assets/images/banner/banner-5/visit3.jpg';
import { IBannerData } from '@/interFace/interFace';

export const bannerFiveData: IBannerData[] = [
    {
        id: 1,
        img: bannerFiveImgOne,
        subTitle: 'Tour & Travel',
        title: 'Uncover Paradise Journey into ',
        warningText: 'Spectacular',
        description: '8700 TOURS ARE AVAILABLE, ',
    },
    {
        id: 2,
        img: bannerFiveImgThree,
        subTitle: 'Tour & Travel',
        title: 'Skybound Adventures: Fly High with ',
        warningText: 'Tourigo',
        description: '8700 TOURS ARE AVAILABLE, ',
    },
    {
        id: 3,
        img: bannerFiveImgTwo,
        subTitle: 'Tour & Travel',
        title: 'Revealing Eden: Exploring the ',
        warningText: 'Magnificent',
        description: '8700 TOURS ARE AVAILABLE, ',
    },
]