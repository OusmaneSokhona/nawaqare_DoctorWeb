import Container from "@/components/shared/container";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import Iconify from "@/components/shared/iconify";
import { content } from "@/data";
import { Icon } from "@iconify/react";

const WelcomeCard = () => {
  return (
    <Container styling="relative p-4 md:p-6 h-full">
      <div className="flex justify-between w-full items-center">
        <Typography size="xl" className="pb-2 font-semibold">
          All Activities
        </Typography>
        <div className="w-32 border border-[#C3D3E2] rounded-xl">
          <Button
            variant="outlined"
            size="medium"
            className="w-full flex items-center gap-2 text-light-blue"
          >
            <Iconify icon="ci:share-ios-export" className="text-light-blue" />
            Export
          </Button>
        </div>
      </div>
      <div className="pt-10 grid grid-cols-6 max-md:grid-cols-1  gap-6 md:gap-8">
        {content.allActivities.map((activity, i) => (
          <div
            key={i}
            className="rounded-2xl p-4 space-y-3 max-sm:w-full max-sm:text-center shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 ease-in-out cursor-pointer "
            style={{ backgroundColor: activity.bg }}
          >
            <div
              className="rounded-full h-11 w-11 flex justify-center items-center max-sm:mx-auto"
              style={{ backgroundColor: activity.iconColor }}
            >
              <Icon
                icon={activity.icon}
                width="24"
                height="24"
                className="text-white"
              />
            </div>
            <Typography size="h4" as="h4">
              {i === 3 ? `$${activity.stat}` : activity.stat}
            </Typography>
            <Typography>{activity.title}</Typography>
            <Typography style={{ color: activity.iconColor }}>
              +{activity.percentage}% from yesterday
            </Typography>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default WelcomeCard;
