import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormLabel, FormButton } from "@/components/ui/typography";

export const ContactFormSection: React.FC = () => {
  return (
    <section className="w-screen bg-[#2d2d2d] px-14 py-16">
      <form className="space-y-16 max-w-[calc(100%-350px)]">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <FormLabel as={Label}>First Name</FormLabel>
            <Input className="bg-transparent border-0 border-b-2 border-white rounded-none px-0 pb-2 text-white placeholder:text-white/70 focus:border-b-2 focus:border-white focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" />
          </div>

          <div className="space-y-2">
            <FormLabel as={Label}>Last Name</FormLabel>
            <Input className="bg-transparent border-0 border-b-2 border-white rounded-none px-0 pb-2 text-white placeholder:text-white/70 focus:border-b-2 focus:border-white focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <FormLabel as={Label}>Email</FormLabel>
            <Input
              type="email"
              className="bg-transparent border-0 border-b-2 border-white rounded-none px-0 pb-2 text-white placeholder:text-white/70 focus:border-b-2 focus:border-white focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="space-y-2">
            <FormLabel as={Label}>Organization</FormLabel>
            <Input className="bg-transparent border-0 border-b-2 border-white rounded-none px-0 pb-2 text-white placeholder:text-white/70 focus:border-b-2 focus:border-white focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" />
          </div>
        </div>

        <div className="space-y-2">
          <FormLabel as={Label} className="leading-5">
            Approximate Team Size
          </FormLabel>
          <Input className="bg-transparent border-0 border-b-2 border-white rounded-none px-0 pb-2 text-white placeholder:text-white/70 focus:border-b-2 focus:border-white focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" />
        </div>

        <div className="space-y-4">
          <FormLabel as={Label} className="leading-[11px]">
            What challenge or opportunity brings you here?
          </FormLabel>
          <Textarea
            placeholder="Write your message.."
            className="bg-transparent border-0 border-b-2 border-white rounded-none px-0 pb-2 text-white placeholder:text-white/70 placeholder:[font-family:'Helvetica-Light',Helvetica] placeholder:font-light placeholder:text-lg resize-none min-h-[60px] focus:border-b-2 focus:border-white focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        <div className="flex justify-start pt-8">
          <Button
            type="submit"
            className="w-[194px] h-11 bg-[#fdfdfe] rounded-[28px] text-[#2d2d2d] hover:bg-white/90 h-auto"
          >
            <FormButton>Send Message</FormButton>
          </Button>
        </div>
      </form>
    </section>
  );
};
