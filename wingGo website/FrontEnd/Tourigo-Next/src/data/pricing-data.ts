import { IPricingPlan } from "@/interFace/interFace";
import pricingImgOne from '../../public/assets/images/priceing/pricing-img-1.png';
import pricingImgTwo from '../../public/assets/images/priceing/pricing-img-2.png';
import pricingImgThree from '../../public/assets/images/priceing/pricing-img-3.png';

export const pricingData: IPricingPlan[] = [
    {
        id: 1,
        img: pricingImgOne,
        plan: "Basic",
        price: 149.99,
        pricingContent:{
                person: 1,
                duration: '3 Night 4 days',
                dinner: 'Dinner Included',
                travelSpot: 2,
                lunch: 'Lunch Included',
            }
        
    },
    {
        id: 2,
        img: pricingImgTwo,
        class: 'active-pricing',
        plan: "Standard",
        price: 199.99,
        pricingContent: {
                person: 5,
                duration: '4 Night 5 days',
                dinner: 'Dinner Included',
                travelSpot: 3,
                lunch: 'Lunch Included',
            }
        
    },
    {
        id: 3,
        img: pricingImgThree,
        plan: "Premium",
        price: 599.99,
        pricingContent:{
                person: 5,
                duration: '6 Night 7 days',
                dinner: 'Dinner Included',
                travelSpot: 5,
                lunch: 'Lunch Included',
            }
        
    },
]