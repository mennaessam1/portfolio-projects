import { IActivityDataType } from "@/interFace/interFace";
import ActivityOne from "../../public/assets/images/activity/activity-img-1.png";
import ActivityTwo from "../../public/assets/images/activity/activity-img-2.png";
import ActivityThree from "../../public/assets/images/activity/activity-img-3.png";
import ActivityFour from "../../public/assets/images/activity/activity-img-8.png";
import ActivityFive from "../../public/assets/images/activity/activity-img-5.png";
import ActivitySix from "../../public/assets/images/activity/activity-img-6.png";
import ActivitySeven from "../../public/assets/images/activity/activity-img-7.png";
import ActivityEight from "../../public/assets/images/activity/activity-img-8.png";
import ActivityNine from "../../public/assets/images/activity/activity-img-9.png";
import ActivityTen from "../../public/assets/images/activity/activity-img-18.png";
import ActivityEleven from "../../public/assets/images/activity/activity-img-19.png";
import ActivityTwelve from "../../public/assets/images/activity/activity-img-20.png";
import ActivityThirteen from "../../public/assets/images/activity/activity-img-21.png";
import ActivityFourteen from "../../public/assets/images/activity/activity-img-17.png";
import ActivityTwentyEight from "../../public/assets/images/activity/activity-img-28.png";
import ActivityTwentyNine from "../../public/assets/images/activity/activity-img-29.png";
import ActivityThirty from "../../public/assets/images/activity/activity-img-30.png";
import ActivityThirtyOne from "../../public/assets/images/activity/activity-img-31.png";

export const activityData: IActivityDataType[] = [
  //activity home one start
  {
    id: 1,
    img: ActivityOne,
    title: "City Tours",
    count: 100,
    rating: "4.4",
    delay: ".3s",
  },
  {
    id: 2,
    img: ActivityTwo,
    title: "Beach Tours",
    count: 100,
    rating: "5.0",
    delay: ".4s",
  },
  {
    id: 3,
    img: ActivityThree,
    title: "Wilelife Tours",
    count: 50,
    rating: "4.8",
    delay: ".5s",
  },
  {
    id: 4,
    img: ActivityFour,
    title: "Adventure Tours",
    count: 5,
    rating: "5",
    delay: ".6s",
  },
  //activity home one end
  //activity home two start
  {
    id: 5,
    title: "City Tours",
    count: 100,
    img: ActivityFive,
  },
  {
    id: 6,
    title: "Mountain Everest Tours",
    count: 100,
    img: ActivitySix,
  },
  {
    id: 7,
    title: "Mountain Tours",
    count: 100,
    img: ActivitySeven,
  },
  {
    id: 8,
    title: "See Tour",
    count: 100,
    img: ActivityEight,
  },
  {
    id: 9,
    title: "Beach Tour",
    count: 100,
    img: ActivityNine,
  },
  //activity home two end
  //activity home three start
  {
    id: 10,
    title: "Sintra, Portugal",
    count: 90,
    img: ActivityTen,
  },
  {
    id: 11,
    title: "Ronda, Spain",
    count: 40,
    img: ActivityEleven,
  },
  {
    id: 12,
    title: "Cesky Krumlov",
    count: 10,
    img: ActivityTwelve,
  },
  {
    id: 13,
    title: "Matera, Italy",
    count: 9,
    img: ActivityThirteen,
  },
  {
    id: 14,
    title: "Bled, Slovenia",
    count: 3,
    img: ActivityFourteen,
  },
  //activity home three end
  //activity home four start
  {
    id: 15,
    img: ActivityTwentyEight,
    title: "Guided City Tours Night Light",
    rating: "5.0",
  },
  {
    id: 16,
    img: ActivityTwentyNine,
    title: "Engaging in thrilling activities",
    rating: "5.0",
  },
  {
    id: 17,
    img: ActivityThirty,
    title: "Tent camping services",
    rating: "4.8",
  },
  {
    id: 18,
    img: ActivityThirtyOne,
    title: "Boat Cruises Segway Tourism",
    rating: "4.7",
  },
  //activity home four end
];
