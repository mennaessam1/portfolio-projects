import { IhomeDemoPageDataType } from '@/interFace/interFace';
import homeOneImage from '../../../public/assets/images/landing-page/demo-present/home-1.png';
import homeTwoImage from '../../../public/assets/images/landing-page/demo-present/home-2.png';
import homeThreeImage from '../../../public/assets/images/landing-page/demo-present/home-3.png';
import homeFourImage from '../../../public/assets/images/landing-page/demo-present/home-4.png';
import homeFiveImage from '../../../public/assets/images/landing-page/demo-present/home-5.png';
import homeSixImage from '../../../public/assets/images/landing-page/demo-present/home-6.png';

export const demoPageData : IhomeDemoPageDataType[] = [
    {
        id: 1,
        img: homeOneImage,
        title: 'Home Page One',
        route:'/home',
        timeDelay: ".3s",
        blurStyle: '',
    },
    {
        id: 2,
        img: homeTwoImage,
        title: 'Home Page Two',
        route:'/home-two',
        timeDelay: ".4s",
        blurStyle: '',
    },
    {
        id: 3,
        img: homeThreeImage,
        title: 'Home Page Three',
        route:'/home-three',
        timeDelay: ".5s",
        blurStyle: '',
    },
    {
        id: 4,
        img: homeFourImage,
        title: 'Home Page Four',
        route:'/home-four',
        timeDelay: ".6s",
        blurStyle: '',
    },
    {
        id: 5,
        img: homeFiveImage,
        title: 'Home Page Five',
        route:'/home-five',
        timeDelay: ".7s",
        blurStyle: '',
    },
    {
        id: 6,
        img: homeSixImage,
        title: '5 New Home Coming Soon',
        route:'#',
        timeDelay: ".8s",
        blurStyle: 'coming-soon',
    },
]