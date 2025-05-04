import { IHomeTwoSliderData } from "@/interFace/interFace";
import bannerImgOne from '../../../public/assets/images/banner/home2.jpg';
import bannerImgTwo from '../../../public/assets/images/banner/home2.jpg';
import bannerImgThree from '../../../public/assets/images/banner/home2.jpg';

export const sliderData: IHomeTwoSliderData[] = [
    {
        id: 1,
        bgImg: bannerImgOne,
        tagOne: "Mountain Serenity: Finding",
        tagTwo: "Peace",
        tagThree: "Amidst Alpine Majesty",
        description: "A picturesque picnic for two, basking in nature's serenity, forging memories to last a lifetime."
    },
    {
        id: 2,
        bgImg: bannerImgTwo,
        tagOne: " Conquering the Waves:",
        tagTwo: "Thrilling",
        tagThree: 'Water Mount Adventure',
        description: "Riding the waves: A man finds joy and adventure on his water mount."
    },
    {
        id: 3,
        bgImg: bannerImgThree,
        tagOne: "Glide into Adventure: Couples",
        tagTwo: "Water",
        tagThree: 'Skating Delight',
        description: "Embrace the thrill as couples glide together, savoring the joy of water skating delightfully."
    },
];