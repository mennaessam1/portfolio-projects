import { PopularActivity } from "@/interFace/interFace";
import ActivityImgTwentyTwo from "../../../public/assets/images/activity/activity-img-22.png";
import ActivityImgTwentyThree from "../../../public/assets/images/activity/discovertheworld.jpg.webp";
import ActivityImgTwentyFour from "../../../public/assets/images/activity/activity-img-24.png";
import ActivityImgTwentyFive from "../../../public/assets/images/activity/swimming.jpeg";
import ActivityImgTwentySix from "../../../public/assets/images/activity/hiking.jpg";
import ActivityImgTwentySeven from "../../../public/assets/images/activity/activity-img-27.png";
import clientOne from "../../../public/assets/images/client/person1.png";
import clientTwo from "../../../public/assets/images/client/person2.jpg";
import clientThree from "../../../public/assets/images/client/person3.jpeg";

export const popularActivityData: PopularActivity[] = [


  {
    id: "pills-item-three",
    title: "Adventure travel",
    icon: "icon-cycling",
    image: ActivityImgTwentyThree,
    linkTitle: "Beyond Borders: Thrilling Adventures Await",
    description:
      "Embark on Epic Journeys, Discover Untamed Landscapes, and Create Unforgettable Memories",
    clients: [clientOne, clientTwo, clientThree],
    clientCount: "3K+",
  },

  {
    id: "pills-item-five",
    title: "Swimming & fishing",
    icon: "icon-fishing",
    image: ActivityImgTwentyFive,
    linkTitle: "Aquatic Pursuits: The Harmony of Swimming and Fishing",
    description:
      "Dive into Tranquil Waters, Cast Your Line, and Reel in Memories",
    clients: [clientOne, clientTwo, clientThree],
    clientCount: "3K+",
  },
  {
    id: "pills-item-six",
    title: "Hiking mountain",
    icon: "icon-mountain",
    image: ActivityImgTwentySix,
    linkTitle: "Summit Seekers: A Journey Through Mountain Majesty",
    description:
      "Ascending Peaks, Embracing Solitude, and Finding Serenity in the Heights",
    clients: [clientOne, clientTwo, clientThree],
    clientCount: "3K+",
  },
];
