import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import TimelineComponent from "./TimelineComponent";
import { Timeline } from "./ui/timeline";

interface ProjectTemplateProps {
  title?: string;
  cost?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  TimelineFirstStep?: string;
  TimelineFirstStepDescription?: string;
  TimelineSecondStep?: string;
  TimelineSecondStepDescription?: string;
  TimelineThirdStep?: string;
  TimelineThirdStepDescription?: string;
  TimelineFourthStep?: string;
  TimelineFourthStepDescription?: string;
  TimelineFinalIconColor?: string;
  className?: string;
}

const ProjectTemplate: React.FC<ProjectTemplateProps> = ({
  title = "Project Title",
  cost = "$10,000",
  description = "Project description goes here. This is a detailed explanation of what the project entails.",
  imageUrl = "/img/people/crew1.jpg",
  imageAlt = "Project image",
  TimelineFirstStep,
  TimelineFirstStepDescription,
  TimelineSecondStep,
  TimelineSecondStepDescription,
  TimelineThirdStep,
  TimelineThirdStepDescription,
  TimelineFourthStep,
  TimelineFourthStepDescription,
  TimelineFinalIconColor,
  className,
}) => {
  return (
    <Card className={`w-[70dvw] h-[70dvh] m-auto grid grid-rows-[auto_1fr_auto] bg-black text-white ${className || ""}`}>
      <CardHeader className="flex-none w-full text-center">
        <CardTitle className="text-3xl md:text-4xl lg:text-5xl mb-2">
              {title}
            </CardTitle>
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white/80 mb-4">
              {cost}
            </div>
      </CardHeader>
      
      <CardContent className="flex-0.5 flex pb-8">
        <div className="flex mx-auto items-center gap-20">
          <div className="flex-0.5">
            <CardDescription className="max-w-sm text-base md:text-lg whitespace-normal wrap-break-words">
              {description}
            </CardDescription>
          </div>
          <div className="flex-none w-1/2 max-w-md">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-none mx-auto">
        <TimelineComponent
          firstStep={TimelineFirstStep}
          firstStepDescription={TimelineFirstStepDescription}
          secondStep={TimelineSecondStep}
          secondStepDescription={TimelineSecondStepDescription}
          thirdStep={TimelineThirdStep}
          thirdStepDescription={TimelineThirdStepDescription}
          fourthStep={TimelineFourthStep}
          fourthStepDescription={TimelineFourthStepDescription}
          finalIconColor={TimelineFinalIconColor}
          className="w-full"
        />
      </CardFooter>
    </Card>
  );
};

export default ProjectTemplate;