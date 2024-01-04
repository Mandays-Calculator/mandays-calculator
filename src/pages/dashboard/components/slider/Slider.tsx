import React, { useState } from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Typography } from "@mui/material";

interface CardItem {
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
  cards: CardItem[];
}

const CardSlider: React.FC<CardSliderProps> = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  // Calculate the indices for the 4 cards to display
  const displayIndices = [
    (currentIndex - 1 + cards.length) % cards.length,
    currentIndex,
    (currentIndex + 1) % cards.length,
    (currentIndex + 2) % cards.length,
  ];

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
          aria-label="previous"
          onClick={handlePrevClick}
        >
          <KeyboardArrowLeft />
        </IconButton>

        {displayIndices.map((offset, index) => (
          <Card
            key={index}
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
                {cards[offset].title}
              </Typography>
              <Typography align="center" variant="subtitle1">
                {cards[offset].estimated}
              </Typography>
              <Typography fontWeight="bold" align="center" variant="h2">
                {cards[offset].percent1}
              </Typography>
              <Typography align="center" variant="subtitle1">
                {cards[offset].remaining}
              </Typography>
              <Typography fontWeight="bold" align="center" variant="subtitle1">
                {cards[offset].percent2}
              </Typography>
              <Typography align="center" variant="subtitle1">
                {cards[offset].annual}
              </Typography>
              <Typography fontWeight="bold" align="center" variant="subtitle1">
                {cards[offset].percent3}
              </Typography>
            </Stack>
          </Card>
        ))}

        <IconButton
          color="primary"
          size="small"
          aria-label="next"
          onClick={handleNextClick}
        >
          <KeyboardArrowRight />
        </IconButton>
      </Stack>
    </>
  );
};

export default CardSlider;
