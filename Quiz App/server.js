const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Shakespeare", "Dickens", "Tolkien", "Austen"],
    answer: "Shakespeare"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  {
    question: "What is the capital city of Brazil?",
    options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
    answer: "Brasília"
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
    answer: "Oxygen"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
    answer: "Leonardo da Vinci"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: "Pacific Ocean"
  },
  {
    question: "Which country hosted the 2016 Summer Olympics?",
    options: ["China", "Brazil", "Russia", "United States"],
    answer: "Brazil"
  },
  {
    question: "What is the main ingredient in guacamole?",
    options: ["Tomato", "Avocado", "Onion", "Pepper"],
    answer: "Avocado"
  },
  {
    question: "Which animal is known as the 'King of the Jungle'?",
    options: ["Elephant", "Lion", "Tiger", "Bear"],
    answer: "Lion"
  },
  {
    question: "What is the smallest country in the world by land area?",
    options: ["Monaco", "Nauru", "Vatican City", "San Marino"],
    answer: "Vatican City"
  },
  {
    question: "Which gas makes up the majority of Earth’s atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answer: "Nitrogen"
  },
  {
    question: "Who wrote the play 'Hamlet'?",
    options: ["William Shakespeare", "Jane Austen", "Charles Dickens", "Mark Twain"],
    answer: "William Shakespeare"
  },
  {
    question: "What is the primary source of energy for Earth’s climate system?",
    options: ["Geothermal Heat", "Wind", "The Sun", "Tides"],
    answer: "The Sun"
  }
];

app.get('/api/questions', (req, res) => {
  res.json(questions);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});