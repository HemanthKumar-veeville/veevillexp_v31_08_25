import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormLabel, FormButton } from "@/components/ui/typography";

export const ContactFormSection: React.FC = () => {
  return (
    <section className="w-screen bg-[#2d2d2d] px-4 sm:px-6 md:px-10 lg:px-14 py-8 sm:py-12 md:py-16">
      <form className="space-y-6 sm:space-y-8 md:space-y-12 lg:space-y-16 max-w-full lg:max-w-[calc(100%-350px)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          <div className="space-y-2">
            <FormLabel as={Label} className="text-sm sm:text-base md:text-xl">
              First Name
            </FormLabel>
            <Input className="bg-transparent border-0 border-b-2 border-white rounded-none px-0 pb-2 text-white placeholder:text-white/70 focus:border-b-2 focus:border-white focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base" />
          </div>

          <div className="space-y-2">
            <FormLabel as={Label} className="text-sm sm:text-base md:text-xl">
              Last Name
            </FormLabel>
            <Input className="bg-transparent border-0 border-b-2 border-white rounded-none px-0 pb-2 text-white placeholder:text-white/70 focus:border-b-2 focus:border-white focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          <div className="space-y-2">
            <FormLabel as={Label} className="text-sm sm:text-base md:text-xl">
              Email
            </FormLabel>
            <Input
              type="email"
              className="bg-transparent border-0 border-b-2 border-white rounded-none px-0 pb-2 text-white placeholder:text-white/70 focus:border-b-2 focus:border-white focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base"
            />
          </div>

          <div className="space-y-2">
            <FormLabel as={Label} className="text-sm sm:text-base md:text-xl">
              Organization
            </FormLabel>
            <Input className="bg-transparent border-0 border-b-2 border-white rounded-none px-0 pb-2 text-white placeholder:text-white/70 focus:border-b-2 focus:border-white focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base" />
          </div>
        </div>

        <div className="space-y-2">
          <FormLabel
            as={Label}
            className="leading-5 text-sm sm:text-base md:text-xl"
          >
            Approximate Team Size
          </FormLabel>
          <Input className="bg-transparent border-0 border-b-2 border-white rounded-none px-0 pb-2 text-white placeholder:text-white/70 focus:border-b-2 focus:border-white focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base" />
        </div>

        <div className="space-y-3 sm:space-y-4">
          <FormLabel
            as={Label}
            className="leading-[11px] text-sm sm:text-base md:text-xl"
          >
            What challenge or opportunity brings you here?
          </FormLabel>
          <Textarea
            placeholder="Write your message.."
            className="bg-transparent border-0 border-b-2 border-white rounded-none px-0 pb-2 text-white placeholder:text-white/70 placeholder:[font-family:'Helvetica-Light',Helvetica] placeholder:font-light placeholder:text-base sm:placeholder:text-lg resize-none min-h-[60px] focus:border-b-2 focus:border-white focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base"
          />
        </div>

        <div className="flex justify-start pt-4 sm:pt-6 md:pt-8">
          <Button
            type="submit"
            className="w-[140px] sm:w-auto sm:min-w-[194px] h-10 sm:h-11 bg-[#fdfdfe] rounded-[28px] text-[#2d2d2d] hover:bg-white/90 transition-colors"
          >
            <FormButton className="text-sm sm:text-base md:text-xl">
              Send Message
            </FormButton>
          </Button>
        </div>
      </form>
    </section>
  );
};
