import React, { useState } from "react";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Container from "@mui/material/Container";

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

  return (
    <Stack direction="row">
      <>
        <Container>
          <Button variant="contained" onClick={handlePrevClick}>
            <KeyboardArrowLeft />
          </Button>
          <Card
            sx={{
              textAlign: "center",
              width: 250,
            }}
          >
            <h2>{cards[currentIndex].title}</h2>
            <p>{cards[currentIndex].estimated}</p>
            <h1>{cards[currentIndex].percent1}</h1>
            <p>{cards[currentIndex].remaining}</p>
            <h1>{cards[currentIndex].percent2}</h1>
            <p>{cards[currentIndex].annual}</p>
            <h1>{cards[currentIndex].percent3}</h1>
          </Card>
          <Button variant="contained" size="small" onClick={handleNextClick}>
            <KeyboardArrowRight />
          </Button>
        </Container>
      </>
    </Stack>
  );
};

export default CardSlider;
