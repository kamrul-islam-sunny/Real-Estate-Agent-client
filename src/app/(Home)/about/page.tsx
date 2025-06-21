import CustomBreadcrumb from "@/components/layout/Shared/CustomBreadcrumb"
import Image from "next/image";
import AboutImage from '@/../public/aboutPerson.png'
import skill from '@/../public/asset/WhyChooseMe/skill.svg'
import community from '@/../public/asset/WhyChooseMe/Community.svg'
import support from '@/../public/asset/WhyChooseMe/support.svg'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


export default function aboutPage() {
    return (
        <>
            <CustomBreadcrumb currentPage="About" BreadcrumbLinkFrom="Home" />

            <div className="px-[5%]">
                <div className="max-w-screen-xl mx-auto mt-10">
                    <h1 className="max-w-lg mx-auto text-3xl sm:text-[56px] font-normal font-anton text-center pt-8 sm:pt-18">Hi, I am  <span className="text-accent-gold">Lorem ispum </span> <br />
                        I can be your next real <br />
                        estate partner</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-12">
                        <div className="place-items-center ">
                            <Image src={AboutImage} alt="" height={450} width={350} className="h-[400px] w-full sm:w-fit object-cover object-top" />
                        </div>
                        <div className="place-content-center">
                            <p className="text-lg font-nunito">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-[5%]  bg-light-bg py-12 sm:py-18">
                <div className="max-w-screen-xl mx-auto">
                    <h1 className="text-3xl sm:text-[56px] font-anton text-center">Why  <span className="text-accent-gold ">Choose</span> Me</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-10">
                        <div className=" flex flex-col items-center py-14 px-10 bg-white">
                            <Image src={skill} alt="" height={100} width={100} className="mb-7" />
                            <h2 className="text-[28px] font-anton mb-4 text-center">Strong
                                Negotiation Skills</h2>
                            <p className="text-lg text-gray-medium text-center">When you choose us as your real estate partner in Toronto, you can count on our unwavering commitment to your success. Best expertise realtor or agent is here</p>
                        </div>
                        <div className=" flex flex-col items-center py-14 px-10 bg-white">
                            <Image src={community} alt="" height={100} width={100} className="mb-7" />
                            <h2 className="text-[28px] font-anton mb-4 text-center">Community
                                Involvement</h2>
                            <p className="text-lg text-gray-medium text-center">When you choose us as your real estate partner in Toronto, you can count on our unwavering commitment to your success. Best expertise realtor or agent is here</p>
                        </div>
                        <div className=" flex flex-col items-center py-14 px-10 bg-white">
                            <Image src={support} alt="" height={100} width={100} className="mb-7" />
                            <h2 className="text-[28px] font-anton mb-4 text-center">
                                Comprehensive
                                Support</h2>
                            <p className="text-lg text-gray-medium text-center">When you choose us as your real estate partner in Toronto, you can count on our unwavering commitment to your success. Best expertise realtor or agent is here</p>
                        </div>

                    </div>
                </div>
            </div>


            <div className="px-[5%] ">
                <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 py-12 sm:py-18">
                    <div className="sm:col-span-1 ">
                        <h1 className="sm:max-w-70 sm:text-start text-4xl sm:text-[56px] font-normal font-anton text-center">Frequently
                            <span className="text-accent-gold"> <br /> Asked </span>
                            Questions</h1>
                        <p className="sm:max-w-72 text-center sm:text-start text-lg text-gray-medium mt-4">Still you have any questions ?
                            Contact our Team via
                            Loremipsum.com</p>
                    </div>
                    <div className="sm:col-span-2 ">
                        <Accordion type="single" collapsible className="w-full space-y-5">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                                <AccordionContent>
                                    Firstly choose which component you need to copy by using our super fast search page, then copy the respective screen size you need by clicking on the copy button. Now you have the Figma Component in your clipboard you can paste ( “cmd + v” or “ctrl + v” ) it anywhere in your design files.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It adheres to the WAI-ARIA design pattern.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It adheres to the WAI-ARIA design pattern.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It adheres to the WAI-ARIA design pattern.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>
        </>
    );
}
