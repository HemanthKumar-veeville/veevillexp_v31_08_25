import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const ContactFormSection: React.FC = () => {
  return (
    <section className="w-screen bg-[#2d2d2d] px-14 py-16">
      <form className="space-y-16 max-w-[calc(100%-350px)]">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <Label className="[font-family:'Helvetica-Light',Helvetica] font-light text-white text-xl tracking-[0] leading-5">
              First Name
            </Label>
            <Input className="bg-transparent border-0 border-b-2 border-white rounded-none px-0 pb-2 text-white placeholder:text-white/70 focus:border-b-2 focus:border-white focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" />
          </div>

          <div className="space-y-2">
            <Label className="[font-family:'Helvetica-Light',Helvetica] font-light text-white text-xl tracking-[0] leading-5">
              Last Name
            </Label>
            <Input className="bg-transparent border-0 border-b-2 border-white rounded-none px-0 pb-2 text-white placeholder:text-white/70 focus:border-b-2 focus:border-white focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <Label className="[font-family:'Helvetica-Light',Helvetica] font-light text-white text-xl tracking-[0] leading-5">
              Email
            </Label>
            <Input
              type="email"
              className="bg-transparent border-0 border-b-2 border-white rounded-none px-0 pb-2 text-white placeholder:text-white/70 focus:border-b-2 focus:border-white focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="space-y-2">
            <Label className="[font-family:'Helvetica-Light',Helvetica] font-light text-white text-xl tracking-[0] leading-5">
              Organization
            </Label>
            <Input className="bg-transparent border-0 border-b-2 border-white rounded-none px-0 pb-2 text-white placeholder:text-white/70 focus:border-b-2 focus:border-white focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="[font-family:'Helvetica-Light',Helvetica] font-light text-white text-xl tracking-[0] leading-5">
            Approximate Team Size
          </Label>
          <Input className="bg-transparent border-0 border-b-2 border-white rounded-none px-0 pb-2 text-white placeholder:text-white/70 focus:border-b-2 focus:border-white focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" />
        </div>

        <div className="space-y-4">
          <Label className="[font-family:'Helvetica-Light',Helvetica] font-light text-white text-xl tracking-[0] leading-[11px]">
            What challenge or opportunity brings you here?
          </Label>
          <Textarea
            placeholder="Write your message.."
            className="bg-transparent border-0 border-b-2 border-white rounded-none px-0 pb-2 text-white placeholder:text-white/70 placeholder:[font-family:'Helvetica-Light',Helvetica] placeholder:font-light placeholder:text-lg resize-none min-h-[60px] focus:border-b-2 focus:border-white focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        <div className="flex justify-start pt-8">
          <Button
            type="submit"
            className="w-[194px] h-11 bg-[#fdfdfe] rounded-[28px] text-[#2d2d2d] [font-family:'Helvetica-Bold',Helvetica] font-bold text-xl hover:bg-white/90 h-auto"
          >
            Send Message
          </Button>
        </div>
      </form>
    </section>
  );
};
