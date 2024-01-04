import React, { useState } from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Typography } from "@mui/material";

interface Card {
  id: number;
  title: string;
  estimated: string;
  percent1: number;
  remaining: string;
  percent2: number;
  annual: string;
  percent3: number;
}

interface CardSliderProps {
  cards: Card[];
}

const CardSlider: React.FC<CardSliderProps> = ({ cards }) => {
  const [, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : cards.length - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < cards.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <>
      <Stack
        direction="row"
        display="flex"
        alignItems="center"
        justifyContent="center"
        spacing={1}
      >
        <IconButton
          color="primary"
          size="small"
          aria-label="add to shopping cart"
          onClick={handlePrevClick}
        >
          <KeyboardArrowLeft />
        </IconButton>

        {cards.map((card) => (
          <Card
            sx={{
              color: "FEFEFE",
              borderRadius: 5.5,
            }}
          >
            <Stack gap={8}>
              <Typography
                fontWeight="bold"
                align="center"
                color="primary"
                variant="h2"
              >
                {card.title}
              </Typography>
              <Typography align="center" variant="subtitle1">
                {card.estimated}
              </Typography>
              <Typography fontWeight="bold" align="center" variant="h2">
                {card.percent1}
              </Typography>
              <Typography align="center" variant="subtitle1">
                {card.remaining}
              </Typography>
              <Typography fontWeight="bold" align="center" variant="subtitle1">
                {card.percent2}
              </Typography>
              <Typography align="center" variant="subtitle1">
                {card.annual}
              </Typography>
              <Typography fontWeight="bold" align="center" variant="subtitle1">
                {card.percent3}
              </Typography>
            </Stack>
          </Card>
        ))}

        <IconButton
          color="primary"
          size="small"
          aria-label="add to shopping cart"
          onClick={handleNextClick}
        >
          <KeyboardArrowRight />
        </IconButton>
      </Stack>
    </>
  );
};

export default CardSlider;
