import { IClientReviewData } from '@/interFace/interFace';
import clientImgOne from '../../public/assets/images/client/01.png';
import clientImgThree from '../../public/assets/images/client/03.png';
import clientFive from '../../public/assets/images/client/05.png';

export const clientReviewData: IClientReviewData[] = [
    {
        id: 1,
        img: clientImgOne,
        name: 'Mason Rodriguez',
        date: 'Aug 11, 2023',
        description: 'The tour kicks off in the bustling metropolis of Bangkok, where the sights and sounds of the city awaken your senses. Explore the ornate temples of Wat Pho and the Grand Palace, marvel at the intricate architecture of Wat Arun, and cruise along the Chao Phraya River to witness life along its banks.'
    },
    {
        id: 2,
        img: clientImgThree,
        name: 'Madison Turner',
        date: 'Aug 11, 2023',
        description: "Throughout the journey, the tour offers a diverse range of activities to suit every traveler's interests. From guided city tours and cultural performances to cooking classNamees and nature hikes, there's something for everyone to enjoy. Plus, ample free time allows for personal exploration and relaxation, ensuring a perfect balance of adventure and leisure."
    },
    {
        id: 3,
        img: clientFive,
        name: 'Ethan Mitchell',
        date: 'Aug 11, 2023',
        description: 'Accommodation is carefully selected to provide comfort, convenience, and authentic local experiences. From boutique hotels in the heart of the city to beachfront resorts overlooking the ocean, each property offers impeccable service and a warm Thai welcome. Transportation between destinations is seamless and hassle-free, with air-conditioned vehicles and knowledgeable guides ensuring a smooth journey throughout.'
    },
]