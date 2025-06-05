import Banner from "@/components/layout/Home/Banner";
import ImageTextSection from "@/components/layout/Home/ImageTextSection";
import SearchByCity from "@/components/layout/Home/SearchByCity";
import StartYourJourney from "@/components/layout/Home/StartYourJourney";
import TopOffers from "@/components/layout/Home/TopOffers";
import WhatMyCustomerSays from "@/components/layout/Home/WhatMyCustomerSays";

export default function Home() {
  return (

    // TODO: 
    // ! Responsive design.
    // ! 

    <div className="">
      <Banner />
      <StartYourJourney />
      <TopOffers />
      <SearchByCity />
      <ImageTextSection />
      <div className="max-w-screen-2xl mx-auto">
        <WhatMyCustomerSays />
      </div>
    </div>
  );
}
