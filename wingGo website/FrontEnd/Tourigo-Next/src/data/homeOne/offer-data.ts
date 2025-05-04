import { IOfferDataType } from "@/interFace/interFace";
import dataBgOne from '../../../public/assets/images/offer/offer-img-1.png';
import dataBgTwo from '../../../public/assets/images/offer/offer-img-2.png';

export const offerData: IOfferDataType[] = [
    {
        id: 1,
        img: dataBgOne,
        offerSubTitle: 'GET OFFER NOW',
        offerTitle:'Buy 1 Package',
        offerTitleTwo:'Get 1 Free Now!',
        desctiption: 'Share the core values and principles',
    },
    {
        id: 2,
        img: dataBgTwo,
        offerSubTitle: 'GET OFFER NOW',
        offerTitle:'Ultimate Adventure',
        offerTitleTwo:'Awaits!',
        desctiption: 'Share the core values and principles',
    },
]