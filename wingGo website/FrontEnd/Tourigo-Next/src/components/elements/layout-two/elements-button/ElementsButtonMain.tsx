import ElementBreadcrumb from "@/elements/ElementPages/ElementBreadcrumb";
import React from "react";
import DefaultButton from "./DefaultButton";
import ButtonColorVeriation from "./ButtonColorVeriation";
import ButtonSizeVeriation from "./ButtonSizeVeriation";
import ButtonBorderRadius from "./ButtonBorderRadius";
import BorderVariation from "./BorderVariation";
import GradientsVariation from "./GradientsVariation";
import HoverVariation from "./HoverVariation";
import ModernVeriation from "./ModernVeriation";
import MarqueeVariation from "./MarqueeVariation";
import CircleVeriation from "./CircleVeriation";
import AppButton from "./AppButton";
import AppButtonWithBg from "./AppButtonWithBg";
const ElementsButtonMain = () => {
  return (
    <>
      <div className="section-space-top"></div>
      <ElementBreadcrumb titleOne="Button Elements" titleTwo="Button" />
      <DefaultButton />
      <ButtonColorVeriation />
      <ButtonSizeVeriation />
      <ButtonBorderRadius />
      <BorderVariation />
      <GradientsVariation />
      <HoverVariation />
      <ModernVeriation />
      <MarqueeVariation />
      <CircleVeriation />
      <AppButton />
      <AppButtonWithBg />
      <div className="section-space-bottom"></div>
    </>
  );
};

export default ElementsButtonMain;
